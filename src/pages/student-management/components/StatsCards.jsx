import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ stats }) => {
  const statsData = [
    {
      title: 'Total Students',
      value: stats.totalStudents || 0,
      change: '+12%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Active Enrollments',
      value: stats.activeStudents || 0,
      change: '+8%',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'success'
    },
    {
      title: 'Pending Admissions',
      value: stats.pendingAdmissions || 0,
      change: '-5%',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'This Month Revenue',
      value: `₹${(stats.monthlyRevenue || 0).toLocaleString('en-IN')}`,
      change: '+15%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'secondary'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary',
        text: 'text-primary-700'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success',
        text: 'text-success-700'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning',
        text: 'text-warning-700'
      },
      secondary: {
        bg: 'bg-secondary-50',
        icon: 'text-secondary',
        text: 'text-secondary-700'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        
        return (
          <div key={index} className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-text-primary mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={stat.changeType === 'increase' ? 'text-success' : 'text-error'}
                  />
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-success' : 'text-error'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-text-secondary">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={colors.icon} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;