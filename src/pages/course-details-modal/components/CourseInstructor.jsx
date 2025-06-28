import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CourseInstructor = ({ instructor }) => {
  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="User" size={20} className="mr-2" />
        Meet Your Instructor
      </h2>

      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-primary-100">
            <Image 
              src={instructor.photo} 
              alt={instructor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-text-primary">{instructor.name}</h3>
            <p className="text-sm text-primary font-medium">{instructor.designation}</p>
            <p className="text-sm text-text-secondary">{instructor.experience} years of experience</p>
          </div>

          <p className="text-sm text-text-secondary mb-4 leading-relaxed">
            {instructor.bio}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Specializations:</h4>
              <ul className="space-y-1">
                {instructor.specializations.map((spec, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Star" size={14} className="text-warning" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Achievements:</h4>
              <ul className="space-y-1">
                {instructor.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Award" size={14} className="text-success" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-text-secondary">
                <span className="font-medium text-text-primary">{instructor.studentsCount}</span> students taught
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-warning" />
              <span className="text-text-secondary">
                <span className="font-medium text-text-primary">{instructor.rating}</span> rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {instructor.quote && (
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border-l-4 border-primary">
          <blockquote className="text-sm text-text-secondary italic">
            "{instructor.quote}"
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default CourseInstructor;