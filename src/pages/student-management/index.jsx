import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/ui/AdminSidebar';

import Button from '../../components/ui/Button';
import StatsCards from './components/StatsCards';
import SearchAndFilters from './components/SearchAndFilters';
import BulkActions from './components/BulkActions';
import StudentTable from './components/StudentTable';
import StudentProfileModal from './components/StudentProfileModal';

const StudentManagement = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    course: '',
    status: '',
    paymentStatus: '',
    startDate: '',
    endDate: ''
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use user from AuthContext or fallback to mock data
  const adminUser = user || {
    name: "Dr. Rajesh Kumar",
    role: "System Administrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock students data
  const [students, setStudents] = useState([
    {
      id: 1,
      studentId: "NIICT001",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      course: "DCA",
      duration: "6 Months",
      admissionDate: "2024-01-15",
      status: "Active",
      paymentStatus: "Paid",
      feesPaid: 8000,
      totalFees: 12000,
      lastActivity: "2024-03-10",
      progress: 75,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      studentId: "NIICT002",
      name: "Rahul Verma",
      email: "rahul.verma@email.com",
      phone: "+91 87654 32109",
      course: "Tally with GST",
      duration: "3 Months",
      admissionDate: "2024-02-01",
      status: "Active",
      paymentStatus: "Partial",
      feesPaid: 4000,
      totalFees: 8000,
      lastActivity: "2024-03-09",
      progress: 60,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      studentId: "NIICT003",
      name: "Anjali Singh",
      email: "anjali.singh@email.com",
      phone: "+91 76543 21098",
      course: "CCC",
      duration: "2 Months",
      admissionDate: "2024-02-15",
      status: "Pending",
      paymentStatus: "Due",
      feesPaid: 0,
      totalFees: 5000,
      lastActivity: "2024-03-08",
      progress: 0,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      studentId: "NIICT004",
      name: "Vikash Kumar",
      email: "vikash.kumar@email.com",
      phone: "+91 65432 10987",
      course: "Python Programming",
      duration: "4 Months",
      admissionDate: "2024-01-20",
      status: "Active",
      paymentStatus: "Paid",
      feesPaid: 15000,
      totalFees: 15000,
      lastActivity: "2024-03-10",
      progress: 85,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      studentId: "NIICT005",
      name: "Sunita Devi",
      email: "sunita.devi@email.com",
      phone: "+91 54321 09876",
      course: "MS Office Suite",
      duration: "2 Months",
      admissionDate: "2024-03-01",
      status: "Active",
      paymentStatus: "Partial",
      feesPaid: 2500,
      totalFees: 6000,
      lastActivity: "2024-03-09",
      progress: 30,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      studentId: "NIICT006",
      name: "Amit Gupta",
      email: "amit.gupta@email.com",
      phone: "+91 43210 98765",
      course: "Web Design",
      duration: "5 Months",
      admissionDate: "2024-01-10",
      status: "Inactive",
      paymentStatus: "Overdue",
      feesPaid: 8000,
      totalFees: 18000,
      lastActivity: "2024-02-28",
      progress: 45,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  // Mock statistics
  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'Active').length,
    pendingAdmissions: students.filter(s => s.status === 'Pending').length,
    monthlyRevenue: students.reduce((sum, s) => sum + s.feesPaid, 0)
  };

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse = filters.course === '' || student.course === filters.course;
    const matchesStatus = filters.status === '' || student.status === filters.status;
    const matchesPaymentStatus = filters.paymentStatus === '' || student.paymentStatus === filters.paymentStatus;

    let matchesDateRange = true;
    if (filters.startDate && filters.endDate) {
      const admissionDate = new Date(student.admissionDate);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      matchesDateRange = admissionDate >= startDate && admissionDate <= endDate;
    }

    return matchesSearch && matchesCourse && matchesStatus && matchesPaymentStatus && matchesDateRange;
  });

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleDeselectAll = () => {
    setSelectedStudents([]);
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleEditProfile = (student) => {
    console.log('Edit profile for:', student.name);
    // Navigate to edit form or open edit modal
  };

  const handleViewProgress = (student) => {
    console.log('View progress for:', student.name);
    // Navigate to progress page
  };

  const handleManageFees = (student) => {
    console.log('Manage fees for:', student.name);
    // Navigate to fee management
  };

  const handleGenerateCertificate = (student) => {
    console.log('Generate certificate for:', student.name);
    // Generate and download certificate
  };

  const handleUpdateStatus = (studentId, newStatus) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: newStatus }
          : student
      )
    );
  };

  const handleBulkApprove = async () => {
    console.log('Approving students:', selectedStudents);
    setStudents(prev => 
      prev.map(student => 
        selectedStudents.includes(student.id)
          ? { ...student, status: 'Approved' }
          : student
      )
    );
    setSelectedStudents([]);
  };

  const handleBulkReject = async () => {
    console.log('Rejecting students:', selectedStudents);
    setStudents(prev => 
      prev.map(student => 
        selectedStudents.includes(student.id)
          ? { ...student, status: 'Rejected' }
          : student
      )
    );
    setSelectedStudents([]);
  };

  const handleSendNotification = async () => {
    console.log('Sending notification to students:', selectedStudents);
    // Send notification logic
    setSelectedStudents([]);
  };

  const handleGenerateReport = async () => {
    console.log('Generating report for students:', selectedStudents);
    // Generate report logic
  };

  const handleExportSelected = async () => {
    console.log('Exporting data for students:', selectedStudents);
    // Export logic
  };

  const handleExport = () => {
    console.log('Exporting all filtered data');
    // Export all filtered data
  };

  const handleClearFilters = () => {
    setFilters({
      course: '',
      status: '',
      paymentStatus: '',
      startDate: '',
      endDate: ''
    });
    setSearchQuery('');
  };

  const handleLogout = () => {
    console.log('Admin logout');
    logout();
  };

  const handleAddNewStudent = () => {
    navigate('/student-admission-form');
  };

  const handleImportCSV = () => {
    console.log('Import students from CSV');
    // CSV import logic
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar user={adminUser} onLogout={handleLogout} />
      
      <div className="lg:ml-72">
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                Student Management
              </h1>
              <p className="text-text-secondary">
                Manage student records, admissions, and academic progress
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Upload"
                onClick={handleImportCSV}
              >
                Import CSV
              </Button>
              <Button
                variant="primary"
                iconName="UserPlus"
                onClick={handleAddNewStudent}
              >
                Add New Student
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <StatsCards stats={stats} />

          {/* Search and Filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
            onExport={handleExport}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedStudents={selectedStudents}
            onApproveSelected={handleBulkApprove}
            onRejectSelected={handleBulkReject}
            onSendNotification={handleSendNotification}
            onGenerateReport={handleGenerateReport}
            onExportSelected={handleExportSelected}
            onDeselectAll={handleDeselectAll}
          />

          {/* Students Table */}
          <StudentTable
            students={filteredStudents}
            selectedStudents={selectedStudents}
            onSelectStudent={handleSelectStudent}
            onSelectAll={handleSelectAll}
            onViewProfile={handleViewProfile}
            onEditProfile={handleEditProfile}
            onViewProgress={handleViewProgress}
            onManageFees={handleManageFees}
            onGenerateCertificate={handleGenerateCertificate}
            onUpdateStatus={handleUpdateStatus}
          />

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-text-secondary">
                Showing {filteredStudents.length} of {students.length} students
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="ChevronLeft">
                  Previous
                </Button>
                <Button variant="outline" size="sm" iconName="ChevronRight">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Student Profile Modal */}
      <StudentProfileModal
        student={selectedStudent}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedStudent(null);
        }}
        onUpdateStatus={handleUpdateStatus}
        onEditProfile={handleEditProfile}
      />
    </div>
  );
};

export default StudentManagement;