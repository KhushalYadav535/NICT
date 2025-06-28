import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Courses', path: '/course-details-modal', icon: 'BookOpen' },
    { label: 'Admissions', path: '/student-admission-form', icon: 'UserPlus' },
    { label: 'Resume Builder', path: '/resume-builder', icon: 'FileText' },
    { label: 'Student Portal', path: '/student-portal-dashboard', icon: 'User' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg group-hover:bg-primary-700 transition-colors duration-200">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-semibold text-text-primary">
                NIICT Portal
              </span>
              <span className="text-xs text-text-secondary font-caption">
                National Institute of ICT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-touch-target ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA and Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-secondary transition-colors duration-200 min-touch-target"
            >
              <Icon name="MessageCircle" size={18} />
              <span>WhatsApp</span>
            </a>
            <Button
              variant="primary"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => window.location.href = '/student-admission-form'}
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 min-touch-target"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-90 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div className="bg-surface border-b border-border shadow-lg animate-slide-down">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 min-touch-target ${
                      isActivePath(item.path)
                        ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA Section */}
              <div className="pt-4 border-t border-border space-y-3">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-secondary border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors duration-200 min-touch-target"
                >
                  <Icon name="MessageCircle" size={20} />
                  <span className="font-medium">Contact on WhatsApp</span>
                </a>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => {
                    closeMobileMenu();
                    window.location.href = '/student-admission-form';
                  }}
                >
                  Apply for Admission
                </Button>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-border">
                <div className="text-center space-y-2">
                  <p className="text-sm text-text-secondary">
                    Need help? Call us at
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-primary font-medium hover:text-primary-700 transition-colors duration-200"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;