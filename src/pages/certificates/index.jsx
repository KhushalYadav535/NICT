import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Mock certificates data
  const mockCertificates = [
    {
      id: 1,
      studentName: 'Rahul Kumar',
      studentId: 'NIICT2024001',
      courseName: 'Diploma in Computer Applications (DCA)',
      courseDuration: '12 months',
      completionDate: '2024-11-15',
      issueDate: '2024-11-20',
      certificateNumber: 'NIICT-DCA-2024-001',
      grade: 'A+',
      score: 92,
      status: 'issued',
      verificationCode: 'NIICT2024001DCA001',
      qrCode: 'https://niict.in/verify/NIICT2024001DCA001',
      blockchainHash: '0x1234567890abcdef...',
      instructor: 'Dr. Rajesh Kumar',
      director: 'Prof. Sunita Sharma',
      isDownloaded: true,
      isVerified: true,
      template: 'modern'
    },
    {
      id: 2,
      studentName: 'Priya Singh',
      studentId: 'NIICT2024002',
      courseName: 'Tally Prime with GST',
      courseDuration: '3 months',
      completionDate: '2024-10-20',
      issueDate: '2024-10-25',
      certificateNumber: 'NIICT-TALLY-2024-002',
      grade: 'A',
      score: 88,
      status: 'issued',
      verificationCode: 'NIICT2024002TALLY002',
      qrCode: 'https://niict.in/verify/NIICT2024002TALLY002',
      blockchainHash: '0xabcdef1234567890...',
      instructor: 'Ms. Priya Meena',
      director: 'Prof. Sunita Sharma',
      isDownloaded: false,
      isVerified: true,
      template: 'classic'
    },
    {
      id: 3,
      studentName: 'Amit Patel',
      studentId: 'NIICT2024003',
      courseName: 'Python Programming',
      courseDuration: '6 months',
      completionDate: '2024-09-30',
      issueDate: '2024-10-05',
      certificateNumber: 'NIICT-PYTHON-2024-003',
      grade: 'A+',
      score: 95,
      status: 'issued',
      verificationCode: 'NIICT2024003PYTHON003',
      qrCode: 'https://niict.in/verify/NIICT2024003PYTHON003',
      blockchainHash: '0x7890abcdef123456...',
      instructor: 'Mr. Vikash Jain',
      director: 'Prof. Sunita Sharma',
      isDownloaded: true,
      isVerified: true,
      template: 'modern'
    },
    {
      id: 4,
      studentName: 'Neha Sharma',
      studentId: 'NIICT2024004',
      courseName: 'Web Design & Development',
      courseDuration: '4 months',
      completionDate: '2024-12-01',
      issueDate: '2024-12-05',
      certificateNumber: 'NIICT-WEB-2024-004',
      grade: 'A',
      score: 87,
      status: 'pending',
      verificationCode: 'NIICT2024004WEB004',
      qrCode: 'https://niict.in/verify/NIICT2024004WEB004',
      blockchainHash: null,
      instructor: 'Mr. Amit Singh',
      director: 'Prof. Sunita Sharma',
      isDownloaded: false,
      isVerified: false,
      template: 'modern'
    }
  ];

  const certificateTemplates = [
    { id: 'modern', name: 'Modern Design', preview: '/certificate-modern.png' },
    { id: 'classic', name: 'Classic Design', preview: '/certificate-classic.png' },
    { id: 'minimal', name: 'Minimal Design', preview: '/certificate-minimal.png' },
    { id: 'premium', name: 'Premium Design', preview: '/certificate-premium.png' }
  ];

  useEffect(() => {
    setCertificates(mockCertificates);
  }, []);

  const handleGenerateCertificate = async (certificateId) => {
    setIsGenerating(true);
    
    try {
      // Simulate certificate generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setCertificates(prev => 
        prev.map(cert => 
          cert.id === certificateId 
            ? { ...cert, status: 'issued', issueDate: new Date().toISOString().split('T')[0] }
            : cert
        )
      );
      
      console.log('Certificate generated successfully');
      
    } catch (error) {
      console.error('Failed to generate certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCertificate = (certificate) => {
    console.log('Downloading certificate:', certificate.certificateNumber);
    // In real app, this would generate and download PDF
  };

  const handleVerifyCertificate = () => {
    if (!verificationCode) return;
    
    const certificate = certificates.find(cert => 
      cert.verificationCode === verificationCode || 
      cert.certificateNumber === verificationCode
    );
    
    if (certificate) {
      setSelectedCertificate(certificate);
    } else {
      alert('Certificate not found. Please check the verification code.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      issued: { bg: 'bg-success-100', text: 'text-success-700', label: 'Issued' },
      pending: { bg: 'bg-warning-100', text: 'text-warning-700', label: 'Pending' },
      processing: { bg: 'bg-primary-100', text: 'text-primary-700', label: 'Processing' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'text-success',
      'A': 'text-primary',
      'B+': 'text-warning',
      'B': 'text-secondary',
      'C': 'text-error'
    };
    return gradeColors[grade] || 'text-text-primary';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Certificate Management
              </h1>
              <p className="text-text-secondary">
                Generate, manage, and verify digital certificates
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Download" iconPosition="left">
                Bulk Download
              </Button>
              <Button variant="primary" iconName="Plus" iconPosition="left">
                Generate Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Certificate Verification */}
        <div className="bg-white rounded-xl p-6 border border-border mb-8">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Verify Certificate
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter certificate number or verification code..."
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <Button
              variant="primary"
              onClick={handleVerifyCertificate}
              iconName="Search"
              iconPosition="left"
            >
              Verify
            </Button>
          </div>
        </div>

        {/* Certificates List */}
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Certificate Icon */}
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Award" size={24} color="var(--color-primary)" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-text-primary">
                            {certificate.studentName}
                          </h3>
                          <p className="text-text-secondary">{certificate.courseName}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(certificate.status)}
                          <span className={`text-lg font-bold ${getGradeColor(certificate.grade)}`}>
                            {certificate.grade}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-text-secondary">Student ID</div>
                          <div className="font-medium">{certificate.studentId}</div>
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">Certificate No.</div>
                          <div className="font-medium">{certificate.certificateNumber}</div>
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">Completion Date</div>
                          <div className="font-medium">{formatDate(certificate.completionDate)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">Score</div>
                          <div className="font-medium">{certificate.score}%</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={14} />
                          <span>Instructor: {certificate.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>Issued: {formatDate(certificate.issueDate)}</span>
                        </div>
                        {certificate.isVerified && (
                          <div className="flex items-center space-x-1 text-success">
                            <Icon name="CheckCircle" size={14} />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {certificate.status === 'pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        loading={isGenerating}
                        onClick={() => handleGenerateCertificate(certificate.id)}
                        iconName="FileText"
                        iconPosition="left"
                      >
                        Generate
                      </Button>
                    )}
                    
                    {certificate.status === 'issued' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadCertificate(certificate)}
                        iconName="Download"
                        iconPosition="left"
                      >
                        Download
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCertificate(certificate)}
                      iconName="Eye"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Templates */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Certificate Templates
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificateTemplates.map((template) => (
              <div key={template.id} className="border border-border rounded-lg p-4 hover:border-primary transition-colors duration-200">
                <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Icon name="FileText" size={32} color="var(--color-text-secondary)" />
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-text-primary">{template.name}</h4>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Preview
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Details Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  Certificate Details
                </h2>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Certificate Preview */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border-2 border-primary">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Award" size={32} color="white" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      Certificate of Completion
                    </h3>
                    <p className="text-text-secondary mb-6">
                      This is to certify that
                    </p>
                    <h4 className="text-2xl font-bold text-primary mb-2">
                      {selectedCertificate.studentName}
                    </h4>
                    <p className="text-text-secondary mb-4">
                      has successfully completed the course
                    </p>
                    <h5 className="text-lg font-semibold text-text-primary mb-4">
                      {selectedCertificate.courseName}
                    </h5>
                    <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
                      <span>Grade: <span className={`font-bold ${getGradeColor(selectedCertificate.grade)}`}>{selectedCertificate.grade}</span></span>
                      <span>Score: <span className="font-bold">{selectedCertificate.score}%</span></span>
                    </div>
                    <div className="mt-6 text-xs text-text-secondary">
                      Certificate No: {selectedCertificate.certificateNumber}
                    </div>
                  </div>
                </div>

                {/* Certificate Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Certificate Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Student ID:</span>
                        <span className="font-medium">{selectedCertificate.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Course Duration:</span>
                        <span className="font-medium">{selectedCertificate.courseDuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Completion Date:</span>
                        <span className="font-medium">{formatDate(selectedCertificate.completionDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Issue Date:</span>
                        <span className="font-medium">{formatDate(selectedCertificate.issueDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Instructor:</span>
                        <span className="font-medium">{selectedCertificate.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Director:</span>
                        <span className="font-medium">{selectedCertificate.director}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Verification Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Verification Code:</span>
                        <span className="font-mono text-sm">{selectedCertificate.verificationCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">QR Code:</span>
                        <span className="font-mono text-sm">{selectedCertificate.qrCode}</span>
                      </div>
                      {selectedCertificate.blockchainHash && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Blockchain Hash:</span>
                          <span className="font-mono text-xs">{selectedCertificate.blockchainHash}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="primary"
                      onClick={() => handleDownloadCertificate(selectedCertificate)}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Certificate
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(selectedCertificate.qrCode, '_blank')}
                      iconName="ExternalLink"
                      iconPosition="left"
                    >
                      Verify Online
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Certificates; 