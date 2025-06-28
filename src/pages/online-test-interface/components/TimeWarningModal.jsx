import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeWarningModal = ({ 
  isOpen, 
  onClose, 
  timeRemaining, 
  warningType 
}) => {
  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getWarningConfig = () => {
    switch (warningType) {
      case '10min':
        return {
          title: '10 Minutes Remaining',
          message: 'You have 10 minutes left to complete the test. Please manage your time wisely.',
          icon: 'Clock',
          color: 'warning',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200'
        };
      case '5min':
        return {
          title: '5 Minutes Remaining',
          message: 'Only 5 minutes left! Please review and submit your answers soon.',
          icon: 'AlertTriangle',
          color: 'error',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200'
        };
      case '1min':
        return {
          title: 'Final Warning',
          message: 'Less than 1 minute remaining! The test will auto-submit when time expires.',
          icon: 'AlertCircle',
          color: 'error',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200'
        };
      default:
        return {
          title: 'Time Warning',
          message: 'Please be aware of the remaining time.',
          icon: 'Clock',
          color: 'warning',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200'
        };
    }
  };

  const config = getWarningConfig();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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
            className="relative w-full max-w-md bg-surface rounded-xl shadow-modal animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-6 border-b border-border ${config.bgColor} ${config.borderColor} rounded-t-xl`}>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon name={config.icon} size={24} color={`var(--color-${config.color})`} />
                </div>
                <div>
                  <h3 className={`text-lg font-heading font-semibold text-${config.color}`}>
                    {config.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Time remaining: {formatTime(timeRemaining)}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <p className="text-text-primary">
                  {config.message}
                </p>

                {/* Time Display */}
                <div className={`p-4 ${config.bgColor} ${config.borderColor} border rounded-lg text-center`}>
                  <div className={`text-2xl font-mono font-bold text-${config.color}`}>
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="text-sm text-text-secondary">Time Remaining</div>
                </div>

                {/* Tips */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary">Quick Tips:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                      <span>Review marked questions first</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                      <span>Answer unanswered questions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                      <span>Submit before time expires</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="primary"
                  size="md"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={onClose}
                >
                  Continue Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeWarningModal;