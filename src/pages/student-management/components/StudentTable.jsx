import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentTable = ({ 
  students, 
  selectedStudents, 
  onSelectStudent, 
  onSelectAll, 
  onViewProfile, 
  onEditProfile, 
  onViewProgress, 
  onManageFees, 
  onGenerateCertificate,
  onUpdateStatus 
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { bg: 'bg-warning-100', text: 'text-warning-700', icon: 'Clock' },
      'Approved': { bg: 'bg-success-100', text: 'text-success-700', icon: 'CheckCircle' },
      'Rejected': { bg: 'bg-error-100', text: 'text-error-700', icon: 'XCircle' },
      'Active': { bg: 'bg-primary-100', text: 'text-primary-700', icon: 'User' },
      'Inactive': { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'UserX' }
    };

    const config = statusConfig[status] || statusConfig['Pending'];

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon name={config.icon} size={12} className="mr-1" />
        {status}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      'Paid': { bg: 'bg-success-100', text: 'text-success-700' },
      'Partial': { bg: 'bg-warning-100', text: 'text-warning-700' },
      'Due': { bg: 'bg-error-100', text: 'text-error-700' },
      'Overdue': { bg: 'bg-error-200', text: 'text-error-800' }
    };

    const config = statusConfig[status] || statusConfig['Due'];

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status}
      </span>
    );
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

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedStudents.length === students.length && students.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Student</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('course')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Course</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('admissionDate')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Admission Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Fees
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => onSelectStudent(student.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                      {student.avatar ? (
                        <Image src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      ) : (
                        <Icon name="User" size={20} color="var(--color-primary)" />
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => onViewProfile(student)}
                        className="text-sm font-medium text-primary hover:text-primary-700 transition-colors duration-150"
                      >
                        {student.name}
                      </button>
                      <p className="text-xs text-text-secondary">{student.email}</p>
                      <p className="text-xs text-text-secondary">ID: {student.studentId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary font-medium">{student.course}</div>
                  <div className="text-xs text-text-secondary">{student.duration}</div>
                </td>
                <td className="px-6 py-4 text-sm text-text-primary">
                  {formatDate(student.admissionDate)}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {getStatusBadge(student.status)}
                    {getPaymentStatusBadge(student.paymentStatus)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary font-medium">
                    {formatCurrency(student.feesPaid)} / {formatCurrency(student.totalFees)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(student.feesPaid / student.totalFees) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {formatDate(student.lastActivity)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEditProfile(student)}
                      className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-150"
                      title="Edit Profile"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => onViewProgress(student)}
                      className="p-2 text-text-secondary hover:text-secondary hover:bg-secondary-50 rounded-lg transition-colors duration-150"
                      title="View Progress"
                    >
                      <Icon name="TrendingUp" size={16} />
                    </button>
                    <button
                      onClick={() => onManageFees(student)}
                      className="p-2 text-text-secondary hover:text-warning hover:bg-warning-50 rounded-lg transition-colors duration-150"
                      title="Manage Fees"
                    >
                      <Icon name="CreditCard" size={16} />
                    </button>
                    <button
                      onClick={() => onGenerateCertificate(student)}
                      className="p-2 text-text-secondary hover:text-success hover:bg-success-50 rounded-lg transition-colors duration-150"
                      title="Generate Certificate"
                    >
                      <Icon name="Award" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {students.map((student) => (
          <div key={student.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => onSelectStudent(student.id)}
                  className="rounded border-border text-primary focus:ring-primary mt-1"
                />
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                  {student.avatar ? (
                    <Image src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="User" size={24} color="var(--color-primary)" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => onViewProfile(student)}
                    className="text-base font-medium text-primary hover:text-primary-700 transition-colors duration-150 truncate block"
                  >
                    {student.name}
                  </button>
                  <p className="text-sm text-text-secondary truncate">{student.email}</p>
                  <p className="text-xs text-text-secondary">ID: {student.studentId}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">Course</p>
                <p className="text-sm font-medium text-text-primary">{student.course}</p>
                <p className="text-xs text-text-secondary">{student.duration}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Admission Date</p>
                <p className="text-sm text-text-primary">{formatDate(student.admissionDate)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2">
                {getStatusBadge(student.status)}
                {getPaymentStatusBadge(student.paymentStatus)}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  {formatCurrency(student.feesPaid)} / {formatCurrency(student.totalFees)}
                </p>
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(student.feesPaid / student.totalFees) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-text-secondary">
                Last activity: {formatDate(student.lastActivity)}
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEditProfile(student)}
                  className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-150"
                  title="Edit Profile"
                >
                  <Icon name="Edit" size={16} />
                </button>
                <button
                  onClick={() => onViewProgress(student)}
                  className="p-2 text-text-secondary hover:text-secondary hover:bg-secondary-50 rounded-lg transition-colors duration-150"
                  title="View Progress"
                >
                  <Icon name="TrendingUp" size={16} />
                </button>
                <button
                  onClick={() => onManageFees(student)}
                  className="p-2 text-text-secondary hover:text-warning hover:bg-warning-50 rounded-lg transition-colors duration-150"
                  title="Manage Fees"
                >
                  <Icon name="CreditCard" size={16} />
                </button>
                <button
                  onClick={() => onGenerateCertificate(student)}
                  className="p-2 text-text-secondary hover:text-success hover:bg-success-50 rounded-lg transition-colors duration-150"
                  title="Generate Certificate"
                >
                  <Icon name="Award" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No students found</h3>
          <p className="text-text-secondary mb-4">Try adjusting your search or filter criteria</p>
          <Button variant="primary" iconName="UserPlus">
            Add New Student
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentTable;