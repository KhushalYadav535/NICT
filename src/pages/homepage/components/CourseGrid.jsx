import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CourseGrid = ({ onViewSyllabus }) => {
  const courses = [
    {
      id: 'dca',
      title: 'Diploma in Computer Applications (DCA)',
      duration: '12 Months',
      fees: '₹15,000',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive computer course covering MS Office, Internet, and basic programming concepts.',
      modules: ['MS Office Suite', 'Internet & Email', 'Basic Programming', 'Computer Fundamentals'],
      icon: 'Monitor',
      popular: true,
      certification: 'Government Certified'
    },
    {
      id: 'tally',
      title: 'Tally Prime with GST',
      duration: '3 Months',
      fees: '₹8,000',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Master accounting software with GST compliance and financial management.',
      modules: ['Tally Basics', 'GST Implementation', 'Inventory Management', 'Financial Reports'],
      icon: 'Calculator',
      popular: false,
      certification: 'Industry Recognized'
    },
    {
      id: 'ccc',
      title: 'Course on Computer Concepts (CCC)',
      duration: '2 Months',
      fees: '₹5,000',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Government certified course for basic computer literacy and digital skills.',
      modules: ['Computer Basics', 'Operating System', 'MS Office', 'Internet Usage'],
      icon: 'BookOpen',
      popular: false,
      certification: 'NIELIT Certified'
    },
    {
      id: 'python',
      title: 'Python Programming',
      duration: '6 Months',
      fees: '₹20,000',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Learn modern programming with Python for web development and data analysis.',
      modules: ['Python Basics', 'Web Development', 'Data Analysis', 'Project Work'],
      icon: 'Code',
      popular: true,
      certification: 'Industry Certified'
    },
    {
      id: 'web-design',
      title: 'Web Design & Development',
      duration: '4 Months',
      fees: '₹12,000',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Create modern websites using HTML, CSS, JavaScript and responsive design.',
      modules: ['HTML & CSS', 'JavaScript', 'Responsive Design', 'Portfolio Projects'],
      icon: 'Globe',
      popular: false,
      certification: 'Industry Recognized'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      duration: '3 Months',
      fees: '₹10,000',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Master online marketing strategies including SEO, social media, and Google Ads.',
      modules: ['SEO Basics', 'Social Media Marketing', 'Google Ads', 'Analytics'],
      icon: 'TrendingUp',
      popular: false,
      certification: 'Google Certified'
    }
  ];

  const handleViewSyllabus = (course) => {
    if (onViewSyllabus) {
      onViewSyllabus(course);
    }
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Our Popular Courses
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Choose from our comprehensive range of computer courses designed to meet industry demands and boost your career prospects.
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-border"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Popular Badge */}
                {course.popular && (
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}

                {/* Course Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Icon name={course.icon} size={24} color="var(--color-primary)" />
                </div>

                {/* Duration & Fees */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="text-white">
                    <div className="text-sm opacity-90">Duration</div>
                    <div className="font-semibold">{course.duration}</div>
                  </div>
                  <div className="text-white text-right">
                    <div className="text-sm opacity-90">Fees</div>
                    <div className="font-semibold text-lg">{course.fees}</div>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-heading font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                    {course.title}
                  </h3>
                </div>

                <p className="text-text-secondary mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Modules Preview */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-text-primary mb-2">Key Modules:</div>
                  <div className="flex flex-wrap gap-2">
                    {course.modules.slice(0, 2).map((module, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-md"
                      >
                        {module}
                      </span>
                    ))}
                    {course.modules.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-md">
                        +{course.modules.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Certification */}
                <div className="flex items-center mb-4 text-sm text-success">
                  <Icon name="Award" size={16} className="mr-2" />
                  {course.certification}
                </div>

                {/* Action Button */}
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => handleViewSyllabus(course)}
                  className="group-hover:bg-primary-700 transition-colors duration-200"
                >
                  View Syllabus
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => window.location.href = '/course-details-modal'}
          >
            Explore All Courses
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseGrid;