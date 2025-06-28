import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EducationalDetailsSection = ({ 
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
        <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg">
          <Icon name="GraduationCap" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Educational Background</h3>
          <p className="text-sm text-text-secondary">Please provide your educational qualifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Qualification */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Highest Qualification <span className="text-error">*</span>
          </label>
          <select
            value={formData.highestQualification || ''}
            onChange={(e) => handleInputChange('highestQualification', e.target.value)}
            onBlur={() => handleInputBlur('highestQualification')}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
              errors.highestQualification ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select Qualification</option>
            <option value="10th">10th Class</option>
            <option value="12th">12th Class</option>
            <option value="diploma">Diploma</option>
            <option value="graduation">Graduation</option>
            <option value="post-graduation">Post Graduation</option>
            <option value="other">Other</option>
          </select>
          {errors.highestQualification && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.highestQualification}
            </p>
          )}
        </div>

        {/* Year of Passing */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Year of Passing <span className="text-error">*</span>
          </label>
          <Input
            type="number"
            placeholder="e.g., 2023"
            min="1990"
            max={new Date().getFullYear()}
            value={formData.yearOfPassing || ''}
            onChange={(e) => handleInputChange('yearOfPassing', e.target.value)}
            onBlur={() => handleInputBlur('yearOfPassing')}
            className={errors.yearOfPassing ? 'border-error' : ''}
          />
          {errors.yearOfPassing && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.yearOfPassing}
            </p>
          )}
        </div>

        {/* School/College Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            School/College Name <span className="text-error">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter school or college name"
            value={formData.instituteName || ''}
            onChange={(e) => handleInputChange('instituteName', e.target.value)}
            onBlur={() => handleInputBlur('instituteName')}
            className={errors.instituteName ? 'border-error' : ''}
          />
          {errors.instituteName && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.instituteName}
            </p>
          )}
        </div>

        {/* Board/University */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Board/University <span className="text-error">*</span>
          </label>
          <Input
            type="text"
            placeholder="e.g., CBSE, State Board, University name"
            value={formData.boardUniversity || ''}
            onChange={(e) => handleInputChange('boardUniversity', e.target.value)}
            onBlur={() => handleInputBlur('boardUniversity')}
            className={errors.boardUniversity ? 'border-error' : ''}
          />
          {errors.boardUniversity && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.boardUniversity}
            </p>
          )}
        </div>

        {/* Percentage/CGPA */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Percentage/CGPA <span className="text-error">*</span>
          </label>
          <Input
            type="text"
            placeholder="e.g., 85% or 8.5 CGPA"
            value={formData.percentage || ''}
            onChange={(e) => handleInputChange('percentage', e.target.value)}
            onBlur={() => handleInputBlur('percentage')}
            className={errors.percentage ? 'border-error' : ''}
          />
          {errors.percentage && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.percentage}
            </p>
          )}
        </div>

        {/* Computer Knowledge */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Previous Computer Knowledge
          </label>
          <select
            value={formData.computerKnowledge || ''}
            onChange={(e) => handleInputChange('computerKnowledge', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
          >
            <option value="">Select your computer knowledge level</option>
            <option value="none">No prior knowledge</option>
            <option value="basic">Basic (MS Office, Internet)</option>
            <option value="intermediate">Intermediate (Programming basics)</option>
            <option value="advanced">Advanced (Multiple languages/tools)</option>
          </select>
          <p className="mt-1 text-xs text-text-secondary">
            This helps us customize the course content for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationalDetailsSection;