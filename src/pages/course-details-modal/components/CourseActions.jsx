import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseActions = ({ course, onClose }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const navigate = useNavigate();

  const handleEnrollNow = async () => {
    setIsEnrolling(true);
    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolling(false);
      onClose();
      navigate('/student-admission-form', { 
        state: { selectedCourse: course.id } 
      });
    }, 1500);
  };

  const handleWatchDemo = () => {
    if (course.demoVideoUrl) {
      window.open(course.demoVideoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in the ${course.title} course. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="sticky bottom-0 bg-surface border-t border-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Course Info Summary */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={16} />
            <span>Limited seats available</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="Shield" size={16} />
            <span>Government certified</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-primary">
            <Icon name="Users" size={16} />
            <span>{course.enrolledStudents}+ enrolled</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleWhatsAppContact}
            className="flex items-center justify-center space-x-2 px-4 py-2 text-secondary border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors duration-200 min-touch-target"
          >
            <Icon name="MessageCircle" size={18} />
            <span className="font-medium">WhatsApp</span>
          </button>

          {course.demoVideoUrl && (
            <button
              onClick={handleWatchDemo}
              className="flex items-center justify-center space-x-2 px-4 py-2 text-text-secondary border border-border rounded-lg hover:bg-primary-50 hover:text-primary transition-colors duration-200 min-touch-target"
            >
              <Icon name="Play" size={18} />
              <span className="font-medium">Watch Demo</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex items-center justify-center px-4 py-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
          >
            Browse More
          </button>

          <Button
            variant="primary"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            loading={isEnrolling}
            onClick={handleEnrollNow}
            className="min-w-[140px]"
          >
            {isEnrolling ? 'Processing...' : 'Enroll Now'}
          </Button>
        </div>
      </div>

      {/* Mobile Price Display */}
      <div className="lg:hidden mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Course Fee</p>
            <div className="flex items-center space-x-2">
              {course.feeStructure.originalPrice > course.feeStructure.currentPrice && (
                <span className="text-sm text-text-secondary line-through">
                  ₹{course.feeStructure.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-lg font-bold text-primary">
                ₹{course.feeStructure.currentPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-success">EMI available</p>
            <p className="text-sm text-text-secondary">
              From ₹{Math.ceil(course.feeStructure.currentPrice / 6).toLocaleString('en-IN')}/month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseActions;