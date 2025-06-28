import React from 'react';

const ClassicTemplate = ({ data }) => {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-wide">
          {data.personal.name || 'YOUR NAME'}
        </h1>
        <div className="flex justify-center items-center gap-6 text-sm text-gray-700 mb-3">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.address && <span>• {data.personal.address}</span>}
        </div>
        {data.personal.linkedin && (
          <p className="text-sm text-gray-600">{data.personal.linkedin}</p>
        )}
      </div>

      {/* Summary */}
      {data.personal.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{data.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{exp.title || 'Job Title'}</h3>
                <span className="text-sm text-gray-600 font-medium">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - 
                  {exp.current ? ' Present' : (exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))}
                </span>
              </div>
              <p className="text-lg text-gray-700 font-semibold mb-1">{exp.company || 'Company Name'}</p>
              {exp.location && <p className="text-sm text-gray-600 mb-3 italic">{exp.location}</p>}
              <div className="text-gray-700 leading-relaxed">
                {exp.description || 'Job description goes here'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                <span className="text-sm text-gray-600 font-medium">
                  {edu.startDate && new Date(edu.startDate).getFullYear()} - 
                  {edu.endDate && new Date(edu.endDate).getFullYear()}
                </span>
              </div>
              <p className="text-lg text-gray-700 font-semibold">{edu.institution || 'Institution'}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                <span className="text-gray-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            CERTIFICATIONS
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-3">
              <h3 className="text-lg font-bold text-gray-900">{cert.name || 'Certification Name'}</h3>
              <p className="text-gray-700">{cert.issuer || 'Issuing Organization'}</p>
              {cert.date && <p className="text-sm text-gray-600">{new Date(cert.date).getFullYear()}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            KEY PROJECTS
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title || 'Project Title'}</h3>
              <p className="text-gray-700 leading-relaxed">{project.description || 'Project description goes here'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            LANGUAGES
          </h2>
          <div className="flex flex-wrap gap-6">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{lang.language || 'Language'}</span>
                <span className="text-gray-600">({lang.proficiency || 'Proficiency'})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            ACHIEVEMENTS
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {data.achievements.map((achievement, index) => (
              <li key={index} className="leading-relaxed">{achievement.description || 'Achievement description'}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate; 