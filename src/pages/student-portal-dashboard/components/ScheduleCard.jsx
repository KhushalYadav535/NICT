import React from 'react';
import Icon from '../../../components/AppIcon';

const ScheduleCard = ({ schedule }) => {
  const today = new Date();
  const isToday = (date) => {
    const scheduleDate = new Date(date);
    return scheduleDate.toDateString() === today.toDateString();
  };

  const isTomorrow = (date) => {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const scheduleDate = new Date(date);
    return scheduleDate.toDateString() === tomorrow.toDateString();
  };

  const getDateLabel = (date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return new Date(date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'bg-success text-white';
      case 'upcoming': return 'bg-warning text-white';
      case 'completed': return 'bg-gray-500 text-white';
      default: return 'bg-primary text-white';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">{schedule.subject}</h4>
            <p className="text-sm text-text-secondary">{schedule.instructor}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(schedule.status)}`}>
          {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={14} color="var(--color-text-secondary)" />
          <span className="text-text-secondary">{schedule.time}</span>
          <span className="text-text-secondary">•</span>
          <span className="text-text-secondary">{schedule.duration}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Calendar" size={14} color="var(--color-text-secondary)" />
          <span className="text-text-secondary">{getDateLabel(schedule.date)}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="MapPin" size={14} color="var(--color-text-secondary)" />
          <span className="text-text-secondary">{schedule.location}</span>
        </div>
      </div>

      {schedule.topic && (
        <div className="bg-primary-50 rounded-lg p-3 mb-3">
          <p className="text-sm text-primary font-medium">Today's Topic:</p>
          <p className="text-sm text-text-primary">{schedule.topic}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {schedule.materials && (
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={14} color="var(--color-text-secondary)" />
              <span className="text-xs text-text-secondary">{schedule.materials} materials</span>
            </div>
          )}
        </div>
        
        {schedule.status === 'upcoming' && (
          <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200">
            Join Class →
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;