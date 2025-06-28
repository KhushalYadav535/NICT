import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PersonalDetailsSection from './components/PersonalDetailsSection';
import EducationalDetailsSection from './components/EducationalDetailsSection';
import CourseSelectionSection from './components/CourseSelectionSection';
import EmergencyContactSection from './components/EmergencyContactSection';
import PhotoUploadSection from './components/PhotoUploadSection';
import ProgressIndicator from './components/ProgressIndicator';
import TermsAndConditionsModal from './components/TermsAndConditionsModal';
import SubmissionSuccessModal from './components/SubmissionSuccessModal';

const StudentAdmissionForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const totalSteps = 6;

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form validation functions
  const validatePersonalDetails = () => {
    const newErrors = {};
    
    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.fatherName?.trim()) {
      newErrors.fatherName = "Father's name is required";
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
      if (age < 16 || age > 50) {
        newErrors.dateOfBirth = 'Age must be between 16 and 50 years';
      }
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.mobileNumber?.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    return newErrors;
  };

  const validateEducationalDetails = () => {
    const newErrors = {};
    
    if (!formData.highestQualification) {
      newErrors.highestQualification = 'Highest qualification is required';
    }
    
    if (!formData.yearOfPassing) {
      newErrors.yearOfPassing = 'Year of passing is required';
    } else {
      const currentYear = new Date().getFullYear();
      const year = parseInt(formData.yearOfPassing);
      if (year < 1990 || year > currentYear) {
        newErrors.yearOfPassing = `Year must be between 1990 and ${currentYear}`;
      }
    }
    
    if (!formData.instituteName?.trim()) {
      newErrors.instituteName = 'School/College name is required';
    }
    
    if (!formData.boardUniversity?.trim()) {
      newErrors.boardUniversity = 'Board/University is required';
    }
    
    if (!formData.percentage?.trim()) {
      newErrors.percentage = 'Percentage/CGPA is required';
    }

    return newErrors;
  };

  const validateCourseSelection = () => {
    const newErrors = {};
    
    if (!formData.selectedCourse) {
      newErrors.selectedCourse = 'Please select a course';
    }
    
    if (!formData.preferredTiming) {
      newErrors.preferredTiming = 'Please select preferred batch timing';
    }

    return newErrors;
  };

  const validateEmergencyContact = () => {
    const newErrors = {};
    
    if (!formData.emergencyContactName?.trim()) {
      newErrors.emergencyContactName = 'Emergency contact name is required';
    }
    
    if (!formData.emergencyContactRelation) {
      newErrors.emergencyContactRelation = 'Relationship is required';
    }
    
    if (!formData.emergencyContactMobile?.trim()) {
      newErrors.emergencyContactMobile = 'Emergency contact mobile is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.emergencyContactMobile)) {
      newErrors.emergencyContactMobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (formData.emergencyContactAlternative && !/^[6-9]\d{9}$/.test(formData.emergencyContactAlternative)) {
      newErrors.emergencyContactAlternative = 'Please enter a valid 10-digit mobile number';
    }

    return newErrors;
  };

  const validatePhotoUpload = () => {
    const newErrors = {};
    
    if (!formData.studentPhoto) {
      newErrors.studentPhoto = 'Student photo is required';
    }

    return newErrors;
  };

  // Handle form data changes
  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle field blur for real-time validation
  const handleFieldBlur = (field) => {
    let fieldErrors = {};
    
    // Validate specific field based on current section
    if (currentStep === 1) {
      fieldErrors = validatePersonalDetails();
    } else if (currentStep === 2) {
      fieldErrors = validateEducationalDetails();
    } else if (currentStep === 3) {
      fieldErrors = validateCourseSelection();
    } else if (currentStep === 4) {
      fieldErrors = validateEmergencyContact();
    } else if (currentStep === 5) {
      fieldErrors = validatePhotoUpload();
    }
    
    if (fieldErrors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: fieldErrors[field]
      }));
    }
  };

  // Validate current section
  const validateCurrentSection = () => {
    let sectionErrors = {};
    
    switch (currentStep) {
      case 1:
        sectionErrors = validatePersonalDetails();
        break;
      case 2:
        sectionErrors = validateEducationalDetails();
        break;
      case 3:
        sectionErrors = validateCourseSelection();
        break;
      case 4:
        sectionErrors = validateEmergencyContact();
        break;
      case 5:
        sectionErrors = validatePhotoUpload();
        break;
      default:
        break;
    }
    
    setErrors(sectionErrors);
    return Object.keys(sectionErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateCurrentSection()) {
      if (!completedSections.includes(currentStep)) {
        setCompletedSections(prev => [...prev, currentStep]);
      }
      
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!termsAccepted) {
      setShowTermsModal(true);
      return;
    }

    // Validate all sections
    const allErrors = {
      ...validatePersonalDetails(),
      ...validateEducationalDetails(),
      ...validateCourseSelection(),
      ...validateEmergencyContact(),
      ...validatePhotoUpload()
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // Find first section with errors and navigate to it
      const errorSections = {
        1: validatePersonalDetails(),
        2: validateEducationalDetails(),
        3: validateCourseSelection(),
        4: validateEmergencyContact(),
        5: validatePhotoUpload()
      };
      
      for (let section = 1; section <= 5; section++) {
        if (Object.keys(errorSections[section]).length > 0) {
          setCurrentStep(section);
          break;
        }
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate application ID
      const applicationId = `NIICT${new Date().getFullYear()}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      // Get course name
      const courses = {
        'dca': 'Diploma in Computer Applications (DCA)',
        'tally': 'Tally Prime with GST',
        'ccc': 'Course on Computer Concepts (CCC)',
        'python': 'Python Programming',
        'web-development': 'Web Development',
        'data-entry': 'Data Entry & Typing'
      };
      
      const applicationData = {
        applicationId,
        fullName: formData.fullName,
        courseName: courses[formData.selectedCourse] || 'Selected Course',
        submissionDate: new Date()
      };
      
      setFormData(prev => ({ ...prev, applicationData }));
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle terms acceptance
  const handleTermsAccept = () => {
    setTermsAccepted(true);
    handleSubmit();
  };

  // Handle success modal actions
  const handleDownloadSlip = () => {
    // Implement download functionality
    console.log('Downloading admission slip...');
  };

  const handleGoHome = () => {
    navigate('/homepage');
  };

  // Render current section
  const renderCurrentSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsSection
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onBlur={handleFieldBlur}
          />
        );
      case 2:
        return (
          <EducationalDetailsSection
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onBlur={handleFieldBlur}
          />
        );
      case 3:
        return (
          <CourseSelectionSection
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onBlur={handleFieldBlur}
          />
        );
      case 4:
        return (
          <EmergencyContactSection
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onBlur={handleFieldBlur}
          />
        );
      case 5:
        return (
          <PhotoUploadSection
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
          />
        );
      case 6:
        return (
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto">
                <Icon name="CheckCircle" size={32} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  Review Your Application
                </h3>
                <p className="text-text-secondary">
                  Please review all the information before submitting your admission application.
                </p>
              </div>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-2">Personal Information</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                    <p><span className="font-medium">Mobile:</span> {formData.mobileNumber}</p>
                    <p><span className="font-medium">Email:</span> {formData.email || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-2">Course Details</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p><span className="font-medium">Course:</span> {formData.selectedCourse}</p>
                    <p><span className="font-medium">Timing:</span> {formData.preferredTiming}</p>
                  </div>
                </div>
              </div>
              
              {/* Terms and Conditions */}
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <label htmlFor="terms" className="text-sm text-text-secondary">
                    I have read and agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-primary hover:text-primary-700 underline"
                    >
                      Terms and Conditions
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      className="text-primary hover:text-primary-700 underline"
                    >
                      Privacy Policy
                    </button>
                    . I confirm that all information provided is accurate and complete.
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/homepage')}
                className="text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Home
              </button>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
              <button
                onClick={() => navigate('/course-details-modal')}
                className="text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Courses
              </button>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
              <span className="text-text-primary font-medium">Admission Form</span>
            </nav>
          </div>
        </div>

        {/* Form Header */}
        <div className="bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-heading font-bold mb-2">Student Admission Form</h1>
              <p className="text-primary-100">
                Join NIICT and start your journey towards digital excellence
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                completedSections={completedSections}
              />
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Current Section */}
                {renderCurrentSection()}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6">
                  <div>
                    {currentStep > 1 && (
                      <Button
                        variant="outline"
                        size="lg"
                        iconName="ChevronLeft"
                        iconPosition="left"
                        onClick={handlePreviousStep}
                      >
                        Previous
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {currentStep < totalSteps ? (
                      <Button
                        variant="primary"
                        size="lg"
                        iconName="ChevronRight"
                        iconPosition="right"
                        onClick={handleNextStep}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="lg"
                        iconName="Send"
                        iconPosition="right"
                        loading={isSubmitting}
                        onClick={handleSubmit}
                        disabled={!termsAccepted}
                      >
                        Submit Application
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <TermsAndConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={handleTermsAccept}
      />

      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        applicationData={formData.applicationData}
        onClose={() => setShowSuccessModal(false)}
        onDownloadSlip={handleDownloadSlip}
        onGoHome={handleGoHome}
      />
    </div>
  );
};

export default StudentAdmissionForm;