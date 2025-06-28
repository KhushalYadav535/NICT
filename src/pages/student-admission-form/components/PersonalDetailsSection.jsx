import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PersonalDetailsSection = ({ 
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
        <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
          <Icon name="User" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Personal Details</h3>
          <p className="text-sm text-text-secondary">Please provide your basic information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Full Name <span className="text-error">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            onBlur={() => handleInputBlur('fullName')}
            className={errors.fullName ? 'border-error' : ''}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Father's Name <span className="text-error">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter father's name"
            value={formData.fatherName || ''}
            onChange={(e) => handleInputChange('fatherName', e.target.value)}
            onBlur={() => handleInputBlur('fatherName')}
            className={errors.fatherName ? 'border-error' : ''}
          />
          {errors.fatherName && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.fatherName}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date of Birth <span className="text-error">*</span>
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            onBlur={() => handleInputBlur('dateOfBirth')}
            className={errors.dateOfBirth ? 'border-error' : ''}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Gender <span className="text-error">*</span>
          </label>
          <select
            value={formData.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            onBlur={() => handleInputBlur('gender')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
              errors.gender ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.gender}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Category <span className="text-error">*</span>
          </label>
          <select
            value={formData.category || ''}
            onChange={(e) => handleInputChange('category', e.target.value)}
            onBlur={() => handleInputBlur('category')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
              errors.category ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select Category</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="ews">EWS</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.category}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Mobile Number <span className="text-error">*</span>
          </label>
          <Input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData.mobileNumber || ''}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            onBlur={() => handleInputBlur('mobileNumber')}
            className={errors.mobileNumber ? 'border-error' : ''}
          />
          {errors.mobileNumber && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.mobileNumber}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="Enter email address (optional)"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleInputBlur('email')}
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Complete Address <span className="text-error">*</span>
          </label>
          <textarea
            placeholder="Enter your complete address with village/city, district, state, and PIN code"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            onBlur={() => handleInputBlur('address')}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none ${
              errors.address ? 'border-error' : 'border-border'
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;