import React from 'react';

const ModernTemplate = ({ data }) => {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.personal.name || 'Your Name'}</h1>
        <p className="text-lg text-gray-600 mb-2">{data.personal.summary || 'Professional summary goes here'}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personal.email && <span>📧 {data.personal.email}</span>}
          {data.personal.phone && <span>📞 {data.personal.phone}</span>}
          {data.personal.address && <span>📍 {data.personal.address}</span>}
          {data.personal.linkedin && <span>🔗 {data.personal.linkedin}</span>}
        </div>
      </div>

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{exp.title || 'Job Title'}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                  {exp.current ? ' Present' : (exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                </span>
              </div>
              <p className="text-lg text-blue-600 font-medium mb-1">{exp.company || 'Company Name'}</p>
              {exp.location && <p className="text-sm text-gray-600 mb-2">{exp.location}</p>}
              <p className="text-gray-700 leading-relaxed">{exp.description || 'Job description goes here'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{edu.degree || 'Degree'}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate && new Date(edu.startDate).getFullYear()} - 
                  {edu.endDate && new Date(edu.endDate).getFullYear()}
                </span>
              </div>
              <p className="text-lg text-blue-600 font-medium">{edu.institution || 'Institution'}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{project.title || 'Project Title'}</h3>
              <p className="text-gray-700 leading-relaxed">{project.description || 'Project description goes here'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">{cert.name || 'Certification Name'}</h3>
                <p className="text-sm text-gray-600">{cert.issuer || 'Issuing Organization'}</p>
                {cert.date && <p className="text-sm text-gray-600">{new Date(cert.date).getFullYear()}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium">{lang.language || 'Language'}</span>
                <span className="text-sm text-gray-600">({lang.proficiency || 'Proficiency'})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            Achievements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {data.achievements.map((achievement, index) => (
              <li key={index}>{achievement.description || 'Achievement description'}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate; 