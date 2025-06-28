import React from 'react';
import Icon from '../../../components/AppIcon';

const CoursePrerequisites = ({ prerequisites, difficulty }) => {
  const difficultyConfig = {
    beginner: { color: 'text-success', bg: 'bg-success-50', icon: 'Smile' },
    intermediate: { color: 'text-warning', bg: 'bg-warning-50', icon: 'Zap' },
    advanced: { color: 'text-error', bg: 'bg-error-50', icon: 'Flame' }
  };

  const config = difficultyConfig[difficulty] || difficultyConfig.beginner;

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="CheckCircle" size={20} className="mr-2" />
        Prerequisites & Requirements
      </h2>

      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`flex items-center justify-center w-10 h-10 ${config.bg} rounded-lg`}>
            <Icon name={config.icon} size={20} className={config.color} />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Difficulty Level</p>
            <p className={`text-md font-medium capitalize ${config.color}`}>{difficulty}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-md font-medium text-text-primary mb-3">Required Knowledge:</h3>
          <ul className="space-y-2">
            {prerequisites.required.map((req, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-medium text-text-primary mb-3">Recommended (Optional):</h3>
          <ul className="space-y-2">
            {prerequisites.recommended.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="Circle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-primary mb-1">Good to Know</h4>
              <p className="text-sm text-text-secondary">
                Don't worry if you don't meet all the recommended requirements. Our instructors will help you catch up during the course.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePrerequisites;