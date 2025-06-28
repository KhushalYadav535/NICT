import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CourseHeader = ({ course, onClose }) => {
  return (
    <div className="sticky top-0 z-10 bg-surface border-b border-border">
      <div className="flex items-center justify-between p-4 lg:p-6">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden bg-primary-50 flex-shrink-0">
            <Image 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg lg:text-xl font-heading font-semibold text-text-primary truncate">
              {course.title}
            </h1>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center space-x-1 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-success">
                <Icon name="Award" size={16} />
                <span>Certified</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 text-text-secondary hover:text-error hover:bg-error-50 rounded-lg transition-colors duration-200 min-touch-target ml-4"
          aria-label="Close modal"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
    </div>
  );
};

export default CourseHeader;