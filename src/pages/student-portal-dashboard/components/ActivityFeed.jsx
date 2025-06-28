import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'assignment_submitted': return 'Upload';
      case 'test_completed': return 'CheckCircle';
      case 'grade_received': return 'Award';
      case 'material_downloaded': return 'Download';
      case 'class_attended': return 'Calendar';
      case 'announcement': return 'Bell';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'assignment_submitted': return 'text-primary';
      case 'test_completed': return 'text-success';
      case 'grade_received': return 'text-accent';
      case 'material_downloaded': return 'text-secondary';
      case 'class_attended': return 'text-success';
      case 'announcement': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityDate.toLocaleDateString('en-IN');
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Recent Activity</h3>
        <button className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              activity.type === 'assignment_submitted' ? 'bg-primary-50' :
              activity.type === 'test_completed' ? 'bg-success-50' :
              activity.type === 'grade_received' ? 'bg-accent-50' :
              activity.type === 'material_downloaded' ? 'bg-secondary-50' :
              activity.type === 'class_attended'? 'bg-success-50' : 'bg-gray-50'
            }`}>
              <Icon 
                name={getActivityIcon(activity.type)} 
                size={16} 
                color={`var(--color-${
                  activity.type === 'assignment_submitted' ? 'primary' :
                  activity.type === 'test_completed' ? 'success' :
                  activity.type === 'grade_received' ? 'accent' :
                  activity.type === 'material_downloaded' ? 'secondary' :
                  activity.type === 'class_attended'? 'success' : 'text-secondary'
                })`}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary">
                <span className="font-medium">{activity.title}</span>
                {activity.description && (
                  <span className="text-text-secondary"> - {activity.description}</span>
                )}
              </p>
              
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-xs text-text-secondary">{getTimeAgo(activity.timestamp)}</span>
                {activity.subject && (
                  <>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-primary">{activity.subject}</span>
                  </>
                )}
                {activity.score && (
                  <>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-success font-medium">{activity.score}</span>
                  </>
                )}
              </div>
            </div>
            
            {activity.actionable && (
              <button className="text-primary hover:text-primary-700 text-xs font-medium transition-colors duration-200 flex-shrink-0">
                View
              </button>
            )}
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} color="var(--color-text-muted)" className="mx-auto mb-3" />
          <p className="text-text-secondary">No recent activity</p>
          <p className="text-sm text-text-muted">Your activities will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;