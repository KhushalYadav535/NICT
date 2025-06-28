import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('enrollments');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalStudents: 1250,
      activeStudents: 980,
      totalCourses: 8,
      totalRevenue: 2500000,
      monthlyGrowth: 12.5,
      completionRate: 78.5
    },
    enrollments: {
      monthly: [45, 52, 48, 61, 55, 67, 58, 72, 65, 78, 82, 89],
      byCourse: [
        { course: 'DCA', count: 320, growth: 15 },
        { course: 'Tally Prime', count: 180, growth: 8 },
        { course: 'Python Programming', count: 150, growth: 25 },
        { course: 'Web Design', count: 120, growth: 12 },
        { course: 'Digital Marketing', count: 95, growth: 18 },
        { course: 'CCC', count: 85, growth: 5 }
      ]
    },
    revenue: {
      monthly: [180000, 195000, 210000, 225000, 240000, 255000, 270000, 285000, 300000, 315000, 330000, 345000],
      bySource: [
        { source: 'Course Fees', amount: 1800000, percentage: 72 },
        { source: 'Certification', amount: 350000, percentage: 14 },
        { source: 'Placement', amount: 200000, percentage: 8 },
        { source: 'Other', amount: 150000, percentage: 6 }
      ]
    },
    performance: {
      attendance: 85.5,
      completionRate: 78.5,
      satisfactionScore: 4.6,
      placementRate: 82.3,
      averageScore: 76.8
    },
    demographics: {
      ageGroups: [
        { age: '18-25', count: 450, percentage: 36 },
        { age: '26-35', count: 380, percentage: 30.4 },
        { age: '36-45', count: 250, percentage: 20 },
        { age: '46+', count: 170, percentage: 13.6 }
      ],
      gender: [
        { gender: 'Male', count: 650, percentage: 52 },
        { gender: 'Female', count: 600, percentage: 48 }
      ],
      locations: [
        { location: 'Jaipur', count: 400, percentage: 32 },
        { location: 'Delhi', count: 280, percentage: 22.4 },
        { location: 'Mumbai', count: 200, percentage: 16 },
        { location: 'Bangalore', count: 150, percentage: 12 },
        { location: 'Others', count: 220, percentage: 17.6 }
      ]
    }
  };

  const periods = [
    { id: 'week', name: 'This Week', icon: 'Calendar' },
    { id: 'month', name: 'This Month', icon: 'Calendar' },
    { id: 'quarter', name: 'This Quarter', icon: 'Calendar' },
    { id: 'year', name: 'This Year', icon: 'Calendar' }
  ];

  const metrics = [
    { id: 'enrollments', name: 'Enrollments', icon: 'Users', color: 'text-primary' },
    { id: 'revenue', name: 'Revenue', icon: 'DollarSign', color: 'text-success' },
    { id: 'performance', name: 'Performance', icon: 'TrendingUp', color: 'text-warning' },
    { id: 'demographics', name: 'Demographics', icon: 'PieChart', color: 'text-secondary' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-IN').format(number);
  };

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 border border-border"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Total Students</p>
            <p className="text-2xl font-bold text-text-primary">{formatNumber(analyticsData.overview.totalStudents)}</p>
            <p className="text-sm text-success flex items-center mt-1">
              <Icon name="TrendingUp" size={14} className="mr-1" />
              +{analyticsData.overview.monthlyGrowth}% this month
            </p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={24} color="var(--color-primary)" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 border border-border"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Active Students</p>
            <p className="text-2xl font-bold text-text-primary">{formatNumber(analyticsData.overview.activeStudents)}</p>
            <p className="text-sm text-text-secondary mt-1">
              {Math.round((analyticsData.overview.activeStudents / analyticsData.overview.totalStudents) * 100)}% of total
            </p>
          </div>
          <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
            <Icon name="UserCheck" size={24} color="var(--color-success)" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 border border-border"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Total Revenue</p>
            <p className="text-2xl font-bold text-text-primary">{formatCurrency(analyticsData.overview.totalRevenue)}</p>
            <p className="text-sm text-success flex items-center mt-1">
              <Icon name="TrendingUp" size={14} className="mr-1" />
              +18.5% vs last year
            </p>
          </div>
          <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
            <Icon name="DollarSign" size={24} color="var(--color-warning)" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 border border-border"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Completion Rate</p>
            <p className="text-2xl font-bold text-text-primary">{analyticsData.overview.completionRate}%</p>
            <p className="text-sm text-text-secondary mt-1">
              {analyticsData.overview.totalCourses} active courses
            </p>
          </div>
          <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
            <Icon name="Award" size={24} color="var(--color-secondary)" />
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderEnrollmentChart = () => (
    <div className="bg-white rounded-xl p-6 border border-border mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Enrollment Trends</h3>
        <div className="flex items-center space-x-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                selectedPeriod === period.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mock Chart */}
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon name="BarChart3" size={48} color="var(--color-text-secondary)" />
          <p className="text-text-secondary mt-2">Interactive Chart Component</p>
          <p className="text-sm text-text-secondary">Monthly enrollment data visualization</p>
        </div>
      </div>

      {/* Course-wise Enrollments */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-text-primary mb-4">Enrollments by Course</h4>
        <div className="space-y-3">
          {analyticsData.enrollments.byCourse.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-medium">{course.course}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-secondary">{course.count} students</span>
                <span className="text-sm text-success">+{course.growth}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRevenueChart = () => (
    <div className="bg-white rounded-xl p-6 border border-border mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Revenue Analysis</h3>
        <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
          Export Report
        </Button>
      </div>

      {/* Mock Chart */}
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
        <div className="text-center">
          <Icon name="PieChart" size={48} color="var(--color-text-secondary)" />
          <p className="text-text-secondary mt-2">Revenue Distribution Chart</p>
        </div>
      </div>

      {/* Revenue Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analyticsData.revenue.bySource.map((source, index) => (
          <div key={index} className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{source.source}</span>
              <span className="text-lg font-bold text-primary">{formatCurrency(source.amount)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${source.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-text-secondary mt-1">
              <span>{source.percentage}% of total</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="bg-white rounded-xl p-6 border border-border mb-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="text-center p-4 bg-primary-50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{analyticsData.performance.attendance}%</div>
          <div className="text-sm text-text-secondary">Attendance Rate</div>
        </div>
        
        <div className="text-center p-4 bg-success-50 rounded-lg">
          <div className="text-2xl font-bold text-success">{analyticsData.performance.completionRate}%</div>
          <div className="text-sm text-text-secondary">Completion Rate</div>
        </div>
        
        <div className="text-center p-4 bg-warning-50 rounded-lg">
          <div className="text-2xl font-bold text-warning">{analyticsData.performance.satisfactionScore}/5</div>
          <div className="text-sm text-text-secondary">Satisfaction Score</div>
        </div>
        
        <div className="text-center p-4 bg-secondary-50 rounded-lg">
          <div className="text-2xl font-bold text-secondary">{analyticsData.performance.placementRate}%</div>
          <div className="text-sm text-text-secondary">Placement Rate</div>
        </div>
        
        <div className="text-center p-4 bg-info-50 rounded-lg">
          <div className="text-2xl font-bold text-info">{analyticsData.performance.averageScore}%</div>
          <div className="text-sm text-text-secondary">Average Score</div>
        </div>
      </div>
    </div>
  );

  const renderDemographics = () => (
    <div className="bg-white rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Student Demographics</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Age Groups */}
        <div>
          <h4 className="font-semibold text-text-primary mb-4">Age Distribution</h4>
          <div className="space-y-3">
            {analyticsData.demographics.ageGroups.map((age, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{age.age}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${age.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{age.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <h4 className="font-semibold text-text-primary mb-4">Gender Distribution</h4>
          <div className="space-y-3">
            {analyticsData.demographics.gender.map((gender, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{gender.gender}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: `${gender.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{gender.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-semibold text-text-primary mb-4">Top Locations</h4>
          <div className="space-y-3">
            {analyticsData.demographics.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{location.location}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-warning h-2 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{location.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Analytics Dashboard
              </h1>
              <p className="text-text-secondary">
                Comprehensive insights and performance metrics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Data
              </Button>
              <Button variant="primary" iconName="Settings" iconPosition="left">
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedMetric === metric.id
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-border hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <Icon name={metric.icon} size={16} />
              <span className="font-medium">{metric.name}</span>
            </button>
          ))}
        </div>

        {/* Overview Cards */}
        {renderOverviewCards()}

        {/* Selected Metric Content */}
        {selectedMetric === 'enrollments' && renderEnrollmentChart()}
        {selectedMetric === 'revenue' && renderRevenueChart()}
        {selectedMetric === 'performance' && renderPerformanceMetrics()}
        {selectedMetric === 'demographics' && renderDemographics()}
      </div>
    </div>
  );
};

export default Analytics; 