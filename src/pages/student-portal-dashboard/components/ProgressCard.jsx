import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressCard = ({ course }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name={course.icon} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">{course.name}</h3>
            <p className="text-sm text-text-secondary">{course.instructor}</p>
          </div>
        </div>
        <span className={`text-sm font-medium ${getProgressColor(course.progress)}`}>
          {course.progress}%
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Progress</span>
          <span>{course.completedModules}/{course.totalModules} modules</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBgColor(course.progress)}`}
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} color="var(--color-text-secondary)" />
          <span className="text-text-secondary">{course.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} color="var(--color-text-secondary)" />
          <span className="text-text-secondary">{course.nextClass}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Next: {course.nextTopic}</span>
          <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200">
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;