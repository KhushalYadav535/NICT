import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    achievements: []
  });

  const templates = [
    { id: 'modern', name: 'Modern Professional', preview: '🎨', component: ModernTemplate },
    { id: 'classic', name: 'Classic Executive', preview: '📋', component: ClassicTemplate },
    { id: 'creative', name: 'Creative Designer', preview: '✨', component: CreativeTemplate },
    { id: 'minimal', name: 'Minimal Clean', preview: '⚪', component: ModernTemplate },
    { id: 'tech', name: 'Tech Focused', preview: '💻', component: ModernTemplate }
  ];

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'skills', label: 'Skills', icon: 'Zap' },
    { id: 'projects', label: 'Projects', icon: 'Folder' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
    { id: 'languages', label: 'Languages', icon: 'Globe' },
    { id: 'achievements', label: 'Achievements', icon: 'Star' }
  ];

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addArrayItem = (section, item) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const generateAISuggestion = async (field, context) => {
    setIsGenerating(true);
    setShowAIModal(true);
    
    // Simulate AI API call
    setTimeout(() => {
      const suggestions = {
        summary: `Results-driven professional with ${Math.floor(Math.random() * 10) + 3} years of experience in ${context || 'the industry'}. Proven track record of delivering exceptional results through strategic planning and innovative solutions. Strong analytical skills combined with excellent communication abilities.`,
        skills: 'JavaScript, React, Node.js, Python, SQL, AWS, Docker, Git, Agile, Scrum',
        achievements: 'Led team of 8 developers to deliver project 20% under budget and 2 weeks ahead of schedule. Increased customer satisfaction by 35% through process improvements.'
      };
      
      setAiSuggestion(suggestions[field] || 'AI suggestion will appear here...');
      setIsGenerating(false);
    }, 2000);
  };

  const applyAISuggestion = () => {
    if (activeTab === 'personal' && aiSuggestion) {
      handleInputChange('personal', 'summary', aiSuggestion);
    }
    setShowAIModal(false);
    setAiSuggestion('');
  };

  const downloadPDF = () => {
    alert('PDF download feature will be implemented here');
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          value={resumeData.personal.name}
          onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
          placeholder="John Doe"
        />
        <Input
          label="Email"
          type="email"
          value={resumeData.personal.email}
          onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
          placeholder="john.doe@email.com"
        />
        <Input
          label="Phone"
          value={resumeData.personal.phone}
          onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
        <Input
          label="Address"
          value={resumeData.personal.address}
          onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
          placeholder="City, State, Country"
        />
        <Input
          label="LinkedIn"
          value={resumeData.personal.linkedin}
          onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
        />
        <Input
          label="Website"
          value={resumeData.personal.website}
          onChange={(e) => handleInputChange('personal', 'website', e.target.value)}
          placeholder="johndoe.com"
        />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Professional Summary</label>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => generateAISuggestion('summary', resumeData.personal.name)}
            disabled={isGenerating}
          >
            <Icon name="Sparkles" size={16} />
            {isGenerating ? 'Generating...' : 'AI Suggest'}
          </Button>
        </div>
        <textarea
          value={resumeData.personal.summary}
          onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={4}
          placeholder="Write a compelling professional summary..."
        />
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addArrayItem('experience', {
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
          })}
        >
          <Icon name="Plus" size={16} />
          Add Experience
        </Button>
      </div>
      
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Experience #{index + 1}</h4>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeArrayItem('experience', index)}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              value={exp.title}
              onChange={(e) => updateArrayItem('experience', index, 'title', e.target.value)}
              placeholder="Software Engineer"
            />
            <Input
              label="Company"
              value={exp.company}
              onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)}
              placeholder="Tech Company Inc."
            />
            <Input
              label="Location"
              value={exp.location}
              onChange={(e) => updateArrayItem('experience', index, 'location', e.target.value)}
              placeholder="San Francisco, CA"
            />
            <div className="flex gap-2">
              <Input
                label="Start Date"
                type="month"
                value={exp.startDate}
                onChange={(e) => updateArrayItem('experience', index, 'startDate', e.target.value)}
              />
              <Input
                label="End Date"
                type="month"
                value={exp.endDate}
                onChange={(e) => updateArrayItem('experience', index, 'endDate', e.target.value)}
                disabled={exp.current}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${index}`}
              checked={exp.current}
              onChange={(e) => updateArrayItem('experience', index, 'current', e.target.checked)}
            />
            <label htmlFor={`current-${index}`} className="text-sm">Currently working here</label>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => updateArrayItem('experience', index, 'description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addArrayItem('education', {
            degree: '',
            institution: '',
            startDate: '',
            endDate: '',
            gpa: '',
            description: ''
          })}
        >
          <Icon name="Plus" size={16} />
          Add Education
        </Button>
      </div>
      
      {resumeData.education.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Education #{index + 1}</h4>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeArrayItem('education', index)}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Degree"
              value={edu.degree}
              onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)}
              placeholder="Bachelor of Science in Computer Science"
            />
            <Input
              label="Institution"
              value={edu.institution}
              onChange={(e) => updateArrayItem('education', index, 'institution', e.target.value)}
              placeholder="University Name"
            />
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate}
              onChange={(e) => updateArrayItem('education', index, 'startDate', e.target.value)}
            />
            <Input
              label="End Date"
              type="month"
              value={edu.endDate}
              onChange={(e) => updateArrayItem('education', index, 'endDate', e.target.value)}
            />
            <Input
              label="GPA"
              value={edu.gpa}
              onChange={(e) => updateArrayItem('education', index, 'gpa', e.target.value)}
              placeholder="3.8/4.0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={edu.description}
              onChange={(e) => updateArrayItem('education', index, 'description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              placeholder="Relevant coursework, achievements, etc..."
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Skills</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => generateAISuggestion('skills')}
          disabled={isGenerating}
        >
          <Icon name="Sparkles" size={16} />
          AI Suggest Skills
        </Button>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
        <textarea
          value={resumeData.skills.join(', ')}
          onChange={(e) => setResumeData(prev => ({
            ...prev,
            skills: e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill)
          }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={3}
          placeholder="JavaScript, React, Node.js, Python, SQL..."
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addArrayItem('projects', {
            title: '',
            description: '',
            technologies: '',
            link: ''
          })}
        >
          <Icon name="Plus" size={16} />
          Add Project
        </Button>
      </div>
      
      {resumeData.projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Project #{index + 1}</h4>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeArrayItem('projects', index)}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Project Title"
              value={project.title}
              onChange={(e) => updateArrayItem('projects', index, 'title', e.target.value)}
              placeholder="E-commerce Platform"
            />
            <Input
              label="Technologies Used"
              value={project.technologies}
              onChange={(e) => updateArrayItem('projects', index, 'technologies', e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />
            <Input
              label="Project Link"
              value={project.link}
              onChange={(e) => updateArrayItem('projects', index, 'link', e.target.value)}
              placeholder="https://github.com/username/project"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              placeholder="Describe the project, your role, and key features..."
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Certifications</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addArrayItem('certifications', {
            name: '',
            issuer: '',
            date: '',
            link: ''
          })}
        >
          <Icon name="Plus" size={16} />
          Add Certification
        </Button>
      </div>
      
      {resumeData.certifications.map((cert, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Certification #{index + 1}</h4>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeArrayItem('certifications', index)}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Certification Name"
              value={cert.name}
              onChange={(e) => updateArrayItem('certifications', index, 'name', e.target.value)}
              placeholder="AWS Certified Solutions Architect"
            />
            <Input
              label="Issuing Organization"
              value={cert.issuer}
              onChange={(e) => updateArrayItem('certifications', index, 'issuer', e.target.value)}
              placeholder="Amazon Web Services"
            />
            <Input
              label="Date Earned"
              type="month"
              value={cert.date}
              onChange={(e) => updateArrayItem('certifications', index, 'date', e.target.value)}
            />
            <Input
              label="Verification Link"
              value={cert.link}
              onChange={(e) => updateArrayItem('certifications', index, 'link', e.target.value)}
              placeholder="https://verify.certification.com/..."
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderLanguages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Languages</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addArrayItem('languages', {
            language: '',
            proficiency: ''
          })}
        >
          <Icon name="Plus" size={16} />
          Add Language
        </Button>
      </div>
      
      {resumeData.languages.map((lang, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Language #{index + 1}</h4>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeArrayItem('languages', index)}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Language"
              value={lang.language}
              onChange={(e) => updateArrayItem('languages', index, 'language', e.target.value)}
              placeholder="English"
            />
            <select
              value={lang.proficiency}
              onChange={(e) => updateArrayItem('languages', index, 'proficiency', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Proficiency</option>
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Advanced">Advanced</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addArrayItem('achievements', {
            description: ''
          })}
        >
          <Icon name="Plus" size={16} />
          Add Achievement
        </Button>
      </div>
      
      {resumeData.achievements.map((achievement, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Achievement #{index + 1}</h4>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeArrayItem('achievements', index)}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Achievement Description</label>
            <textarea
              value={achievement.description}
              onChange={(e) => updateArrayItem('achievements', index, 'description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              placeholder="Describe your achievement, awards, or recognition..."
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      case 'certifications':
        return renderCertifications();
      case 'languages':
        return renderLanguages();
      case 'achievements':
        return renderAchievements();
      default:
        return <div className="text-center text-gray-500 py-8">This section is under development</div>;
    }
  };

  const selectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI-Powered Resume Builder</h1>
              <p className="text-gray-600 mt-1">Create professional resumes with AI assistance</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
                <Icon name="Eye" size={16} />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </Button>
              <Button variant="primary" onClick={downloadPDF}>
                <Icon name="Download" size={16} />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showPreview ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button variant="secondary" onClick={() => setShowPreview(false)}>
              <Icon name="ArrowLeft" size={16} />
              Back to Editor
            </Button>
          </div>
          <selectedTemplateComponent data={resumeData} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Template Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{template.preview}</span>
                        <span className="font-medium">{template.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                          activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestion Modal */}
      <Modal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title="AI Suggestion"
      >
        {isGenerating ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Generating AI suggestion...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">Here's an AI-generated suggestion:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm">{aiSuggestion}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="primary" onClick={applyAISuggestion}>
                Apply Suggestion
              </Button>
              <Button variant="secondary" onClick={() => setShowAIModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResumeBuilder;
