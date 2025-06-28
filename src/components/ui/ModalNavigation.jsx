import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ModalNavigation = ({ 
  title, 
  onClose, 
  onEnroll, 
  showEnrollButton = true, 
  enrollButtonText = "Enroll Now",
  isEnrollLoading = false,
  breadcrumbs = [],
  actions = []
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEnrollClick = () => {
    if (onEnroll) {
      onEnroll();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-200 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative w-full max-w-4xl bg-surface rounded-xl shadow-modal animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-surface border-b border-border rounded-t-xl">
              <div className="flex items-center justify-between p-6">
                <div className="flex-1 min-w-0">
                  {/* Breadcrumbs */}
                  {breadcrumbs.length > 0 && (
                    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
                      {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <Icon name="ChevronRight" size={14} />}
                          <span className={index === breadcrumbs.length - 1 ? 'text-text-primary font-medium' : 'hover:text-primary cursor-pointer'}>
                            {crumb.label}
                          </span>
                        </React.Fragment>
                      ))}
                    </nav>
                  )}
                  
                  {/* Title */}
                  <h2 className="text-xl font-heading font-semibold text-text-primary truncate">
                    {title}
                  </h2>
                </div>

                {/* Header Actions */}
                <div className="flex items-center space-x-3 ml-4">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className="flex items-center justify-center w-10 h-10 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
                      title={action.label}
                    >
                      <Icon name={action.icon} size={20} />
                    </button>
                  ))}
                  
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-10 h-10 text-text-secondary hover:text-error hover:bg-error-50 rounded-lg transition-colors duration-200 min-touch-target"
                    aria-label="Close modal"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Content will be passed as children */}
            </div>

            {/* Modal Footer */}
            {showEnrollButton && (
              <div className="sticky bottom-0 bg-surface border-t border-border rounded-b-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Clock" size={16} />
                      <span>Limited seats available</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-success">
                      <Icon name="Shield" size={16} />
                      <span>Government certified</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
                    >
                      Browse More
                    </button>
                    <Button
                      variant="primary"
                      size="lg"
                      iconName="ArrowRight"
                      iconPosition="right"
                      loading={isEnrollLoading}
                      onClick={handleEnrollClick}
                    >
                      {enrollButtonText}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-specific adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.inset-0 .flex.min-h-full {
            align-items: flex-start;
            padding-top: 1rem;
          }
          
          .relative.w-full.max-w-4xl {
            max-width: calc(100vw - 2rem);
            margin: 0 1rem;
            max-height: calc(100vh - 2rem);
          }
          
          .p-6 {
            padding: 1rem;
          }
          
          .sticky.bottom-0 .flex.items-center.justify-between {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          
          .sticky.bottom-0 .flex.items-center.space-x-3 {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default ModalNavigation;