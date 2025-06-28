import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionCard = ({ action, onClick }) => {
  const getActionColor = (type) => {
    switch (type) {
      case 'test': return 'bg-accent-50 border-accent-200 text-accent-700';
      case 'assignment': return 'bg-primary-50 border-primary-200 text-primary-700';
      case 'material': return 'bg-secondary-50 border-secondary-200 text-secondary-700';
      case 'schedule': return 'bg-success-50 border-success-200 text-success-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'test': return 'var(--color-accent)';
      case 'assignment': return 'var(--color-primary)';
      case 'material': return 'var(--color-secondary)';
      case 'schedule': return 'var(--color-success)';
      default: return 'var(--color-text-secondary)';
    }
  };

  return (
    <div className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${getActionColor(action.type)}`} onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <Icon name={action.icon} size={20} color={getIconColor(action.type)} />
        </div>
        {action.badge && (
          <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
            {action.badge}
          </span>
        )}
      </div>
      
      <h3 className="font-medium mb-1">{action.title}</h3>
      <p className="text-sm opacity-80 mb-3">{action.description}</p>
      
      <div className="flex items-center justify-between">
        {action.status && (
          <span className="text-xs font-medium">{action.status}</span>
        )}
        <Icon name="ArrowRight" size={16} />
      </div>
    </div>
  );
};

export default QuickActionCard;