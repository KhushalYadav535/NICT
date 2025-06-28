import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmitConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  answeredCount, 
  totalQuestions, 
  markedCount,
  isSubmitting 
}) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

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
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} color="var(--color-warning)" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Submit Test
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Are you sure you want to submit your test?
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Test Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-text-primary mb-3">Test Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-success">{answeredCount}</div>
                      <div className="text-xs text-text-secondary">Answered</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-warning">{markedCount}</div>
                      <div className="text-xs text-text-secondary">Marked</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-error">{unansweredCount}</div>
                      <div className="text-xs text-text-secondary">Unanswered</div>
                    </div>
                  </div>
                </div>

                {/* Warnings */}
                {unansweredCount > 0 && (
                  <div className="flex items-start space-x-3 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                    <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
                    <div>
                      <p className="text-sm font-medium text-warning">
                        {unansweredCount} question{unansweredCount > 1 ? 's' : ''} unanswered
                      </p>
                      <p className="text-xs text-warning-700">
                        Unanswered questions will be marked as incorrect.
                      </p>
                    </div>
                  </div>
                )}

                {markedCount > 0 && (
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Icon name="Info" size={20} color="var(--color-primary)" />
                    <div>
                      <p className="text-sm font-medium text-primary">
                        {markedCount} question{markedCount > 1 ? 's' : ''} marked for review
                      </p>
                      <p className="text-xs text-blue-700">
                        You can review these questions before submitting.
                      </p>
                    </div>
                  </div>
                )}

                {/* Important Note */}
                <div className="flex items-start space-x-3 p-3 bg-error-50 border border-error-200 rounded-lg">
                  <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
                  <div>
                    <p className="text-sm font-medium text-error">Important</p>
                    <p className="text-xs text-error-700">
                      Once submitted, you cannot change your answers. Make sure you have reviewed all questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Review Again
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  iconName="Send"
                  iconPosition="right"
                  onClick={onConfirm}
                  loading={isSubmitting}
                >
                  Submit Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmationModal;