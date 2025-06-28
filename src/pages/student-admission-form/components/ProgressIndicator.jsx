import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, completedSections }) => {
  const steps = [
    { id: 1, label: 'Personal Details', icon: 'User' },
    { id: 2, label: 'Education', icon: 'GraduationCap' },
    { id: 3, label: 'Course Selection', icon: 'BookOpen' },
    { id: 4, label: 'Emergency Contact', icon: 'Phone' },
    { id: 5, label: 'Photo Upload', icon: 'Camera' },
    { id: 6, label: 'Review & Submit', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepId) => {
    if (completedSections.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const progressPercentage = (completedSections.length / totalSteps) * 100;

  return (
    <div className="bg-surface rounded-lg border border-border p-6 sticky top-24">
      <div className="space-y-6">
        {/* Progress Header */}
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Application Progress
          </h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              {completedSections.length} of {totalSteps} sections completed
            </span>
            <span className="font-medium text-primary">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  status === 'current' ?'bg-primary-50 border border-primary-200'
                    : status === 'completed' ?'bg-success-50 border border-success-200' :'bg-background border border-border'
                }`}
              >
                {/* Step Icon */}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                    status === 'completed'
                      ? 'bg-success text-white'
                      : status === 'current' ?'bg-primary text-white' :'bg-border text-text-secondary'
                  }`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      status === 'completed'
                        ? 'text-success-700'
                        : status === 'current' ?'text-primary' :'text-text-secondary'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Step {step.id} of {totalSteps}
                  </p>
                </div>

                {/* Step Status Indicator */}
                {status === 'current' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedSections.length === totalSteps && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-success rounded-full">
                <Icon name="CheckCircle" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-success-700">
                  Application Complete!
                </p>
                <p className="text-xs text-success-600">
                  Ready to submit your admission form
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-background border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            Need Help?
          </h4>
          <p className="text-xs text-text-secondary mb-3">
            Having trouble filling the form? Contact our admission team.
          </p>
          <div className="space-y-2">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs text-secondary hover:text-secondary-700 transition-colors duration-200"
            >
              <Icon name="MessageCircle" size={14} />
              <span>WhatsApp Support</span>
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center space-x-2 text-xs text-secondary hover:text-secondary-700 transition-colors duration-200"
            >
              <Icon name="Phone" size={14} />
              <span>Call: +91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;