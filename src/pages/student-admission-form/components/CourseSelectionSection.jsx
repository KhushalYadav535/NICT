import React from 'react';

import Icon from '../../../components/AppIcon';

const CourseSelectionSection = ({ 
  formData, 
  errors, 
  onChange, 
  onBlur 
}) => {
  const courses = [
    {
      id: 'dca',
      name: 'Diploma in Computer Applications (DCA)',
      duration: '12 months',
      fee: 15000,
      installments: [
        { amount: 5000, due: 'At admission' },
        { amount: 5000, due: 'After 4 months' },
        { amount: 5000, due: 'After 8 months' }
      ],
      description: 'Complete computer course covering MS Office, Internet, Tally, and basic programming'
    },
    {
      id: 'tally',
      name: 'Tally Prime with GST',
      duration: '3 months',
      fee: 8000,
      installments: [
        { amount: 4000, due: 'At admission' },
        { amount: 4000, due: 'After 1.5 months' }
      ],
      description: 'Comprehensive accounting software training with GST compliance'
    },
    {
      id: 'ccc',
      name: 'Course on Computer Concepts (CCC)',
      duration: '2 months',
      fee: 5000,
      installments: [
        { amount: 5000, due: 'At admission' }
      ],
      description: 'Government certified basic computer literacy course'
    },
    {
      id: 'python',
      name: 'Python Programming',
      duration: '6 months',
      fee: 12000,
      installments: [
        { amount: 6000, due: 'At admission' },
        { amount: 6000, due: 'After 3 months' }
      ],
      description: 'Learn Python programming from basics to advanced with projects'
    },
    {
      id: 'web-development',
      name: 'Web Development (HTML, CSS, JavaScript)',
      duration: '8 months',
      fee: 18000,
      installments: [
        { amount: 6000, due: 'At admission' },
        { amount: 6000, due: 'After 3 months' },
        { amount: 6000, due: 'After 6 months' }
      ],
      description: 'Complete web development course with modern technologies'
    },
    {
      id: 'data-entry',
      name: 'Data Entry & Typing',
      duration: '1 month',
      fee: 3000,
      installments: [
        { amount: 3000, due: 'At admission' }
      ],
      description: 'Professional typing and data entry skills development'
    }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleInputBlur = (field) => {
    if (onBlur) {
      onBlur(field);
    }
  };

  const selectedCourse = courses.find(course => course.id === formData.selectedCourse);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent-100 rounded-lg">
          <Icon name="BookOpen" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Course Selection</h3>
          <p className="text-sm text-text-secondary">Choose the course you want to enroll in</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Course Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Select Course <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-1 gap-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-primary-300 ${
                  formData.selectedCourse === course.id
                    ? 'border-primary bg-primary-50' :'border-border bg-surface'
                }`}
                onClick={() => handleInputChange('selectedCourse', course.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-5 h-5 mt-1">
                    <input
                      type="radio"
                      name="selectedCourse"
                      value={course.id}
                      checked={formData.selectedCourse === course.id}
                      onChange={(e) => handleInputChange('selectedCourse', e.target.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-text-primary">{course.name}</h4>
                      <span className="text-lg font-semibold text-primary">
                        {formatCurrency(course.fee)}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mb-2">{course.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>Duration: {course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="CreditCard" size={14} />
                        <span>{course.installments.length} installment{course.installments.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.selectedCourse && (
            <p className="mt-2 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.selectedCourse}
            </p>
          )}
        </div>

        {/* Course Details Display */}
        {selectedCourse && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Course Fee Structure
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Total Course Fee:</span>
                <span className="text-lg font-semibold text-primary">
                  {formatCurrency(selectedCourse.fee)}
                </span>
              </div>
              <div className="border-t border-primary-200 pt-2">
                <p className="text-xs text-text-secondary mb-2">Payment Schedule:</p>
                {selectedCourse.installments.map((installment, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">{installment.due}:</span>
                    <span className="font-medium text-text-primary">
                      {formatCurrency(installment.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preferred Batch Timing */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Preferred Batch Timing <span className="text-error">*</span>
          </label>
          <select
            value={formData.preferredTiming || ''}
            onChange={(e) => handleInputChange('preferredTiming', e.target.value)}
            onBlur={() => handleInputBlur('preferredTiming')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
              errors.preferredTiming ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select preferred timing</option>
            <option value="morning">Morning Batch (9:00 AM - 12:00 PM)</option>
            <option value="afternoon">Afternoon Batch (1:00 PM - 4:00 PM)</option>
            <option value="evening">Evening Batch (5:00 PM - 8:00 PM)</option>
            <option value="weekend">Weekend Batch (Saturday & Sunday)</option>
          </select>
          {errors.preferredTiming && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.preferredTiming}
            </p>
          )}
        </div>

        {/* How did you hear about us */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            How did you hear about us?
          </label>
          <select
            value={formData.referralSource || ''}
            onChange={(e) => handleInputChange('referralSource', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
          >
            <option value="">Select source</option>
            <option value="friend">Friend/Family Reference</option>
            <option value="social-media">Social Media (Facebook/WhatsApp)</option>
            <option value="advertisement">Local Advertisement</option>
            <option value="website">Website/Google Search</option>
            <option value="walk-in">Direct Visit to Center</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseSelectionSection;