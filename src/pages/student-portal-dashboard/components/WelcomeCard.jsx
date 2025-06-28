import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeCard = ({ user, currentTime }) => {
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary-700 rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <Image 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <Icon name="User" size={32} color="white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">
              {getGreeting()}, {user?.name || 'Student'}!
            </h1>
            <p className="text-primary-100 text-sm">
              {formatDate()}
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={16} />
                <span className="text-sm">{user?.course || 'DCA Course'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span className="text-sm">Batch: {user?.batch || 'Morning'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-primary-100 text-sm">Student ID</p>
            <p className="font-semibold">{user?.studentId || 'STU001'}</p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;