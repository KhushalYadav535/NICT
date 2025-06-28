import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Default test accounts
  const defaultAccounts = [
    {
      role: 'student',
      email: 'student@niict.com',
      password: 'student123',
      name: 'Rahul Kumar',
      studentId: 'NIICT2024001',
      course: 'DCA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      role: 'admin',
      email: 'admin@niict.com',
      password: 'admin123',
      name: 'Admin User',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      role: 'instructor',
      email: 'instructor@niict.com',
      password: 'instructor123',
      name: 'Prof. Sunita Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const userTypes = [
    { value: 'student', label: 'Student', icon: 'GraduationCap' },
    { value: 'admin', label: 'Administrator', icon: 'Shield' },
    { value: 'instructor', label: 'Instructor', icon: 'UserCheck' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if it's a default account
      const defaultAccount = defaultAccounts.find(
        account => account.email === formData.email && account.password === formData.password
      );

      console.log('Login attempt:', { email: formData.email, defaultAccount });

      if (defaultAccount) {
        // Login successful with default account
        const userData = {
          id: `user_${defaultAccount.role}_1`,
          name: defaultAccount.name,
          email: defaultAccount.email,
          role: defaultAccount.role,
          avatar: defaultAccount.avatar,
          ...(defaultAccount.studentId && { studentId: defaultAccount.studentId }),
          ...(defaultAccount.course && { course: defaultAccount.course })
        };

        console.log('Setting user data:', userData);

        // Store user data
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');

        // Redirect based on role
        const redirectPath = (() => {
          switch (defaultAccount.role) {
            case 'student':
              return '/student-portal-dashboard';
            case 'admin':
              return '/student-management';
            case 'instructor':
              return '/live-classes';
            default:
              return '/student-portal-dashboard';
          }
        })();

        console.log('Redirecting to:', redirectPath);
        navigate(redirectPath);
      } else {
        // Mock login for any other email/password
        const mockUser = {
          id: 'mock_user_1',
          name: 'Test User',
          email: formData.email,
          role: 'student',
          studentId: 'NIICT2024002',
          course: 'Python Programming',
          avatar: 'https://images.unsplash.com/photo-1472099645785-2616b612b786?w=150&h=150&fit=crop&crop=face'
        };

        console.log('Setting mock user data:', mockUser);

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/student-portal-dashboard');
      }

    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleQuickLogin = (account) => {
    setFormData({
      email: account.email,
      password: account.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 px-4">
      <div className="max-w-md mx-auto">
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
            Welcome Back
          </h2>
          <p className="text-text-secondary">
            Sign in to your account to continue
          </p>
        </motion.div>

        {/* Quick Login Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-primary mb-3">Quick Login (Test Accounts)</h3>
          <div className="space-y-2">
            {defaultAccounts.map((account) => (
              <button
                key={account.role}
                onClick={() => handleQuickLogin(account)}
                className="w-full p-3 bg-white rounded-lg border border-border hover:border-primary hover:bg-primary-50 transition-all duration-200 text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <Icon 
                      name={account.role === 'student' ? 'User' : account.role === 'admin' ? 'Shield' : 'Users'} 
                      size={16} 
                      color="var(--color-primary)" 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary capitalize">{account.role}</div>
                    <div className="text-sm text-text-secondary">{account.email}</div>
                  </div>
                  <Icon name="ArrowRight" size={16} color="var(--color-text-secondary)" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-border p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                I am a
              </label>
              <div className="grid grid-cols-3 gap-3">
                {userTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('userType', type.value)}
                    className={`flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.userType === type.value
                        ? 'border-primary bg-primary-50 text-primary'
                        : 'border-border hover:border-primary-200 hover:bg-primary-25'
                    }`}
                  >
                    <Icon name={type.icon} size={24} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div>
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
            </div>

            {/* Password Input */}
            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                error={errors.password}
                placeholder="Enter your password"
                iconName="Lock"
                endIcon={showPassword ? 'EyeOff' : 'Eye'}
                onEndIconClick={() => setShowPassword(!showPassword)}
                required
              />
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

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName={isLoading ? undefined : "LogIn"}
              iconPosition="left"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Forgot your password?
            </Link>
            
            <div className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Test Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <h4 className="text-sm font-medium text-blue-800 mb-2">Test Account Credentials:</h4>
          <div className="space-y-1 text-xs text-blue-700">
            <div><strong>Student:</strong> student@niict.com / student123</div>
            <div><strong>Admin:</strong> admin@niict.com / admin123</div>
            <div><strong>Instructor:</strong> instructor@niict.com / instructor123</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 