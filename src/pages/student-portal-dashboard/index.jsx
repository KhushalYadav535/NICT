import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StudentSidebar from '../../components/ui/StudentSidebar';
import WelcomeCard from './components/WelcomeCard';
import StatsOverview from './components/StatsOverview';
import ProgressCard from './components/ProgressCard';
import AssignmentCard from './components/AssignmentCard';
import AnnouncementCard from './components/AnnouncementCard';
import QuickActionCard from './components/QuickActionCard';
import ScheduleCard from './components/ScheduleCard';
import ActivityFeed from './components/ActivityFeed';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentPortalDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use user from AuthContext or fallback to mock data
  const currentUser = user || {
    name: "Priya Sharma",
    studentId: "STU2024001",
    course: "DCA (Diploma in Computer Applications)",
    batch: "Morning Batch",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock statistics data
  const mockStats = {
    overallProgress: 78,
    attendance: 92,
    completedAssignments: 8,
    totalAssignments: 10,
    pendingAssignments: 2,
    testAverage: 85,
    lastTestScore: 88
  };

  // Mock courses data
  const mockCourses = [
    {
      name: "Computer Fundamentals",
      instructor: "Dr. Rajesh Kumar",
      progress: 95,
      completedModules: 19,
      totalModules: 20,
      duration: "3 months",
      nextClass: "Tomorrow",
      nextTopic: "Operating Systems Review",
      icon: "Monitor"
    },
    {
      name: "MS Office Suite",
      instructor: "Prof. Sunita Devi",
      progress: 78,
      completedModules: 14,
      totalModules: 18,
      duration: "2 months",
      nextClass: "Today",
      nextTopic: "Excel Advanced Functions",
      icon: "FileSpreadsheet"
    },
    {
      name: "Internet & Email",
      instructor: "Mr. Amit Singh",
      progress: 60,
      completedModules: 6,
      totalModules: 10,
      duration: "1 month",
      nextClass: "Friday",
      nextTopic: "Email Security",
      icon: "Globe"
    }
  ];

  // Mock assignments data
  const mockAssignments = [
    {
      title: "Excel Spreadsheet Project",
      subject: "MS Office Suite",
      dueDate: "2024-12-28",
      status: "pending",
      instructor: "Prof. Sunita Devi",
      attachments: 2
    },
    {
      title: "Computer Hardware Report",
      subject: "Computer Fundamentals",
      dueDate: "2024-12-30",
      status: "submitted",
      instructor: "Dr. Rajesh Kumar",
      attachments: 1
    },
    {
      title: "Email Etiquette Presentation",
      subject: "Internet & Email",
      dueDate: "2024-12-25",
      status: "overdue",
      instructor: "Mr. Amit Singh",
      attachments: 0
    }
  ];

  // Mock announcements data
  const mockAnnouncements = [
    {
      title: "Winter Break Schedule Update",
      content: "Classes will resume on January 2nd, 2025. All pending assignments should be submitted before December 31st. Online support will be available during the break.",
      author: "Administration",
      date: "2024-12-20T10:30:00Z",
      priority: "high",
      category: "Schedule",
      attachments: ["schedule.pdf"]
    },
    {
      title: "New Course Materials Available",
      content: "Advanced Excel tutorial videos and practice files have been uploaded to the course materials section. Please download and review before next class.",
      author: "Prof. Sunita Devi",
      date: "2024-12-19T14:15:00Z",
      priority: "medium",
      category: "Materials"
    },
    {
      title: "Upcoming Mock Test",
      content: "A comprehensive mock test covering all topics will be conducted next week. This will help you prepare for the final examination.",
      author: "Dr. Rajesh Kumar",
      date: "2024-12-18T09:00:00Z",
      priority: "medium",
      category: "Assessment"
    }
  ];

  // Mock quick actions data
  const mockQuickActions = [
    {
      title: "Take Practice Test",
      description: "Computer Fundamentals Quiz",
      icon: "ClipboardCheck",
      type: "test",
      badge: "New",
      status: "Available now"
    },
    {
      title: "Submit Assignment",
      description: "Excel Project Due Soon",
      icon: "Upload",
      type: "assignment",
      badge: "2",
      status: "Due in 3 days"
    },
    {
      title: "Download Materials",
      description: "Latest study resources",
      icon: "Download",
      type: "material",
      status: "5 new files"
    },
    {
      title: "View Schedule",
      description: "This week\'s classes",
      icon: "Calendar",
      type: "schedule",
      status: "3 classes this week"
    }
  ];

  // Mock schedule data
  const mockSchedule = [
    {
      subject: "MS Office Suite",
      instructor: "Prof. Sunita Devi",
      date: "2024-12-21",
      time: "10:00 AM - 12:00 PM",
      duration: "2 hours",
      location: "Computer Lab 1",
      status: "upcoming",
      topic: "Excel Advanced Functions and Formulas",
      materials: 3
    },
    {
      subject: "Computer Fundamentals",
      instructor: "Dr. Rajesh Kumar",
      date: "2024-12-22",
      time: "2:00 PM - 4:00 PM",
      duration: "2 hours",
      location: "Computer Lab 2",
      status: "upcoming",
      topic: "Operating Systems and File Management",
      materials: 2
    }
  ];

  // Mock activity data
  const mockActivities = [
    {
      type: "assignment_submitted",
      title: "Assignment Submitted",
      description: "Computer Hardware Report",
      subject: "Computer Fundamentals",
      timestamp: "2024-12-20T16:30:00Z",
      actionable: true
    },
    {
      type: "test_completed",
      title: "Test Completed",
      description: "MS Office Quiz",
      subject: "MS Office Suite",
      score: "88%",
      timestamp: "2024-12-20T11:45:00Z",
      actionable: true
    },
    {
      type: "grade_received",
      title: "Grade Received",
      description: "Internet Basics Test",
      subject: "Internet & Email",
      score: "92%",
      timestamp: "2024-12-19T15:20:00Z",
      actionable: true
    },
    {
      type: "material_downloaded",
      title: "Material Downloaded",
      description: "Excel Tutorial Videos",
      subject: "MS Office Suite",
      timestamp: "2024-12-19T09:15:00Z",
      actionable: false
    },
    {
      type: "class_attended",
      title: "Class Attended",
      description: "Computer Fundamentals",
      subject: "Computer Fundamentals",
      timestamp: "2024-12-18T14:00:00Z",
      actionable: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Use AuthContext logout method
    logout();
    
    // Navigate to homepage
    navigate('/homepage');
  };

  const handleQuickAction = (action) => {
    switch (action.type) {
      case 'test': navigate('/online-test-interface');
        break;
      case 'assignment':
        // Navigate to assignments page
        break;
      case 'material':
        // Navigate to materials page
        break;
      case 'schedule':
        // Navigate to schedule page
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Student Sidebar */}
      <StudentSidebar user={currentUser} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Welcome Section */}
          <WelcomeCard user={currentUser} currentTime={currentTime} />

          {/* Statistics Overview */}
          <StatsOverview stats={mockStats} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Course Progress Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Courses */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">Current Courses</h2>
                  <Button variant="ghost" size="sm" iconName="ArrowRight">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockCourses.slice(0, 2).map((course, index) => (
                    <ProgressCard key={index} course={course} />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockQuickActions.map((action, index) => (
                    <QuickActionCard 
                      key={index} 
                      action={action} 
                      onClick={() => handleQuickAction(action)}
                    />
                  ))}
                </div>
              </div>

              {/* Upcoming Schedule */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">Upcoming Classes</h2>
                  <Button variant="ghost" size="sm" iconName="Calendar">
                    Full Schedule
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockSchedule.map((schedule, index) => (
                    <ScheduleCard key={index} schedule={schedule} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Pending Assignments */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-text-primary">Assignments</h2>
                  <Button variant="ghost" size="sm" iconName="FileText">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {mockAssignments.map((assignment, index) => (
                    <AssignmentCard key={index} assignment={assignment} />
                  ))}
                </div>
              </div>

              {/* Recent Announcements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-text-primary">Announcements</h2>
                  <Button variant="ghost" size="sm" iconName="Bell">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {mockAnnouncements.slice(0, 2).map((announcement, index) => (
                    <AnnouncementCard key={index} announcement={announcement} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <ActivityFeed activities={mockActivities} />

          {/* Help Section */}
          <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={24} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">Need Help?</h3>
                <p className="text-text-secondary mb-4">
                  Our support team is here to help you with any questions about your courses, assignments, or technical issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="primary" size="sm" iconName="MessageCircle">
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm" iconName="BookOpen">
                    View Help Guide
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Phone">
                    Call: +91 98765 43210
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Optional) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 safe-area-inset">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1 text-primary">
            <Icon name="Home" size={20} />
            <span className="text-xs">Dashboard</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-text-secondary">
            <Icon name="BookOpen" size={20} />
            <span className="text-xs">Courses</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-text-secondary">
            <Icon name="FileText" size={20} />
            <span className="text-xs">Assignments</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-text-secondary">
            <Icon name="ClipboardCheck" size={20} />
            <span className="text-xs">Tests</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-text-secondary">
            <Icon name="User" size={20} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPortalDashboard;