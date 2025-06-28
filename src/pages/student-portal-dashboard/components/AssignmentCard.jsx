import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentCard = ({ assignment }) => {
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'text-success';
      case 'overdue': return 'text-error';
      case 'pending': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'submitted': return 'bg-success-50 border-success-200';
      case 'overdue': return 'bg-error-50 border-error-200';
      case 'pending': return 'bg-warning-50 border-warning-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const daysRemaining = getDaysRemaining(assignment.dueDate);
  const isOverdue = daysRemaining < 0;
  const isUrgent = daysRemaining <= 2 && daysRemaining >= 0;

  return (
    <div className={`bg-surface border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${getStatusBg(assignment.status)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="FileText" size={16} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-text-primary truncate">{assignment.title}</h4>
            <p className="text-sm text-text-secondary">{assignment.subject}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(assignment.status)} ${getStatusBg(assignment.status)}`}>
          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={14} color="var(--color-text-secondary)" />
            <span className="text-text-secondary">Due: {new Date(assignment.dueDate).toLocaleDateString('en-IN')}</span>
          </div>
          {isOverdue ? (
            <span className="text-error font-medium">Overdue</span>
          ) : isUrgent ? (
            <span className="text-warning font-medium">{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left</span>
          ) : (
            <span className="text-text-secondary">{daysRemaining} days left</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="User" size={14} color="var(--color-text-secondary)" />
          <span className="text-text-secondary">By: {assignment.instructor}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Paperclip" size={14} color="var(--color-text-secondary)" />
          <span className="text-xs text-text-secondary">{assignment.attachments} attachment{assignment.attachments !== 1 ? 's' : ''}</span>
        </div>
        
        {assignment.status === 'pending' ? (
          <Button variant="primary" size="xs" iconName="Upload">
            Submit
          </Button>
        ) : assignment.status === 'submitted' ? (
          <Button variant="ghost" size="xs" iconName="Eye">
            View
          </Button>
        ) : (
          <Button variant="outline" size="xs" iconName="AlertCircle">
            Review
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;