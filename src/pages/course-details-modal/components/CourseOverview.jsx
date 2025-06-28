import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseOverview = ({ course }) => {
  const highlights = [
    { icon: 'Users', label: 'Students Enrolled', value: course.enrolledStudents },
    { icon: 'Star', label: 'Rating', value: `${course.rating}/5` },
    { icon: 'BookOpen', label: 'Modules', value: course.modules.length },
    { icon: 'Trophy', label: 'Completion Rate', value: course.completionRate }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">Course Overview</h2>
      
      <p className="text-text-secondary mb-6 leading-relaxed">
        {course.description}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {highlights.map((item, index) => (
          <div key={index} className="text-center p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg mx-auto mb-2">
              <Icon name={item.icon} size={20} />
            </div>
            <p className="text-sm text-text-secondary">{item.label}</p>
            <p className="text-lg font-semibold text-text-primary">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-md font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Target" size={18} className="mr-2" />
            Learning Objectives
          </h3>
          <ul className="space-y-2">
            {course.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Briefcase" size={18} className="mr-2" />
            Career Opportunities
          </h3>
          <ul className="space-y-2">
            {course.careerOpportunities.map((opportunity, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;