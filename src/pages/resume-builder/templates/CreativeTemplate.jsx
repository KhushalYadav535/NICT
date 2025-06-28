import React from 'react';

const CreativeTemplate = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 max-w-4xl mx-auto shadow-2xl rounded-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl mb-8">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          {data.personal.name || 'Your Name'}
        </h1>
        <p className="text-xl opacity-90 mb-6">{data.personal.summary || 'Creative professional summary goes here'}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {data.personal.email && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.address && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>{data.personal.address}</span>
            </div>
          )}
          {data.personal.linkedin && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>{data.personal.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                Experience
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm mb-6 border-l-4 border-purple-500">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{exp.title || 'Job Title'}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {exp.current ? ' Present' : (exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                    </span>
                  </div>
                  <p className="text-lg text-purple-600 font-semibold mb-2">{exp.company || 'Company Name'}</p>
                  {exp.location && <p className="text-sm text-gray-600 mb-3">{exp.location}</p>}
                  <p className="text-gray-700 leading-relaxed">{exp.description || 'Job description goes here'}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title || 'Project Title'}</h3>
                  <p className="text-gray-700 leading-relaxed">{project.description || 'Project description goes here'}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{edu.degree || 'Degree'}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {edu.startDate && new Date(edu.startDate).getFullYear()} - 
                      {edu.endDate && new Date(edu.endDate).getFullYear()}
                    </span>
                  </div>
                  <p className="text-lg text-purple-600 font-semibold">{edu.institution || 'Institution'}</p>
                  {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="w-6 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="w-6 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                Certifications
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 text-sm">{cert.name || 'Certification Name'}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer || 'Issuing Organization'}</p>
                    {cert.date && <p className="text-xs text-gray-600">{new Date(cert.date).getFullYear()}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="w-6 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{lang.language || 'Language'}</span>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {lang.proficiency || 'Proficiency'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {data.achievements.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="w-6 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                Achievements
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {data.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{achievement.description || 'Achievement description'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate; 