import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const authStatus = localStorage.getItem('isAuthenticated');

        console.log('AuthContext: Checking auth status:', { storedUser, authStatus });

        if (storedUser && authStatus === 'true') {
          const userData = JSON.parse(storedUser);
          console.log('AuthContext: Setting authenticated user:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log('AuthContext: No valid auth data found');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data based on credentials
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: credentials.email,
        role: credentials.userType,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        permissions: getPermissionsByRole(credentials.userType)
      };

      // Store in localStorage (in real app, use secure tokens)
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');

      setUser(mockUser);
      setIsAuthenticated(true);

      return { success: true, user: mockUser };
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock new user
      const newUser = {
        id: `user_${Date.now()}`,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        role: 'student',
        course: userData.selectedCourse,
        batchPreference: userData.batchPreference,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        permissions: getPermissionsByRole('student'),
        createdAt: new Date().toISOString()
      };

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('isAuthenticated', 'true');

      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');

    // Clear state
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const getPermissionsByRole = (role) => {
    const permissions = {
      student: [
        'view_courses',
        'access_student_dashboard',
        'submit_assignments',
        'take_tests',
        'view_progress',
        'download_materials'
      ],
      instructor: [
        'view_courses',
        'access_instructor_dashboard',
        'create_assignments',
        'grade_assignments',
        'view_student_progress',
        'upload_materials',
        'conduct_live_classes'
      ],
      admin: [
        'view_courses',
        'access_admin_dashboard',
        'manage_students',
        'manage_instructors',
        'manage_courses',
        'view_reports',
        'manage_payments',
        'generate_certificates',
        'system_settings'
      ]
    };

    return permissions[role] || [];
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    hasPermission,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 