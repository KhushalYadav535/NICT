import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';

const CourseMaterials = () => {
  const [selectedCourse, setSelectedCourse] = useState('dca');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock course materials data
  const courseMaterials = {
    dca: {
      name: 'Diploma in Computer Applications (DCA)',
      materials: [
        {
          id: 1,
          title: 'Computer Fundamentals - Complete Guide',
          type: 'pdf',
          category: 'theory',
          size: '2.5 MB',
          uploadDate: '2024-12-15',
          downloads: 145,
          description: 'Comprehensive guide covering computer basics, hardware, software, and operating systems.',
          instructor: 'Dr. Rajesh Kumar',
          isDownloaded: true,
          progress: 100
        },
        {
          id: 2,
          title: 'MS Word Practice Exercises',
          type: 'docx',
          category: 'practical',
          size: '1.8 MB',
          uploadDate: '2024-12-16',
          downloads: 132,
          description: 'Hands-on exercises for MS Word including document formatting, tables, and mail merge.',
          instructor: 'Prof. Sunita Sharma',
          isDownloaded: false,
          progress: 0
        },
        {
          id: 3,
          title: 'Excel Formulas Cheat Sheet',
          type: 'pdf',
          category: 'reference',
          size: '0.8 MB',
          uploadDate: '2024-12-17',
          downloads: 98,
          description: 'Quick reference guide for commonly used Excel formulas and functions.',
          instructor: 'Prof. Sunita Sharma',
          isDownloaded: true,
          progress: 75
        },
        {
          id: 4,
          title: 'PowerPoint Presentation Templates',
          type: 'zip',
          category: 'templates',
          size: '15.2 MB',
          uploadDate: '2024-12-18',
          downloads: 67,
          description: 'Professional presentation templates for various business scenarios.',
          instructor: 'Mr. Amit Singh',
          isDownloaded: false,
          progress: 0
        },
        {
          id: 5,
          title: 'Internet & Email Tutorial Video',
          type: 'mp4',
          category: 'video',
          size: '45.7 MB',
          uploadDate: '2024-12-19',
          downloads: 89,
          description: 'Step-by-step video tutorial on internet browsing and email management.',
          instructor: 'Ms. Priya Meena',
          isDownloaded: true,
          progress: 60
        }
      ]
    },
    python: {
      name: 'Python Programming',
      materials: [
        {
          id: 6,
          title: 'Python Basics - Introduction',
          type: 'pdf',
          category: 'theory',
          size: '3.2 MB',
          uploadDate: '2024-12-10',
          downloads: 78,
          description: 'Introduction to Python programming language, syntax, and basic concepts.',
          instructor: 'Mr. Vikash Jain',
          isDownloaded: true,
          progress: 100
        },
        {
          id: 7,
          title: 'Python Code Examples',
          type: 'py',
          category: 'practical',
          size: '2.1 MB',
          uploadDate: '2024-12-11',
          downloads: 65,
          description: 'Collection of Python code examples and practice problems.',
          instructor: 'Mr. Vikash Jain',
          isDownloaded: false,
          progress: 0
        }
      ]
    }
  };

  const categories = [
    { id: 'all', name: 'All Materials', icon: 'Folder' },
    { id: 'theory', name: 'Theory', icon: 'BookOpen' },
    { id: 'practical', name: 'Practical', icon: 'Code' },
    { id: 'video', name: 'Videos', icon: 'Video' },
    { id: 'reference', name: 'Reference', icon: 'FileText' },
    { id: 'templates', name: 'Templates', icon: 'Layout' }
  ];

  const fileTypeIcons = {
    pdf: 'FileText',
    docx: 'FileText',
    xlsx: 'FileSpreadsheet',
    pptx: 'Presentation',
    mp4: 'Video',
    zip: 'Archive',
    py: 'Code',
    jpg: 'Image',
    png: 'Image'
  };

  const fileTypeColors = {
    pdf: 'text-red-500',
    docx: 'text-blue-500',
    xlsx: 'text-green-500',
    pptx: 'text-orange-500',
    mp4: 'text-purple-500',
    zip: 'text-gray-500',
    py: 'text-yellow-500',
    jpg: 'text-pink-500',
    png: 'text-pink-500'
  };

  const handleDownload = (material) => {
    // Simulate download
    console.log('Downloading:', material.title);
    // In real app, this would trigger actual download
  };

  const handleViewProgress = (material) => {
    console.log('Viewing progress for:', material.title);
  };

  const filteredMaterials = courseMaterials[selectedCourse]?.materials.filter(material => {
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Course Materials
              </h1>
              <p className="text-text-secondary">
                Access all your course materials, videos, and resources
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Download" iconPosition="left">
                Download All
              </Button>
              <Button variant="primary" iconName="Upload" iconPosition="left">
                Upload Material
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Select Course
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(courseMaterials).map(([courseId, course]) => (
              <button
                key={courseId}
                onClick={() => setSelectedCourse(courseId)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedCourse === courseId
                    ? 'border-primary bg-primary-50 text-primary'
                    : 'border-border hover:border-primary-200 hover:bg-primary-25'
                }`}
              >
                <div className="font-medium">{course.name}</div>
                <div className="text-sm opacity-75">
                  {course.materials.length} materials available
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-border hover:border-primary-200 hover:bg-primary-25'
                  }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="space-y-4">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Folder" size={32} color="var(--color-text-secondary)" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No materials found
              </h3>
              <p className="text-text-secondary">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredMaterials.map((material) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* File Icon */}
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 flex-shrink-0`}>
                        <Icon 
                          name={fileTypeIcons[material.type] || 'File'} 
                          size={24} 
                          className={fileTypeColors[material.type] || 'text-gray-500'} 
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-heading font-semibold text-text-primary truncate">
                            {material.title}
                          </h3>
                          <div className="flex items-center space-x-2 ml-4">
                            {material.isDownloaded && (
                              <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                                Downloaded
                              </span>
                            )}
                            <span className="text-sm text-text-secondary">
                              {material.size}
                            </span>
                          </div>
                        </div>

                        <p className="text-text-secondary mb-3 line-clamp-2">
                          {material.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Icon name="User" size={14} />
                            <span>{material.instructor}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>{formatDate(material.uploadDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Download" size={14} />
                            <span>{material.downloads} downloads</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {material.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-text-secondary">Progress</span>
                              <span className="text-primary font-medium">{material.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${material.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {material.progress > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewProgress(material)}
                          iconName="Eye"
                        >
                          View
                        </Button>
                      )}
                      
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleDownload(material)}
                        iconName="Download"
                        iconPosition="left"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {filteredMaterials.length}
                </div>
                <div className="text-sm text-text-secondary">Total Materials</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <Icon name="Download" size={24} color="var(--color-success)" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {filteredMaterials.filter(m => m.isDownloaded).length}
                </div>
                <div className="text-sm text-text-secondary">Downloaded</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Icon name="Play" size={24} color="var(--color-secondary)" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {filteredMaterials.filter(m => m.type === 'mp4').length}
                </div>
                <div className="text-sm text-text-secondary">Videos</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={24} color="var(--color-warning)" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {Math.round(filteredMaterials.reduce((sum, m) => sum + m.progress, 0) / filteredMaterials.length)}%
                </div>
                <div className="text-sm text-text-secondary">Avg Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMaterials; 