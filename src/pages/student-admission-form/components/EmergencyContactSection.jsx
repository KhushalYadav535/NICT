import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EmergencyContactSection = ({ 
  formData, 
  errors, 
  onChange, 
  onBlur 
}) => {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleInputBlur = (field) => {
    if (onBlur) {
      onBlur(field);
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-warning-100 rounded-lg">
          <Icon name="Phone" size={20} color="var(--color-warning)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Emergency Contact</h3>
          <p className="text-sm text-text-secondary">Person to contact in case of emergency</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Contact Name */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Contact Person Name <span className="text-error">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter emergency contact name"
            value={formData.emergencyContactName || ''}
            onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
            onBlur={() => handleInputBlur('emergencyContactName')}
            className={errors.emergencyContactName ? 'border-error' : ''}
          />
          {errors.emergencyContactName && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.emergencyContactName}
            </p>
          )}
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Relationship <span className="text-error">*</span>
          </label>
          <select
            value={formData.emergencyContactRelation || ''}
            onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
            onBlur={() => handleInputBlur('emergencyContactRelation')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
              errors.emergencyContactRelation ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select relationship</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="guardian">Guardian</option>
            <option value="brother">Brother</option>
            <option value="sister">Sister</option>
            <option value="spouse">Spouse</option>
            <option value="uncle">Uncle</option>
            <option value="aunt">Aunt</option>
            <option value="other">Other</option>
          </select>
          {errors.emergencyContactRelation && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.emergencyContactRelation}
            </p>
          )}
        </div>

        {/* Emergency Contact Mobile */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Mobile Number <span className="text-error">*</span>
          </label>
          <Input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData.emergencyContactMobile || ''}
            onChange={(e) => handleInputChange('emergencyContactMobile', e.target.value)}
            onBlur={() => handleInputBlur('emergencyContactMobile')}
            className={errors.emergencyContactMobile ? 'border-error' : ''}
          />
          {errors.emergencyContactMobile && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.emergencyContactMobile}
            </p>
          )}
        </div>

        {/* Alternative Contact */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Alternative Number
          </label>
          <Input
            type="tel"
            placeholder="Alternative contact number (optional)"
            value={formData.emergencyContactAlternative || ''}
            onChange={(e) => handleInputChange('emergencyContactAlternative', e.target.value)}
            onBlur={() => handleInputBlur('emergencyContactAlternative')}
            className={errors.emergencyContactAlternative ? 'border-error' : ''}
          />
          {errors.emergencyContactAlternative && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.emergencyContactAlternative}
            </p>
          )}
        </div>

        {/* Emergency Contact Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Address
          </label>
          <textarea
            placeholder="Enter emergency contact address (if different from student address)"
            value={formData.emergencyContactAddress || ''}
            onChange={(e) => handleInputChange('emergencyContactAddress', e.target.value)}
            onBlur={() => handleInputBlur('emergencyContactAddress')}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
          />
          <p className="mt-1 text-xs text-text-secondary">
            Leave blank if same as student address
          </p>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-warning-800 mb-1">Important Note</h4>
            <p className="text-xs text-warning-700">
              This contact person will be notified in case of any emergency during your course period. 
              Please ensure the provided information is accurate and the person is easily reachable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactSection;