import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';

const LiveClasses = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedClass, setSelectedClass] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  // Mock live classes data
  const liveClasses = {
    upcoming: [
      {
        id: 1,
        title: 'MS Excel Advanced Functions',
        instructor: 'Prof. Sunita Sharma',
        course: 'DCA',
        date: '2024-12-21',
        time: '10:00 AM - 12:00 PM',
        duration: '2 hours',
        platform: 'Zoom',
        meetingId: '123456789',
        password: 'excel123',
        status: 'scheduled',
        attendees: 25,
        maxAttendees: 30,
        topic: 'Advanced Excel formulas and data analysis',
        materials: ['excel_advanced.pdf', 'practice_data.xlsx'],
        recording: null
      },
      {
        id: 2,
        title: 'Python Programming Basics',
        instructor: 'Mr. Vikash Jain',
        course: 'Python Programming',
        date: '2024-12-22',
        time: '2:00 PM - 4:00 PM',
        duration: '2 hours',
        platform: 'Google Meet',
        meetingId: 'meet.google.com/abc-defg-hij',
        password: 'python456',
        status: 'scheduled',
        attendees: 18,
        maxAttendees: 25,
        topic: 'Introduction to Python syntax and variables',
        materials: ['python_basics.pdf', 'code_examples.py'],
        recording: null
      },
      {
        id: 3,
        title: 'Tally GST Implementation',
        instructor: 'Ms. Priya Meena',
        course: 'Tally Prime with GST',
        date: '2024-12-23',
        time: '6:00 PM - 8:00 PM',
        duration: '2 hours',
        platform: 'Zoom',
        meetingId: '987654321',
        password: 'tally789',
        status: 'scheduled',
        attendees: 22,
        maxAttendees: 30,
        topic: 'GST setup and configuration in Tally',
        materials: ['gst_guide.pdf', 'tally_setup.pdf'],
        recording: null
      }
    ],
    ongoing: [
      {
        id: 4,
        title: 'Computer Fundamentals',
        instructor: 'Dr. Rajesh Kumar',
        course: 'DCA',
        date: '2024-12-20',
        time: '10:00 AM - 12:00 PM',
        duration: '2 hours',
        platform: 'Zoom',
        meetingId: '555666777',
        password: 'comp123',
        status: 'ongoing',
        attendees: 28,
        maxAttendees: 30,
        topic: 'Operating Systems and File Management',
        materials: ['os_basics.pdf'],
        recording: null,
        startTime: '10:00 AM',
        currentTopic: 'File System Navigation'
      }
    ],
    completed: [
      {
        id: 5,
        title: 'Web Design Fundamentals',
        instructor: 'Mr. Amit Singh',
        course: 'Web Design & Development',
        date: '2024-12-19',
        time: '2:00 PM - 4:00 PM',
        duration: '2 hours',
        platform: 'Google Meet',
        meetingId: 'meet.google.com/xyz-uvw-rst',
        password: 'web123',
        status: 'completed',
        attendees: 20,
        maxAttendees: 25,
        topic: 'HTML and CSS basics',
        materials: ['html_basics.pdf', 'css_styles.pdf'],
        recording: 'https://drive.google.com/file/d/recording1',
        attendance: 85,
        feedback: 4.8
      },
      {
        id: 6,
        title: 'Digital Marketing Strategies',
        instructor: 'Ms. Priya Meena',
        course: 'Digital Marketing',
        date: '2024-12-18',
        time: '6:00 PM - 8:00 PM',
        duration: '2 hours',
        platform: 'Zoom',
        meetingId: '111222333',
        password: 'dm123',
        status: 'completed',
        attendees: 15,
        maxAttendees: 20,
        topic: 'SEO and Social Media Marketing',
        materials: ['seo_guide.pdf', 'social_media.pdf'],
        recording: 'https://drive.google.com/file/d/recording2',
        attendance: 90,
        feedback: 4.9
      }
    ]
  };

  const handleJoinClass = async (classData) => {
    setIsJoining(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (classData.platform === 'Zoom') {
        window.open(`https://zoom.us/j/${classData.meetingId}?pwd=${classData.password}`, '_blank');
      } else if (classData.platform === 'Google Meet') {
        window.open(classData.meetingId, '_blank');
      }
      
      console.log('Joined class:', classData.title);
      
    } catch (error) {
      console.error('Failed to join class:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const handleViewRecording = (recordingUrl) => {
    window.open(recordingUrl, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: { bg: 'bg-primary-100', text: 'text-primary-700', label: 'Scheduled' },
      ongoing: { bg: 'bg-success-100', text: 'text-success-700', label: 'Live Now' },
      completed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Completed' }
    };

    const config = statusConfig[status] || statusConfig.scheduled;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const renderClassCard = (classData) => (
    <motion.div
      key={classData.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
    >
      {/* Class Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              {classData.title}
            </h3>
            <p className="text-sm text-text-secondary mb-3">
              {classData.topic}
            </p>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="User" size={14} />
                <span>{classData.instructor}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="BookOpen" size={14} />
                <span>{classData.course}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(classData.status)}
            <div className="text-sm text-text-secondary mt-1">
              {classData.attendees}/{classData.maxAttendees} students
            </div>
          </div>
        </div>

        {/* Class Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-text-secondary">Date</div>
            <div className="font-medium text-text-primary">{formatDate(classData.date)}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-text-secondary">Time</div>
            <div className="font-medium text-text-primary">{classData.time}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-text-secondary">Duration</div>
            <div className="font-medium text-text-primary">{classData.duration}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-text-secondary">Platform</div>
            <div className="font-medium text-text-primary">{classData.platform}</div>
          </div>
        </div>

        {/* Materials */}
        {classData.materials && classData.materials.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-text-primary mb-2">Course Materials:</div>
            <div className="flex flex-wrap gap-2">
              {classData.materials.map((material, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary text-xs rounded-full flex items-center space-x-1"
                >
                  <Icon name="FileText" size={12} />
                  <span>{material}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {classData.status === 'scheduled' && (
              <Button
                variant="primary"
                size="sm"
                loading={isJoining}
                onClick={() => handleJoinClass(classData)}
                iconName="Video"
                iconPosition="left"
              >
                Join Class
              </Button>
            )}
            
            {classData.status === 'ongoing' && (
              <Button
                variant="success"
                size="sm"
                loading={isJoining}
                onClick={() => handleJoinClass(classData)}
                iconName="Play"
                iconPosition="left"
              >
                Join Live
              </Button>
            )}
            
            {classData.status === 'completed' && classData.recording && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewRecording(classData.recording)}
                iconName="Play"
                iconPosition="left"
              >
                Watch Recording
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {classData.status === 'completed' && (
              <div className="text-right">
                <div className="text-sm text-text-secondary">Attendance</div>
                <div className="font-medium text-text-primary">{classData.attendance}%</div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedClass(classData)}
              iconName="Info"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Live Classes
              </h1>
              <p className="text-text-secondary">
                Join interactive online classes with expert instructors
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule
              </Button>
              <Button
                variant="primary"
                iconName="Plus"
                iconPosition="left"
              >
                Create Class
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center mb-8 bg-white rounded-xl p-2 shadow-md border border-border max-w-2xl mx-auto">
          {[
            { id: 'upcoming', label: 'Upcoming', icon: 'Calendar', count: liveClasses.upcoming.length },
            { id: 'ongoing', label: 'Live Now', icon: 'Video', count: liveClasses.ongoing.length },
            { id: 'completed', label: 'Completed', icon: 'CheckCircle', count: liveClasses.completed.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 min-touch-target flex-1 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              <Icon name={tab.icon} size={20} />
              <span className="font-medium">{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="space-y-6">
          {liveClasses[activeTab].length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calendar" size={32} color="var(--color-text-secondary)" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No {activeTab} classes
              </h3>
              <p className="text-text-secondary">
                {activeTab === 'upcoming' && 'No upcoming classes scheduled'}
                {activeTab === 'ongoing' && 'No classes are currently live'}
                {activeTab === 'completed' && 'No completed classes yet'}
              </p>
            </div>
          ) : (
            liveClasses[activeTab].map(renderClassCard)
          )}
        </div>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  Class Details
                </h2>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {selectedClass.title}
                  </h3>
                  <p className="text-text-secondary">{selectedClass.topic}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-text-secondary">Instructor</div>
                    <div className="font-medium">{selectedClass.instructor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Course</div>
                    <div className="font-medium">{selectedClass.course}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Date & Time</div>
                    <div className="font-medium">{formatDate(selectedClass.date)}</div>
                    <div className="text-sm text-text-secondary">{selectedClass.time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Platform</div>
                    <div className="font-medium">{selectedClass.platform}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-text-secondary mb-2">Meeting Details</div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Meeting ID:</span>
                      <span className="font-mono text-sm">{selectedClass.meetingId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Password:</span>
                      <span className="font-mono text-sm">{selectedClass.password}</span>
                    </div>
                  </div>
                </div>

                {selectedClass.materials && selectedClass.materials.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-text-primary mb-3">Course Materials</div>
                    <div className="space-y-2">
                      {selectedClass.materials.map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Icon name="FileText" size={16} color="var(--color-primary)" />
                            <span className="text-sm">{material}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Download"
                          >
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedClass.status === 'completed' && (
                  <div>
                    <div className="text-sm font-medium text-text-primary mb-3">Class Statistics</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-success-50 rounded-lg">
                        <div className="text-sm text-success-700">Attendance</div>
                        <div className="text-lg font-bold text-success-800">{selectedClass.attendance}%</div>
                      </div>
                      <div className="text-center p-3 bg-primary-50 rounded-lg">
                        <div className="text-sm text-primary-700">Feedback</div>
                        <div className="text-lg font-bold text-primary-800">{selectedClass.feedback}/5</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LiveClasses; 