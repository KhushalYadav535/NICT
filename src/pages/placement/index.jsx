import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PlacementPortal = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock placement data
  const placementData = {
    jobs: [
      {
        id: 1,
        title: 'Python Developer',
        company: 'Tech Solutions Ltd',
        location: 'Jaipur, Rajasthan',
        type: 'Full-time',
        experience: '0-2 years',
        salary: '₹3.5 - 5.5 LPA',
        category: 'development',
        postedDate: '2024-12-20',
        deadline: '2024-12-30',
        description: 'We are looking for a Python developer to join our team. The ideal candidate should have knowledge of Python, Django, and database management.',
        requirements: [
          'Strong knowledge of Python programming',
          'Experience with Django framework',
          'Knowledge of database systems (MySQL/PostgreSQL)',
          'Good understanding of web technologies',
          'Excellent problem-solving skills'
        ],
        benefits: [
          'Health insurance',
          'Flexible working hours',
          'Learning and development opportunities',
          'Performance bonuses'
        ],
        isApplied: false,
        isSaved: false,
        companyLogo: '/company1.png',
        contactPerson: 'Ms. Priya Sharma',
        contactEmail: 'hr@techsolutions.com',
        contactPhone: '+91-9876543210'
      },
      {
        id: 2,
        title: 'Tally Accountant',
        company: 'ABC Enterprises',
        location: 'Delhi, NCR',
        type: 'Full-time',
        experience: '1-3 years',
        salary: '₹2.5 - 4.0 LPA',
        category: 'accounting',
        postedDate: '2024-12-19',
        deadline: '2024-12-28',
        description: 'Looking for a Tally accountant to manage our financial records and ensure accurate bookkeeping.',
        requirements: [
          'Proficiency in Tally Prime',
          'Knowledge of GST and taxation',
          'Experience in accounting and bookkeeping',
          'Attention to detail',
          'Good communication skills'
        ],
        benefits: [
          'Medical insurance',
          'Paid time off',
          'Professional development',
          'Transport allowance'
        ],
        isApplied: true,
        isSaved: true,
        companyLogo: '/company2.png',
        contactPerson: 'Mr. Amit Kumar',
        contactEmail: 'careers@abcent.com',
        contactPhone: '+91-9876543211'
      },
      {
        id: 3,
        title: 'Web Designer',
        company: 'Digital Creations',
        location: 'Mumbai, Maharashtra',
        type: 'Freelance',
        experience: '0-1 years',
        salary: '₹25,000 - 40,000 per month',
        category: 'design',
        postedDate: '2024-12-18',
        deadline: '2024-12-25',
        description: 'We need a creative web designer to create stunning websites and user interfaces.',
        requirements: [
          'Proficiency in HTML, CSS, JavaScript',
          'Experience with design tools (Photoshop, Figma)',
          'Understanding of UI/UX principles',
          'Creative mindset',
          'Portfolio of previous work'
        ],
        benefits: [
          'Flexible working hours',
          'Remote work option',
          'Creative freedom',
          'Performance-based bonuses'
        ],
        isApplied: false,
        isSaved: false,
        companyLogo: '/company3.png',
        contactPerson: 'Ms. Neha Patel',
        contactEmail: 'jobs@digitalcreations.com',
        contactPhone: '+91-9876543212'
      }
    ],
    applications: [
      {
        id: 1,
        jobTitle: 'Tally Accountant',
        company: 'ABC Enterprises',
        appliedDate: '2024-12-15',
        status: 'shortlisted',
        interviewDate: '2024-12-22',
        interviewTime: '10:00 AM',
        interviewMode: 'Online',
        meetingLink: 'https://meet.google.com/abc-defg-hij'
      },
      {
        id: 2,
        jobTitle: 'Data Entry Operator',
        company: 'XYZ Corp',
        appliedDate: '2024-12-10',
        status: 'pending',
        interviewDate: null,
        interviewTime: null,
        interviewMode: null,
        meetingLink: null
      }
    ],
    resume: {
      personalInfo: {
        name: 'Rahul Kumar',
        email: 'rahul.kumar@email.com',
        phone: '+91-9876543210',
        address: 'Jaipur, Rajasthan',
        linkedin: 'linkedin.com/in/rahulkumar',
        github: 'github.com/rahulkumar'
      },
      education: [
        {
          degree: 'Diploma in Computer Applications',
          institution: 'NIICT',
          year: '2024',
          percentage: '92%'
        },
        {
          degree: '12th Standard',
          institution: 'CBSE Board',
          year: '2022',
          percentage: '85%'
        }
      ],
      skills: [
        'MS Office Suite',
        'Python Programming',
        'Web Design (HTML, CSS)',
        'Tally Prime',
        'Data Entry',
        'Communication Skills'
      ],
      experience: [
        {
          role: 'Intern - Data Entry',
          company: 'Local Business',
          duration: '3 months',
          description: 'Handled data entry tasks and maintained records using MS Excel'
        }
      ],
      projects: [
        {
          title: 'Student Management System',
          description: 'Developed a simple student management system using Python',
          technologies: 'Python, SQLite'
        }
      ]
    }
  };

  const jobCategories = [
    { id: 'all', name: 'All Jobs', icon: 'Briefcase' },
    { id: 'development', name: 'Development', icon: 'Code' },
    { id: 'design', name: 'Design', icon: 'Palette' },
    { id: 'accounting', name: 'Accounting', icon: 'Calculator' },
    { id: 'marketing', name: 'Marketing', icon: 'TrendingUp' },
    { id: 'data-entry', name: 'Data Entry', icon: 'Database' }
  ];

  const applicationStatuses = {
    pending: { bg: 'bg-warning-100', text: 'text-warning-700', label: 'Pending' },
    shortlisted: { bg: 'bg-primary-100', text: 'text-primary-700', label: 'Shortlisted' },
    rejected: { bg: 'bg-error-100', text: 'text-error-700', label: 'Rejected' },
    hired: { bg: 'bg-success-100', text: 'text-success-700', label: 'Hired' }
  };

  const handleApplyJob = (jobId) => {
    setPlacementData(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => 
        job.id === jobId ? { ...job, isApplied: true } : job
      )
    }));
    console.log('Applied for job:', jobId);
  };

  const handleSaveJob = (jobId) => {
    setPlacementData(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => 
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    }));
  };

  const handleJoinInterview = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  const filteredJobs = placementData.jobs.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Placement Portal
              </h1>
              <p className="text-text-secondary">
                Find your dream job and build your career
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="FileText" iconPosition="left">
                Build Resume
              </Button>
              <Button variant="primary" iconName="Briefcase" iconPosition="left">
                Post Job
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center mb-8 bg-white rounded-xl p-2 shadow-md border border-border max-w-2xl mx-auto">
          {[
            { id: 'jobs', label: 'Job Board', icon: 'Briefcase', count: placementData.jobs.length },
            { id: 'applications', label: 'My Applications', icon: 'FileText', count: placementData.applications.length },
            { id: 'resume', label: 'Resume Builder', icon: 'User', count: 1 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 min-touch-target flex-1 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              <Icon name={tab.icon} size={20} />
              <span className="font-medium">{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Job Board */}
        {activeTab === 'jobs' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="Search jobs, companies, or locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {jobCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'border-primary bg-primary-50 text-primary'
                          : 'border-border hover:border-primary-200 hover:bg-primary-25'
                      }`}
                    >
                      <Icon name={category.icon} size={16} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Building" size={24} color="var(--color-text-secondary)" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-heading font-semibold text-text-primary">
                                {job.title}
                              </h3>
                              <p className="text-text-secondary">{job.company}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {job.isApplied && (
                                <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                                  Applied
                                </span>
                              )}
                              <span className="text-sm text-text-secondary">
                                {formatDate(job.postedDate)}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-text-secondary">Location</div>
                              <div className="font-medium text-text-primary">{job.location}</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-text-secondary">Type</div>
                              <div className="font-medium text-text-primary">{job.type}</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-text-secondary">Experience</div>
                              <div className="font-medium text-text-primary">{job.experience}</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm text-text-secondary">Salary</div>
                              <div className="font-medium text-text-primary">{job.salary}</div>
                            </div>
                          </div>

                          <p className="text-text-secondary mb-4 line-clamp-2">
                            {job.description}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-text-secondary">
                            <div className="flex items-center space-x-1">
                              <Icon name="Calendar" size={14} />
                              <span>Deadline: {formatDate(job.deadline)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="User" size={14} />
                              <span>Contact: {job.contactPerson}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSaveJob(job.id)}
                          iconName={job.isSaved ? "Bookmark" : "BookmarkPlus"}
                          className={job.isSaved ? "text-primary" : ""}
                        >
                          {job.isSaved ? 'Saved' : 'Save'}
                        </Button>
                        
                        {!job.isApplied ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleApplyJob(job.id)}
                            iconName="Send"
                            iconPosition="left"
                          >
                            Apply Now
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Check"
                            iconPosition="left"
                            disabled
                          >
                            Applied
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedJob(job)}
                          iconName="Eye"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* My Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {placementData.applications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-text-primary">
                            {application.jobTitle}
                          </h3>
                          <p className="text-text-secondary">{application.company}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            applicationStatuses[application.status].bg
                          } ${applicationStatuses[application.status].text}`}>
                            {applicationStatuses[application.status].label}
                          </span>
                          <span className="text-sm text-text-secondary">
                            Applied: {formatDate(application.appliedDate)}
                          </span>
                        </div>
                      </div>

                      {application.interviewDate && (
                        <div className="bg-primary-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-primary mb-2">Interview Scheduled</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-sm text-text-secondary">Date</div>
                              <div className="font-medium">{formatDate(application.interviewDate)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-text-secondary">Time</div>
                              <div className="font-medium">{application.interviewTime}</div>
                            </div>
                            <div>
                              <div className="text-sm text-text-secondary">Mode</div>
                              <div className="font-medium">{application.interviewMode}</div>
                            </div>
                            <div>
                              <div className="text-sm text-text-secondary">Action</div>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleJoinInterview(application.meetingLink)}
                                iconName="Video"
                                iconPosition="left"
                              >
                                Join
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Resume Builder */}
        {activeTab === 'resume' && (
          <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Resume Builder
                </h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" iconName="Eye" iconPosition="left">
                    Preview
                  </Button>
                  <Button variant="primary" iconName="Download" iconPosition="left">
                    Download PDF
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Personal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Full Name</label>
                      <input
                        type="text"
                        value={placementData.resume.personalInfo.name}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Email</label>
                      <input
                        type="email"
                        value={placementData.resume.personalInfo.email}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Phone</label>
                      <input
                        type="tel"
                        value={placementData.resume.personalInfo.phone}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1">Address</label>
                      <textarea
                        value={placementData.resume.personalInfo.address}
                        rows={2}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {placementData.resume.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-text-primary mb-3">Education</h4>
                  <div className="space-y-3">
                    {placementData.resume.education.map((edu, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-text-primary">{edu.degree}</h5>
                            <p className="text-text-secondary">{edu.institution}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-text-secondary">{edu.year}</div>
                            <div className="font-medium text-primary">{edu.percentage}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  Job Details
                </h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {selectedJob.title}
                  </h3>
                  <p className="text-lg text-text-secondary mb-4">{selectedJob.company}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-text-secondary">Location</div>
                      <div className="font-medium">{selectedJob.location}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-text-secondary">Type</div>
                      <div className="font-medium">{selectedJob.type}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-text-secondary">Experience</div>
                      <div className="font-medium">{selectedJob.experience}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-text-secondary">Salary</div>
                      <div className="font-medium">{selectedJob.salary}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Job Description</h4>
                  <p className="text-text-secondary mb-4">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-text-secondary">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Benefits</h4>
                  <ul className="list-disc list-inside space-y-1 text-text-secondary">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-text-secondary">Contact Person</div>
                      <div className="font-medium">{selectedJob.contactPerson}</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Email</div>
                      <div className="font-medium">{selectedJob.contactEmail}</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Phone</div>
                      <div className="font-medium">{selectedJob.contactPhone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Application Deadline</div>
                      <div className="font-medium">{formatDate(selectedJob.deadline)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleSaveJob(selectedJob.id)}
                      iconName={selectedJob.isSaved ? "Bookmark" : "BookmarkPlus"}
                      className={selectedJob.isSaved ? "text-primary" : ""}
                    >
                      {selectedJob.isSaved ? 'Saved' : 'Save Job'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => setSelectedJob(null)}>
                      Close
                    </Button>
                    {!selectedJob.isApplied ? (
                      <Button
                        variant="primary"
                        onClick={() => handleApplyJob(selectedJob.id)}
                        iconName="Send"
                        iconPosition="left"
                      >
                        Apply Now
                      </Button>
                    ) : (
                      <Button variant="outline" disabled iconName="Check" iconPosition="left">
                        Applied
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PlacementPortal; 