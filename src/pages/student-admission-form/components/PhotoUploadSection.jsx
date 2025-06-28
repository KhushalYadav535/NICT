import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoUploadSection = ({ 
  formData, 
  errors, 
  onChange 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      onChange('photoError', 'Please upload only JPG, JPEG, or PNG images');
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      onChange('photoError', 'Image size should be less than 2MB');
      return;
    }

    setUploading(true);
    
    // Create file reader to convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      // Simulate upload delay for better UX
      setTimeout(() => {
        onChange('studentPhoto', e.target.result);
        onChange('photoError', '');
        setUploading(false);
      }, 1000);
    };
    reader.onerror = () => {
      onChange('photoError', 'Error reading file. Please try again.');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    onChange('studentPhoto', '');
    onChange('photoError', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success-100 rounded-lg">
          <Icon name="Camera" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Student Photo</h3>
          <p className="text-sm text-text-secondary">Upload a clear passport-size photograph</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Photo Upload Area */}
        {!formData.studentPhoto ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
              dragActive
                ? 'border-primary bg-primary-50'
                : uploading
                ? 'border-warning bg-warning-50' :'border-border hover:border-primary hover:bg-primary-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            <div className="space-y-4">
              {uploading ? (
                <>
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warning"></div>
                  </div>
                  <p className="text-sm text-warning-700">Uploading photo...</p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <Icon name="Upload" size={24} color="var(--color-primary)" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-text-secondary">
                      JPG, JPEG or PNG (max 2MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Photo Preview */
          <div className="flex items-start space-x-4 p-4 bg-success-50 border border-success-200 rounded-lg">
            <div className="w-24 h-32 bg-white border border-success-300 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={formData.studentPhoto}
                alt="Student Photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-sm font-medium text-success-700">Photo uploaded successfully</span>
              </div>
              <p className="text-xs text-success-600">
                Make sure the photo is clear and shows your face properly
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="text-xs text-primary hover:text-primary-700 font-medium"
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-xs text-error hover:text-error-700 font-medium"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.studentPhoto && (
          <div className="flex items-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm">{errors.studentPhoto}</span>
          </div>
        )}

        {formData.photoError && (
          <div className="flex items-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm">{formData.photoError}</span>
          </div>
        )}

        {/* Photo Guidelines */}
        <div className="bg-background border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Info" size={16} className="mr-2" />
            Photo Guidelines
          </h4>
          <ul className="space-y-1 text-xs text-text-secondary">
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={12} color="var(--color-success)" />
              <span>Recent passport-size photograph</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={12} color="var(--color-success)" />
              <span>Clear face visibility with proper lighting</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={12} color="var(--color-success)" />
              <span>Plain background (white or light colored)</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={12} color="var(--color-success)" />
              <span>File size should be less than 2MB</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={12} color="var(--color-success)" />
              <span>Supported formats: JPG, JPEG, PNG</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadSection;