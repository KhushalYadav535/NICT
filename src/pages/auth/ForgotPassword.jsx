import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = () => {
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email' });
      return false;
    }
    return true;
  };

  const validateOTP = () => {
    if (!formData.otp) {
      setErrors({ otp: 'OTP is required' });
      return false;
    }
    if (formData.otp.length !== 6) {
      setErrors({ otp: 'Please enter 6-digit OTP' });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setOtpSent(true);
      setStep(2);
      setCountdown(60);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      setErrors({ general: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!validateOTP()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStep(3);

    } catch (error) {
      setErrors({ otp: 'Invalid OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success - redirect to login
      navigate('/login', { 
        state: { message: 'Password reset successfully! Please login with your new password.' }
      });

    } catch (error) {
      setErrors({ general: 'Failed to reset password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(60);
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      setErrors({ general: 'Failed to resend OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} color="var(--color-primary)" />
        </div>
        <h2 className="text-xl font-heading font-bold text-text-primary mb-2">
          Forgot Password?
        </h2>
        <p className="text-text-secondary">
          Enter your email address and we'll send you a verification code to reset your password.
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={e => handleInputChange('email', e.target.value)}
        error={errors.email}
        placeholder="Enter your registered email"
        iconName="Mail"
        required
      />

      <Button
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName={isLoading ? undefined : "Send"}
        iconPosition="left"
        onClick={handleSendOTP}
      >
        {isLoading ? 'Sending OTP...' : 'Send OTP'}
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} color="var(--color-secondary)" />
        </div>
        <h2 className="text-xl font-heading font-bold text-text-primary mb-2">
          Enter Verification Code
        </h2>
        <p className="text-text-secondary">
          We've sent a 6-digit code to <strong>{formData.email}</strong>
        </p>
      </div>

      <Input
        label="OTP Code"
        type="text"
        value={formData.otp}
        onChange={(value) => handleInputChange('otp', value)}
        error={errors.otp}
        placeholder="Enter 6-digit OTP"
        iconName="Key"
        maxLength={6}
        required
      />

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={countdown > 0}
          onClick={handleResendOTP}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
        </Button>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
        >
          Change Email
        </button>
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName={isLoading ? undefined : "Check"}
        iconPosition="left"
        onClick={handleVerifyOTP}
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </Button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Lock" size={32} color="var(--color-success)" />
        </div>
        <h2 className="text-xl font-heading font-bold text-text-primary mb-2">
          Set New Password
        </h2>
        <p className="text-text-secondary">
          Create a strong password for your account
        </p>
      </div>

      <Input
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        value={formData.newPassword}
        onChange={(value) => handleInputChange('newPassword', value)}
        error={errors.newPassword}
        placeholder="Enter new password"
        iconName="Lock"
        endIcon={showPassword ? 'EyeOff' : 'Eye'}
        onEndIconClick={() => setShowPassword(!showPassword)}
        required
      />

      <Input
        label="Confirm New Password"
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={(value) => handleInputChange('confirmPassword', value)}
        error={errors.confirmPassword}
        placeholder="Confirm new password"
        iconName="Lock"
        endIcon={showConfirmPassword ? 'EyeOff' : 'Eye'}
        onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        required
      />

      <Button
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName={isLoading ? undefined : "CheckCircle"}
        iconPosition="left"
        onClick={handleResetPassword}
      >
        {isLoading ? 'Resetting Password...' : 'Reset Password'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
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
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-border p-8"
        >
          {/* Error Message */}
          {errors.general && (
            <div className="bg-error-50 border border-error-200 rounded-lg p-3 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                <span className="text-sm text-error">{errors.general}</span>
              </div>
            </div>
          )}

          {/* Step Content */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
            >
              ← Back to Login
            </Link>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6"
        >
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  step >= stepNumber ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword; 