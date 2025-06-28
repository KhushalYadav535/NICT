import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'course',
      title: 'New Course Material Available',
      message: 'MS Excel Advanced Functions module has been uploaded. Please download and review before the next class.',
      timestamp: '2024-12-20T10:30:00Z',
      isRead: false,
      priority: 'high',
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      action: 'download',
      course: 'DCA',
      instructor: 'Prof. Sunita Sharma'
    },
    {
      id: 2,
      type: 'live-class',
      title: 'Live Class Reminder',
      message: 'Your Python Programming class starts in 30 minutes. Please join the Zoom meeting.',
      timestamp: '2024-12-20T09:00:00Z',
      isRead: false,
      priority: 'urgent',
      icon: 'Video',
      color: 'text-success',
      bgColor: 'bg-success-50',
      action: 'join',
      meetingId: '123456789',
      password: 'python123'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Due Reminder',
      message: 'Your course fee payment is due in 3 days. Please complete the payment to avoid any interruptions.',
      timestamp: '2024-12-19T16:45:00Z',
      isRead: true,
      priority: 'medium',
      icon: 'DollarSign',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      action: 'pay',
      amount: 15000,
      dueDate: '2024-12-23'
    },
    {
      id: 4,
      type: 'assignment',
      title: 'Assignment Submission Due',
      message: 'Your MS Word assignment is due tomorrow. Please submit it through the portal.',
      timestamp: '2024-12-19T14:20:00Z',
      isRead: true,
      priority: 'medium',
      icon: 'BookOpen',
      color: 'text-secondary',
      bgColor: 'bg-secondary-50',
      action: 'submit',
      assignment: 'MS Word Document Formatting',
      dueDate: '2024-12-21'
    },
    {
      id: 5,
      type: 'announcement',
      title: 'Holiday Notice',
      message: 'The institute will remain closed on 25th December for Christmas. Classes will resume on 26th December.',
      timestamp: '2024-12-18T11:15:00Z',
      isRead: true,
      priority: 'low',
      icon: 'Megaphone',
      color: 'text-info',
      bgColor: 'bg-info-50',
      action: 'view'
    },
    {
      id: 6,
      type: 'placement',
      title: 'Job Opportunity',
      message: 'A new job opportunity is available for Python developers. Check the placement portal for details.',
      timestamp: '2024-12-17T15:30:00Z',
      isRead: false,
      priority: 'high',
      icon: 'Briefcase',
      color: 'text-success',
      bgColor: 'bg-success-50',
      action: 'apply',
      company: 'Tech Solutions Ltd',
      position: 'Python Developer'
    }
  ];

  const notificationTypes = [
    { id: 'all', name: 'All Notifications', icon: 'Bell', count: mockNotifications.length },
    { id: 'course', name: 'Course Updates', icon: 'BookOpen', count: mockNotifications.filter(n => n.type === 'course').length },
    { id: 'live-class', name: 'Live Classes', icon: 'Video', count: mockNotifications.filter(n => n.type === 'live-class').length },
    { id: 'payment', name: 'Payments', icon: 'DollarSign', count: mockNotifications.filter(n => n.type === 'payment').length },
    { id: 'assignment', name: 'Assignments', icon: 'FileText', count: mockNotifications.filter(n => n.type === 'assignment').length },
    { id: 'announcement', name: 'Announcements', icon: 'Megaphone', count: mockNotifications.filter(n => n.type === 'announcement').length },
    { id: 'placement', name: 'Placements', icon: 'Briefcase', count: mockNotifications.filter(n => n.type === 'placement').length }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleAction = (notification) => {
    switch (notification.action) {
      case 'download':
        console.log('Downloading course material...');
        break;
      case 'join':
        console.log('Joining live class...');
        window.open(`https://zoom.us/j/${notification.meetingId}?pwd=${notification.password}`, '_blank');
        break;
      case 'pay':
        console.log('Opening payment gateway...');
        break;
      case 'submit':
        console.log('Opening assignment submission...');
        break;
      case 'apply':
        console.log('Opening job application...');
        break;
      default:
        console.log('Viewing notification...');
    }
    handleMarkAsRead(notification.id);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return notificationTime.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      urgent: { bg: 'bg-error-100', text: 'text-error-700', label: 'Urgent' },
      high: { bg: 'bg-warning-100', text: 'text-warning-700', label: 'High' },
      medium: { bg: 'bg-primary-100', text: 'text-primary-700', label: 'Medium' },
      low: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Low' }
    };

    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredNotifications = notifications.filter(notification => 
    selectedType === 'all' || notification.type === selectedType
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Notifications
              </h1>
              <p className="text-text-secondary">
                Stay updated with all important announcements and updates
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
                iconName="Check"
                iconPosition="left"
              >
                Mark All Read
              </Button>
              <Button
                variant="primary"
                iconName="Settings"
                iconPosition="left"
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification Types */}
        <div className="flex flex-wrap gap-2 mb-8">
          {notificationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedType === type.id
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-border hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <Icon name={type.icon} size={16} />
              <span className="font-medium">{type.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedType === type.id ? 'bg-primary text-white' : 'bg-gray-100'
              }`}>
                {type.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Bell" size={32} color="var(--color-text-secondary)" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No notifications
              </h3>
              <p className="text-text-secondary">
                You're all caught up! Check back later for new updates.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${
                  notification.isRead ? 'border-l-gray-200' : 'border-l-primary'
                } ${!notification.isRead ? 'bg-primary-5' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${notification.bgColor}`}>
                      <Icon name={notification.icon} size={24} className={notification.color} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-heading font-semibold text-text-primary">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(notification.priority)}
                          <span className="text-sm text-text-secondary">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                      </div>

                      <p className="text-text-secondary mb-3">
                        {notification.message}
                      </p>

                      {/* Additional Info */}
                      {notification.course && (
                        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                          <div className="flex items-center space-x-1">
                            <Icon name="BookOpen" size={14} />
                            <span>{notification.course}</span>
                          </div>
                          {notification.instructor && (
                            <div className="flex items-center space-x-1">
                              <Icon name="User" size={14} />
                              <span>{notification.instructor}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {notification.amount && (
                        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                          <div className="flex items-center space-x-1">
                            <Icon name="DollarSign" size={14} />
                            <span>₹{notification.amount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>Due: {new Date(notification.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      )}

                      {notification.company && (
                        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                          <div className="flex items-center space-x-1">
                            <Icon name="Building" size={14} />
                            <span>{notification.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Briefcase" size={14} />
                            <span>{notification.position}</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAction(notification)}
                            iconName={
                              notification.action === 'download' ? 'Download' :
                              notification.action === 'join' ? 'Video' :
                              notification.action === 'pay' ? 'CreditCard' :
                              notification.action === 'submit' ? 'Upload' :
                              notification.action === 'apply' ? 'Send' : 'Eye'
                            }
                            iconPosition="left"
                          >
                            {notification.action === 'download' ? 'Download' :
                             notification.action === 'join' ? 'Join Class' :
                             notification.action === 'pay' ? 'Pay Now' :
                             notification.action === 'submit' ? 'Submit' :
                             notification.action === 'apply' ? 'Apply Now' : 'View'}
                          </Button>

                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              iconName="Check"
                            >
                              Mark Read
                            </Button>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                          iconName="Trash2"
                          className="text-error hover:text-error-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Notification Settings */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Notification Preferences
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">Email Notifications</h4>
              <div className="space-y-2">
                {['Course Updates', 'Live Class Reminders', 'Payment Due', 'Assignments'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-text-secondary">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">SMS Notifications</h4>
              <div className="space-y-2">
                {['Urgent Alerts', 'Payment Reminders', 'Class Cancellations'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked={type === 'Urgent Alerts'} className="rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-text-secondary">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">WhatsApp Notifications</h4>
              <div className="space-y-2">
                {['Daily Updates', 'Weekly Reports', 'Important Announcements'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked={type === 'Important Announcements'} className="rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-text-secondary">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 