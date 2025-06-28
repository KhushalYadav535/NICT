import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    summary: ''
  });

  const handleInputChange = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Advanced Resume Builder</h1>
          <div className="space-y-6">
            <Input
              label="Full Name"
              value={resumeData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={resumeData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <Input
              label="Phone"
              value={resumeData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium mb-2">Professional Summary</label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={4}
              />
            </div>
            <Button variant="primary" className="w-full">Download PDF</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
