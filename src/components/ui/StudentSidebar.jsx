import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const StudentSidebar = ({ user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/student-portal-dashboard', 
      icon: 'LayoutDashboard',
      description: 'Overview & Progress'
    },
    { 
      label: 'Course Materials', 
      path: '/lms', 
      icon: 'BookOpen',
      description: 'Study Resources'
    },
    { 
      label: 'Live Classes', 
      path: '/live-classes', 
      icon: 'Video',
      description: 'Online Sessions'
    },
    { 
      label: 'Online Tests', 
      path: '/online-test-interface', 
      icon: 'ClipboardCheck',
      description: 'Assessments & Exams'
    },
    { 
      label: 'Resume Builder', 
      path: '/resume-builder', 
      icon: 'FileText',
      description: 'Create Professional Resume'
    },
    { 
      label: 'Certificates', 
      path: '/certificates', 
      icon: 'Award',
      description: 'My Certificates'
    },
    { 
      label: 'Placement', 
      path: '/placement', 
      icon: 'Briefcase',
      description: 'Job Opportunities'
    },
    { 
      label: 'Notifications', 
      path: '/notifications', 
      icon: 'Bell',
      description: 'Updates & Alerts'
    },
    { 
      label: 'Support', 
      path: '/support', 
      icon: 'HelpCircle',
      description: 'Help & Contact'
    },
  ];

  const quickActions = [
    { label: 'Profile Settings', path: '/profile', icon: 'Settings' },
    { label: 'Notifications', path: '/notifications', icon: 'Bell' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-20 left-4 z-150 flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg shadow-lg min-touch-target"
        aria-label="Toggle student menu"
      >
        <Icon name="Menu" size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-100 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div className="fixed inset-y-0 left-0 w-80 bg-surface shadow-xl animate-slide-right" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-heading font-semibold text-text-primary">Student Portal</h2>
                <button
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-8 h-8 rounded-md text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Mobile User Profile */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <Image src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <Icon name="User" size={24} color="var(--color-primary)" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {user?.name || 'Student Name'}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      ID: {user?.studentId || 'STU001'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200 min-touch-target ${
                      isActivePath(item.path)
                        ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs opacity-75">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-border space-y-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.path}
                    to={action.path}
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-3 py-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
                  >
                    <Icon name={action.icon} size={18} />
                    <span className="text-sm">{action.label}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-error hover:bg-error-50 rounded-lg transition-colors duration-200 min-touch-target"
                >
                  <Icon name="LogOut" size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-90 lg:flex-col lg:bg-surface lg:border-r lg:border-border lg:shadow-sm transition-all duration-300 ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        {/* Desktop Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-lg font-heading font-semibold text-text-primary">Student Portal</h2>
          )}
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center w-8 h-8 rounded-md text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
          </button>
        </div>

        {/* Desktop User Profile */}
        <div className="p-4 border-b border-border">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <Icon name="User" size={20} color="var(--color-primary)" />
              )}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user?.name || 'Student Name'}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  ID: {user?.studentId || 'STU001'}
                </p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  <span className="text-xs text-success">Active</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 min-touch-target group ${
                isActivePath(item.path)
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-50'
              } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon name={item.icon} size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs opacity-75">{item.description}</p>
                </div>
              )}
              {isCollapsed && isActivePath(item.path) && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Footer */}
        <div className="p-4 border-t border-border space-y-1">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className={`flex items-center px-3 py-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target group ${
                isCollapsed ? 'justify-center' : 'space-x-3'
              }`}
              title={isCollapsed ? action.label : ''}
            >
              <Icon name={action.icon} size={18} className="flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">{action.label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {action.label}
                </div>
              )}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-2 text-error hover:bg-error-50 rounded-lg transition-colors duration-200 min-touch-target group ${
              isCollapsed ? 'justify-center' : 'space-x-3'
            }`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <Icon name="LogOut" size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Logout</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;