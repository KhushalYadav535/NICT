import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    selectedCourse: '',
    batchPreference: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const courses = [
    { id: 'dca', name: 'Diploma in Computer Applications (DCA)', duration: '12 months', fee: '₹15,000' },
    { id: 'tally', name: 'Tally Prime with GST', duration: '3 months', fee: '₹8,000' },
    { id: 'ccc', name: 'Course on Computer Concepts (CCC)', duration: '2 months', fee: '₹5,000' },
    { id: 'python', name: 'Python Programming', duration: '6 months', fee: '₹20,000' },
    { id: 'web-design', name: 'Web Design & Development', duration: '4 months', fee: '₹12,000' },
    { id: 'digital-marketing', name: 'Digital Marketing', duration: '3 months', fee: '₹10,000' }
  ];

  const batchTimings = [
    { id: 'morning', name: 'Morning Batch (9:00 AM - 11:00 AM)' },
    { id: 'afternoon', name: 'Afternoon Batch (2:00 PM - 4:00 PM)' },
    { id: 'evening', name: 'Evening Batch (6:00 PM - 8:00 PM)' },
    { id: 'weekend', name: 'Weekend Batch (Saturday & Sunday)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.selectedCourse) {
      newErrors.selectedCourse = 'Please select a course';
    }

    if (!formData.batchPreference) {
      newErrors.batchPreference = 'Please select batch preference';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock registration success
      const mockUser = {
        id: 'new_user_1',
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: 'student',
        course: formData.selectedCourse,
        batchPreference: formData.batchPreference,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');

      // Redirect to student dashboard
      navigate('/student-portal-dashboard');

    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-lg">
              <Icon name="GraduationCap" size={32} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">NIICT Portal</h1>
              <p className="text-sm text-text-secondary">National Institute of ICT</p>
            </div>
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Create Your Account
          </h2>
          <p className="text-text-secondary">
            Join thousands of students learning digital skills
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-border p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="User" size={20} className="mr-2" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={e => handleInputChange('firstName', e.target.value)}
                  error={errors.firstName}
                  placeholder="Enter your first name"
                  required
                />
                <Input
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={e => handleInputChange('lastName', e.target.value)}
                  error={errors.lastName}
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  placeholder="Enter your email"
                  iconName="Mail"
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  placeholder="Enter your phone number"
                  iconName="Phone"
                  required
                />
              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Shield" size={20} className="mr-2" />
                Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  placeholder="Create a strong password"
                  iconName="Lock"
                  endIcon={showPassword ? 'EyeOff' : 'Eye'}
                  onEndIconClick={() => setShowPassword(!showPassword)}
                  required
                />
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  placeholder="Confirm your password"
                  iconName="Lock"
                  endIcon={showConfirmPassword ? 'EyeOff' : 'Eye'}
                  onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  required
                />
              </div>
            </div>

            {/* Course Selection */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Course Selection
              </h3>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Select Course <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => handleInputChange('selectedCourse', course.id)}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.selectedCourse === course.id
                          ? 'border-primary bg-primary-50 text-primary'
                          : 'border-border hover:border-primary-200 hover:bg-primary-25'
                      }`}
                    >
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm opacity-75">
                        {course.duration} • {course.fee}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.selectedCourse && (
                  <p className="mt-2 text-sm text-error flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    {errors.selectedCourse}
                  </p>
                )}
              </div>
            </div>

            {/* Batch Preference */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Batch Preference <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {batchTimings.map((batch) => (
                  <button
                    key={batch.id}
                    type="button"
                    onClick={() => handleInputChange('batchPreference', batch.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.batchPreference === batch.id
                        ? 'border-primary bg-primary-50 text-primary'
                        : 'border-border hover:border-primary-200 hover:bg-primary-25'
                    }`}
                  >
                    <div className="font-medium">{batch.name}</div>
                  </button>
                ))}
              </div>
              {errors.batchPreference && (
                <p className="mt-2 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.batchPreference}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 rounded border-border text-primary focus:ring-primary"
                />
                <div className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-2 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="bg-error-50 border border-error-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                  <span className="text-sm text-error">{errors.general}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName={isLoading ? undefined : "UserPlus"}
              iconPosition="left"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Award" size={24} color="var(--color-primary)" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Government Certified</h3>
            <p className="text-sm text-text-secondary">All courses are government recognized</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} color="var(--color-secondary)" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Expert Instructors</h3>
            <p className="text-sm text-text-secondary">Learn from industry professionals</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Briefcase" size={24} color="var(--color-success)" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Job Placement</h3>
            <p className="text-sm text-text-secondary">100% placement assistance</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register; 