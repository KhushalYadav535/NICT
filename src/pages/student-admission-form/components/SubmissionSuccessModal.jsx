import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmissionSuccessModal = ({ isOpen, applicationData, onClose, onDownloadSlip, onGoHome }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div 
      className="fixed inset-0 z-200 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative w-full max-w-lg bg-surface rounded-xl shadow-modal animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Header */}
            <div className="text-center p-8 pb-4">
              <div className="flex items-center justify-center w-20 h-20 bg-success-100 rounded-full mx-auto mb-4">
                <Icon name="CheckCircle" size={40} color="var(--color-success)" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Application Submitted!
              </h2>
              <p className="text-text-secondary">
                Your admission application has been successfully submitted to NIICT Portal.
              </p>
            </div>

            {/* Application Details */}
            <div className="px-8 pb-6">
              <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-success-800 mb-3 flex items-center">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Application Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-success-700">Application ID:</span>
                    <span className="font-mono font-medium text-success-800">
                      {applicationData?.applicationId || 'NIICT2024001'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-success-700">Student Name:</span>
                    <span className="font-medium text-success-800">
                      {applicationData?.fullName || 'Student Name'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-success-700">Course:</span>
                    <span className="font-medium text-success-800">
                      {applicationData?.courseName || 'Selected Course'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-success-700">Submitted On:</span>
                    <span className="font-medium text-success-800">
                      {formatDate(new Date())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-primary-800 mb-3 flex items-center">
                  <Icon name="Clock" size={16} className="mr-2" />
                  What happens next?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-xs font-medium mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-800">Document Verification</p>
                      <p className="text-xs text-primary-700">Our team will verify your submitted documents within 2-3 working days.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-xs font-medium mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-800">Admission Confirmation</p>
                      <p className="text-xs text-primary-700">You'll receive a confirmation call and admission slip via WhatsApp/SMS.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-xs font-medium mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-800">Fee Payment & Class Start</p>
                      <p className="text-xs text-primary-700">Complete fee payment and join your selected batch timing.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-background border border-border rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Need Help?
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Call us:</span>
                    <a 
                      href="tel:+919876543210"
                      className="text-sm font-medium text-primary hover:text-primary-700"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">WhatsApp:</span>
                    <a 
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-secondary hover:text-secondary-700"
                    >
                      Chat with us
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Email:</span>
                    <a 
                      href="mailto:admissions@niict.edu.in"
                      className="text-sm font-medium text-primary hover:text-primary-700"
                    >
                      admissions@niict.edu.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between p-6 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={onDownloadSlip}
              >
                Download Slip
              </Button>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onGoHome}
                >
                  Go to Home
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccessModal;