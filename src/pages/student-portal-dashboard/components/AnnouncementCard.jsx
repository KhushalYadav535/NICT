import React from 'react';
import Icon from '../../../components/AppIcon';

const AnnouncementCard = ({ announcement }) => {
  const getTimeAgo = (date) => {
    const now = new Date();
    const announcementDate = new Date(date);
    const diffInHours = Math.floor((now - announcementDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    
    return announcementDate.toLocaleDateString('en-IN');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          announcement.priority === 'high' ? 'bg-error-50' :
          announcement.priority === 'medium'? 'bg-warning-50' : 'bg-primary-50'
        }`}>
          <Icon 
            name={getPriorityIcon(announcement.priority)} 
            size={16} 
            color={`var(--color-${announcement.priority === 'high' ? 'error' : announcement.priority === 'medium' ? 'warning' : 'primary'})`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-text-primary line-clamp-2">{announcement.title}</h4>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(announcement.priority)} bg-opacity-10`}>
              {announcement.priority.toUpperCase()}
            </span>
          </div>
          
          <p className="text-sm text-text-secondary line-clamp-3 mb-3">
            {announcement.content}
          </p>
          
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="User" size={12} />
                <span>{announcement.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{getTimeAgo(announcement.date)}</span>
              </div>
            </div>
            
            {announcement.category && (
              <span className="bg-primary-50 text-primary px-2 py-1 rounded-full">
                {announcement.category}
              </span>
            )}
          </div>
          
          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Paperclip" size={14} color="var(--color-text-secondary)" />
                <span className="text-xs text-text-secondary">
                  {announcement.attachments.length} attachment{announcement.attachments.length !== 1 ? 's' : ''}
                </span>
                <button className="text-primary hover:text-primary-700 text-xs font-medium transition-colors duration-200">
                  View
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;