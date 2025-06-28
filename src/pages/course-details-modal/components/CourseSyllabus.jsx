import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CourseSyllabus = ({ modules }) => {
  const [expandedModules, setExpandedModules] = useState([0]);

  const toggleModule = (index) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="BookOpen" size={20} className="mr-2" />
        Course Syllabus
      </h2>
      
      <div className="space-y-4">
        {modules.map((module, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleModule(index)}
              className="w-full flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 transition-colors duration-200 min-touch-target"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-lg text-sm font-medium">
                  {index + 1}
                </div>
                <div className="text-left">
                  <h3 className="text-md font-medium text-text-primary">{module.title}</h3>
                  <p className="text-sm text-text-secondary">{module.duration} • {module.topics.length} Topics</p>
                </div>
              </div>
              <Icon 
                name="ChevronDown" 
                size={20} 
                className={`text-text-secondary transition-transform duration-200 ${
                  expandedModules.includes(index) ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedModules.includes(index) && (
              <div className="p-4 bg-surface border-t border-border">
                <p className="text-sm text-text-secondary mb-4">{module.description}</p>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-text-primary">Topics Covered:</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start space-x-2 text-sm text-text-secondary">
                        <Icon name="Play" size={14} className="text-primary mt-1 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {module.practicalHours && (
                  <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-secondary">
                      <Icon name="Code" size={16} />
                      <span className="font-medium">Practical Hours: {module.practicalHours}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSyllabus;