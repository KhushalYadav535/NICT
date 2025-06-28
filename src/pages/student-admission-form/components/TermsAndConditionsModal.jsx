import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TermsAndConditionsModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-200 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative w-full max-w-2xl bg-surface rounded-xl shadow-modal animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                Terms and Conditions
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 text-text-secondary hover:text-error hover:bg-error-50 rounded-lg transition-colors duration-200"
                aria-label="Close modal"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-6 text-sm text-text-secondary">
                {/* Admission Terms */}
                <section>
                  <h3 className="text-base font-medium text-text-primary mb-3">1. Admission Terms</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>All information provided in the admission form must be accurate and truthful.</li>
                    <li>Admission is subject to verification of documents and eligibility criteria.</li>
                    <li>NIICT reserves the right to reject any application without providing reasons.</li>
                    <li>Admission confirmation is valid only after fee payment and document verification.</li>
                  </ul>
                </section>

                {/* Fee and Payment Terms */}
                <section>
                  <h3 className="text-base font-medium text-text-primary mb-3">2. Fee and Payment Terms</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Course fees must be paid as per the installment schedule provided.</li>
                    <li>Late payment may result in suspension of classes and additional charges.</li>
                    <li>Fees once paid are non-refundable except in cases of course cancellation by the institute.</li>
                    <li>Fee structure may be revised for new batches without prior notice.</li>
                  </ul>
                </section>

                {/* Course and Attendance */}
                <section>
                  <h3 className="text-base font-medium text-text-primary mb-3">3. Course and Attendance</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Minimum 75% attendance is mandatory for course completion certificate.</li>
                    <li>Students must follow the prescribed course curriculum and schedule.</li>
                    <li>Make-up classes may be provided subject to availability and additional charges.</li>
                    <li>Course duration and syllabus may be modified based on industry requirements.</li>
                  </ul>
                </section>

                {/* Code of Conduct */}
                <section>
                  <h3 className="text-base font-medium text-text-primary mb-3">4. Code of Conduct</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Students must maintain discipline and respect towards faculty and fellow students.</li>
                    <li>Use of mobile phones during classes is strictly prohibited.</li>
                    <li>Any damage to institute property will be charged to the student.</li>
                    <li>Violation of rules may result in suspension or termination from the course.</li>
                  </ul>
                </section>

                {/* Certification */}
                <section>
                  <h3 className="text-base font-medium text-text-primary mb-3">5. Certification</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Certificates will be issued only upon successful completion of the course.</li>
                    <li>Students must clear all assignments and examinations to be eligible for certification.</li>
                    <li>Duplicate certificates may be issued with additional charges and processing time.</li>
                    <li>NIICT certificates are recognized by government and industry partners.</li>
                  </ul>
                </section>

                {/* Privacy and Data Protection */}
                <section>
                  <h3 className="text-base font-medium text-text-primary mb-3">6. Privacy and Data Protection</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Student information will be kept confidential and used only for educational purposes.</li>
                    <li>Photos and videos may be used for promotional activities with student consent.</li>
                    <li>Student data will not be shared with third parties without explicit permission.</li>
                    <li>Students have the right to request data modification or deletion.</li>
                  </ul>
                </section>

                {/* Liability and Disclaimer */}
                <section>
                  <h3 className="text-base font-medium text-text-primary mb-3">7. Liability and Disclaimer</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>NIICT is not responsible for any personal belongings lost or damaged on premises.</li>
                    <li>The institute does not guarantee job placement but provides placement assistance.</li>
                    <li>Students participate in practical sessions and projects at their own risk.</li>
                    <li>NIICT reserves the right to modify these terms and conditions without prior notice.</li>
                  </ul>
                </section>

                {/* Contact Information */}
                <section>
                  <h3 className="text-base font-medium text-text-primary mb-3">8. Contact and Grievances</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>For any queries or grievances, contact the admission office during working hours.</li>
                    <li>Written complaints will be addressed within 7 working days.</li>
                    <li>Students can reach out via phone, email, or WhatsApp for support.</li>
                    <li>All disputes are subject to local jurisdiction only.</li>
                  </ul>
                </section>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border">
              <p className="text-xs text-text-secondary">
                Last updated: {new Date().toLocaleDateString('en-IN')}
              </p>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={handleAccept}
                >
                  Accept Terms
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;