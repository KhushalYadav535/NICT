import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";

// Auth Pages
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ForgotPassword from "pages/auth/ForgotPassword";

// Public Pages
import Homepage from "pages/homepage";
import NotFound from "pages/NotFound";

// Protected Pages
import StudentPortalDashboard from "pages/student-portal-dashboard";
import OnlineTestInterface from "pages/online-test-interface";
import CourseDetailsModal from "pages/course-details-modal";
import StudentManagement from "pages/student-management";
import StudentAdmissionForm from "pages/student-admission-form";

// Additional Feature Pages
import LiveClasses from "pages/live-classes";
import CourseMaterials from "pages/lms/CourseMaterials";
import Analytics from "pages/analytics";
import Notifications from "pages/notifications";
import Certificates from "pages/certificates";
import PlacementPortal from "pages/placement";
import SupportPortal from "pages/support";
import ResumeBuilder from "pages/resume-builder";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route 
            path="/student-portal-dashboard" 
            element={
              <ProtectedRoute requiredRole="student">
                <StudentPortalDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/online-test-interface" 
            element={
              <ProtectedRoute requiredRole="student">
                <OnlineTestInterface />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/course-details-modal" 
            element={
              <ProtectedRoute requiredRole="student">
                <CourseDetailsModal />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/student-management" 
            element={
              <ProtectedRoute requiredRole="admin">
                <StudentManagement />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/student-admission-form" 
            element={<StudentAdmissionForm />} 
          />

          {/* Live Classes */}
          <Route 
            path="/live-classes" 
            element={
              <ProtectedRoute requiredRole="student">
                <LiveClasses />
              </ProtectedRoute>
            } 
          />

          {/* LMS - Course Materials */}
          <Route 
            path="/lms" 
            element={
              <ProtectedRoute requiredRole="student">
                <CourseMaterials />
              </ProtectedRoute>
            } 
          />

          {/* Analytics Dashboard */}
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Analytics />
              </ProtectedRoute>
            } 
          />

          {/* Notifications */}
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } 
          />

          {/* Certificates */}
          <Route 
            path="/certificates" 
            element={
              <ProtectedRoute requiredRole="student">
                <Certificates />
              </ProtectedRoute>
            } 
          />

          {/* Placement Portal */}
          <Route 
            path="/placement" 
            element={
              <ProtectedRoute requiredRole="student">
                <PlacementPortal />
              </ProtectedRoute>
            } 
          />

          {/* Support */}
          <Route 
            path="/support" 
            element={
              <ProtectedRoute>
                <SupportPortal />
              </ProtectedRoute>
            } 
          />

          {/* Resume Builder */}
          <Route 
            path="/resume-builder" 
            element={<ResumeBuilder />} 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;