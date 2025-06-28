import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: 'Overall Progress',
      value: `${stats.overallProgress}%`,
      icon: 'TrendingUp',
      color: 'primary',
      change: '+5%',
      changeType: 'positive'
    },
    {
      label: 'Attendance',
      value: `${stats.attendance}%`,
      icon: 'Calendar',
      color: 'success',
      change: '+2%',
      changeType: 'positive'
    },
    {
      label: 'Assignments',
      value: `${stats.completedAssignments}/${stats.totalAssignments}`,
      icon: 'FileText',
      color: 'accent',
      change: stats.pendingAssignments > 0 ? `${stats.pendingAssignments} pending` : 'All done',
      changeType: stats.pendingAssignments > 0 ? 'warning' : 'positive'
    },
    {
      label: 'Test Average',
      value: `${stats.testAverage}%`,
      icon: 'Award',
      color: 'secondary',
      change: stats.lastTestScore ? `Last: ${stats.lastTestScore}%` : 'No tests yet',
      changeType: stats.lastTestScore >= stats.testAverage ? 'positive' : 'negative'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      case 'warning': return 'AlertCircle';
      default: return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              item.color === 'primary' ? 'bg-primary-50' :
              item.color === 'success' ? 'bg-success-50' :
              item.color === 'accent'? 'bg-accent-50' : 'bg-secondary-50'
            }`}>
              <Icon 
                name={item.icon} 
                size={20} 
                color={`var(--color-${item.color})`}
              />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(item.changeType)}`}>
              <Icon name={getChangeIcon(item.changeType)} size={14} />
              <span className="text-xs font-medium">{item.change}</span>
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">{item.value}</p>
            <p className="text-sm text-text-secondary">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;