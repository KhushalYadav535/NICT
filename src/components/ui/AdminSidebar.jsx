import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const AdminSidebar = ({ user, onLogout }) => {
  const [expandedSections, setExpandedSections] = useState(['dashboard']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      items: [
        { label: 'Overview', path: '/admin/dashboard', icon: 'BarChart3' },
        { label: 'Analytics', path: '/analytics', icon: 'TrendingUp' },
        { label: 'Reports', path: '/admin/reports', icon: 'FileBarChart' },
      ]
    },
    {
      id: 'students',
      label: 'Student Management',
      icon: 'Users',
      items: [
        { label: 'All Students', path: '/student-management', icon: 'UserCheck' },
        { label: 'Admissions', path: '/admin/admissions', icon: 'UserPlus' },
        { label: 'Enrollments', path: '/admin/enrollments', icon: 'BookOpen' },
        { label: 'Student Records', path: '/admin/student-records', icon: 'FileText' },
      ]
    },
    {
      id: 'courses',
      label: 'Course Management',
      icon: 'BookOpen',
      items: [
        { label: 'All Courses', path: '/admin/courses', icon: 'Book' },
        { label: 'Course Content', path: '/admin/course-content', icon: 'FileVideo' },
        { label: 'Assignments', path: '/admin/assignments', icon: 'ClipboardList' },
        { label: 'Assessments', path: '/admin/assessments', icon: 'ClipboardCheck' },
      ]
    },
    {
      id: 'faculty',
      label: 'Faculty Management',
      icon: 'GraduationCap',
      items: [
        { label: 'All Faculty', path: '/admin/faculty', icon: 'UserCheck' },
        { label: 'Schedules', path: '/admin/faculty-schedules', icon: 'Calendar' },
        { label: 'Performance', path: '/admin/faculty-performance', icon: 'Award' },
      ]
    },
    {
      id: 'academics',
      label: 'Academic Management',
      icon: 'Calendar',
      items: [
        { label: 'Academic Calendar', path: '/admin/calendar', icon: 'CalendarDays' },
        { label: 'Timetables', path: '/admin/timetables', icon: 'Clock' },
        { label: 'Examinations', path: '/admin/examinations', icon: 'FileCheck' },
        { label: 'Results', path: '/admin/results', icon: 'Trophy' },
      ]
    },
    {
      id: 'finance',
      label: 'Financial Management',
      icon: 'DollarSign',
      items: [
        { label: 'Fee Management', path: '/admin/fees', icon: 'CreditCard' },
        { label: 'Payments', path: '/admin/payments', icon: 'Receipt' },
        { label: 'Financial Reports', path: '/admin/financial-reports', icon: 'PieChart' },
      ]
    },
    {
      id: 'system',
      label: 'System Settings',
      icon: 'Settings',
      items: [
        { label: 'User Management', path: '/admin/users', icon: 'UserCog' },
        { label: 'Roles & Permissions', path: '/admin/roles', icon: 'Shield' },
        { label: 'System Configuration', path: '/admin/config', icon: 'Cog' },
        { label: 'Backup & Security', path: '/admin/security', icon: 'Lock' },
      ]
    }
  ];

  const quickActions = [
    { label: 'Notifications', path: '/admin/notifications', icon: 'Bell', count: 5 },
    { label: 'Messages', path: '/admin/messages', icon: 'MessageSquare', count: 12 },
    { label: 'Support Tickets', path: '/admin/support', icon: 'HelpCircle', count: 3 },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
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
        aria-label="Toggle admin menu"
      >
        <Icon name="Menu" size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-100 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div className="fixed inset-y-0 left-0 w-80 bg-surface shadow-xl animate-slide-right overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-white">
                <h2 className="text-lg font-heading font-semibold">Admin Panel</h2>
                <button
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-8 h-8 rounded-md text-white hover:bg-primary-700 transition-colors duration-200"
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
                      <Icon name="UserCog" size={24} color="var(--color-primary)" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {user?.name || 'Administrator'}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {user?.role || 'System Admin'}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      <span className="text-xs text-success">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Quick Actions */}
              <div className="p-4 border-b border-border">
                <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <Link
                      key={action.path}
                      to={action.path}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between px-3 py-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={action.icon} size={18} />
                        <span className="text-sm">{action.label}</span>
                      </div>
                      {action.count && (
                        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                          {action.count}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                {navigationSections.map((section) => (
                  <div key={section.id} className="mb-4">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full px-3 py-2 text-text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={section.icon} size={18} />
                        <span className="text-sm font-medium">{section.label}</span>
                      </div>
                      <Icon 
                        name="ChevronDown" 
                        size={16} 
                        className={`transition-transform duration-200 ${
                          expandedSections.includes(section.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedSections.includes(section.id) && (
                      <div className="mt-2 ml-6 space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 min-touch-target ${
                              isActivePath(item.path)
                                ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                            }`}
                          >
                            <Icon name={item.icon} size={16} />
                            <span className="text-sm">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-border">
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
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-90 lg:w-72 lg:flex-col lg:bg-surface lg:border-r lg:border-border lg:shadow-sm">
        {/* Desktop Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-primary text-white">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={24} />
            <h2 className="text-lg font-heading font-semibold">Admin Panel</h2>
          </div>
        </div>

        {/* Desktop User Profile */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <Icon name="UserCog" size={24} color="var(--color-primary)" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {user?.role || 'System Admin'}
              </p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                <span className="text-xs text-success">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Quick Actions */}
        <div className="p-6 border-b border-border">
          <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="flex items-center justify-between px-3 py-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={action.icon} size={18} />
                  <span className="text-sm">{action.label}</span>
                </div>
                {action.count && (
                  <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                    {action.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {navigationSections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full px-3 py-2 text-text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={section.icon} size={18} />
                    <span className="text-sm font-medium">{section.label}</span>
                  </div>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`transition-transform duration-200 ${
                      expandedSections.includes(section.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.includes(section.id) && (
                  <div className="mt-2 ml-6 space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 min-touch-target ${
                          isActivePath(item.path)
                            ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                        }`}
                      >
                        <Icon name={item.icon} size={16} />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Desktop Footer */}
        <div className="p-6 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2 text-error hover:bg-error-50 rounded-lg transition-colors duration-200 min-touch-target"
          >
            <Icon name="LogOut" size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;