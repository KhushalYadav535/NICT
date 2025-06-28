import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentProfileModal = ({ student, isOpen, onClose, onUpdateStatus, onEditProfile }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !student) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'academic', label: 'Academic', icon: 'BookOpen' },
    { id: 'fees', label: 'Fees', icon: 'CreditCard' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'activity', label: 'Activity', icon: 'Activity' }
  ];

  const mockDocuments = [
    { id: 1, name: 'Admission Form', type: 'PDF', uploadDate: '2024-01-15', status: 'Verified' },
    { id: 2, name: 'ID Proof', type: 'Image', uploadDate: '2024-01-15', status: 'Verified' },
    { id: 3, name: 'Address Proof', type: 'PDF', uploadDate: '2024-01-15', status: 'Pending' },
    { id: 4, name: 'Educational Certificate', type: 'PDF', uploadDate: '2024-01-16', status: 'Verified' }
  ];

  const mockTestScores = [
    { subject: 'Computer Fundamentals', score: 85, maxScore: 100, date: '2024-01-20' },
    { subject: 'MS Office', score: 92, maxScore: 100, date: '2024-01-25' },
    { subject: 'Internet & Email', score: 78, maxScore: 100, date: '2024-01-30' },
    { subject: 'Tally Basics', score: 88, maxScore: 100, date: '2024-02-05' }
  ];

  const mockFeeHistory = [
    { id: 1, description: 'Admission Fee', amount: 2000, date: '2024-01-15', status: 'Paid', method: 'UPI' },
    { id: 2, description: 'Course Fee - Month 1', amount: 3000, date: '2024-01-15', status: 'Paid', method: 'Cash' },
    { id: 3, description: 'Course Fee - Month 2', amount: 3000, date: '2024-02-15', status: 'Paid', method: 'Bank Transfer' },
    { id: 4, description: 'Course Fee - Month 3', amount: 3000, date: '2024-03-15', status: 'Due', method: '-' }
  ];

  const mockActivityLog = [
    { id: 1, action: 'Logged in to student portal', timestamp: '2024-03-10 09:30 AM', type: 'login' },
    { id: 2, action: 'Completed assignment: MS Word Basics', timestamp: '2024-03-09 02:15 PM', type: 'assignment' },
    { id: 3, action: 'Attended online test: Computer Fundamentals', timestamp: '2024-03-08 11:00 AM', type: 'test' },
    { id: 4, action: 'Downloaded study material: Excel Tutorial', timestamp: '2024-03-07 04:20 PM', type: 'download' },
    { id: 5, action: 'Fee payment received', timestamp: '2024-03-05 10:45 AM', type: 'payment' }
  ];

  return (
    <div 
      className="fixed inset-0 z-200 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative w-full max-w-4xl bg-surface rounded-xl shadow-modal animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-surface border-b border-border rounded-t-xl">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                    {student.avatar ? (
                      <Image src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <Icon name="User" size={32} color="var(--color-primary)" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-text-primary">
                      {student.name}
                    </h2>
                    <p className="text-text-secondary">{student.email}</p>
                    <p className="text-sm text-text-secondary">Student ID: {student.studentId}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onEditProfile(student)}
                  >
                    Edit Profile
                  </Button>
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-10 h-10 text-text-secondary hover:text-error hover:bg-error-50 rounded-lg transition-colors duration-200"
                    aria-label="Close modal"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-primary hover:border-gray-300'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Full Name</label>
                          <p className="text-text-primary">{student.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Email</label>
                          <p className="text-text-primary">{student.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Phone</label>
                          <p className="text-text-primary">{student.phone || '+91 98765 43210'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Date of Birth</label>
                          <p className="text-text-primary">{student.dateOfBirth || '15/08/1998'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Address</label>
                          <p className="text-text-primary">{student.address || 'Village Rampur, Tehsil Sadar, District Meerut, UP - 250001'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Course Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Course</label>
                          <p className="text-text-primary">{student.course}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Duration</label>
                          <p className="text-text-primary">{student.duration}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Admission Date</label>
                          <p className="text-text-primary">{formatDate(student.admissionDate)}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Status</label>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              student.status === 'Approved' ? 'bg-success-100 text-success-700' :
                              student.status === 'Pending'? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'
                            }`}>
                              {student.status}
                            </span>
                            <select
                              value={student.status}
                              onChange={(e) => onUpdateStatus(student.id, e.target.value)}
                              className="text-xs border border-border rounded px-2 py-1"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Progress</label>
                          <div className="mt-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Course Completion</span>
                              <span>{student.progress || 65}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${student.progress || 65}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Tab */}
              {activeTab === 'academic' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Test Scores</h3>
                    <div className="space-y-3">
                      {mockTestScores.map((test, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-text-primary">{test.subject}</p>
                            <p className="text-sm text-text-secondary">{formatDate(test.date)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-text-primary">
                              {test.score}/{test.maxScore}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {Math.round((test.score / test.maxScore) * 100)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Attendance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-success-50 p-4 rounded-lg">
                        <p className="text-success-700 font-semibold">Present Days</p>
                        <p className="text-2xl font-bold text-success-800">45</p>
                      </div>
                      <div className="bg-warning-50 p-4 rounded-lg">
                        <p className="text-warning-700 font-semibold">Absent Days</p>
                        <p className="text-2xl font-bold text-warning-800">5</p>
                      </div>
                      <div className="bg-primary-50 p-4 rounded-lg">
                        <p className="text-primary-700 font-semibold">Attendance %</p>
                        <p className="text-2xl font-bold text-primary-800">90%</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Fees Tab */}
              {activeTab === 'fees' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-success-50 p-4 rounded-lg">
                      <p className="text-success-700 font-semibold">Total Paid</p>
                      <p className="text-2xl font-bold text-success-800">{formatCurrency(student.feesPaid)}</p>
                    </div>
                    <div className="bg-warning-50 p-4 rounded-lg">
                      <p className="text-warning-700 font-semibold">Remaining</p>
                      <p className="text-2xl font-bold text-warning-800">
                        {formatCurrency(student.totalFees - student.feesPaid)}
                      </p>
                    </div>
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <p className="text-primary-700 font-semibold">Total Fees</p>
                      <p className="text-2xl font-bold text-primary-800">{formatCurrency(student.totalFees)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Payment History</h3>
                    <div className="space-y-3">
                      {mockFeeHistory.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-text-primary">{payment.description}</p>
                            <p className="text-sm text-text-secondary">
                              {formatDate(payment.date)} • {payment.method}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-text-primary">
                              {formatCurrency(payment.amount)}
                            </p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === 'Paid' ? 'bg-success-100 text-success-700' : 'bg-error-100 text-error-700'
                            }`}>
                              {payment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Uploaded Documents</h3>
                    <div className="space-y-3">
                      {mockDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon name="FileText" size={20} className="text-text-muted" />
                            <div>
                              <p className="font-medium text-text-primary">{doc.name}</p>
                              <p className="text-sm text-text-secondary">
                                {doc.type} • Uploaded on {formatDate(doc.uploadDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              doc.status === 'Verified' ? 'bg-success-100 text-success-700' :
                              'bg-warning-100 text-warning-700'
                            }`}>
                              {doc.status}
                            </span>
                            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-150">
                              <Icon name="Download" size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {mockActivityLog.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === 'login' ? 'bg-primary-100' :
                            activity.type === 'assignment' ? 'bg-success-100' :
                            activity.type === 'test' ? 'bg-warning-100' :
                            activity.type === 'download'? 'bg-secondary-100' : 'bg-accent-100'
                          }`}>
                            <Icon 
                              name={
                                activity.type === 'login' ? 'LogIn' :
                                activity.type === 'assignment' ? 'FileCheck' :
                                activity.type === 'test' ? 'ClipboardCheck' :
                                activity.type === 'download'? 'Download' : 'CreditCard'
                              } 
                              size={16} 
                              className={
                                activity.type === 'login' ? 'text-primary' :
                                activity.type === 'assignment' ? 'text-success' :
                                activity.type === 'test' ? 'text-warning' :
                                activity.type === 'download'? 'text-secondary' : 'text-accent'
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-text-primary">{activity.action}</p>
                            <p className="text-sm text-text-secondary">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;