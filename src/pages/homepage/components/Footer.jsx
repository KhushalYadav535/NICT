import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Courses', href: '/course-details-modal' },
    { label: 'Admissions', href: '/student-admission-form' },
    { label: 'Student Portal', href: '/student-portal-dashboard' },
    { label: 'Online Tests', href: '/online-test-interface' },
    { label: 'Gallery', href: '#gallery' }
  ];

  const courses = [
    { label: 'DCA Course', href: '/course-details-modal' },
    { label: 'Tally Prime', href: '/course-details-modal' },
    { label: 'CCC Course', href: '/course-details-modal' },
    { label: 'Python Programming', href: '/course-details-modal' },
    { label: 'Web Development', href: '/course-details-modal' },
    { label: 'Digital Marketing', href: '/course-details-modal' }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      href: 'https://facebook.com/niict.edu',
      color: 'hover:text-blue-600'
    },
    {
      name: 'YouTube',
      icon: 'Youtube',
      href: 'https://youtube.com/@niict-education',
      color: 'hover:text-red-600'
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      href: 'https://wa.me/919876543210',
      color: 'hover:text-green-600'
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      href: 'https://instagram.com/niict.official',
      color: 'hover:text-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      href: 'https://linkedin.com/company/niict',
      color: 'hover:text-blue-700'
    }
  ];

  const contactInfo = [
    {
      icon: 'MapPin',
      text: 'Main Market, Near Bus Stand\nJaipur, Rajasthan - 302001'
    },
    {
      icon: 'Phone',
      text: '+91 98765 43210\n+91 87654 32109'
    },
    {
      icon: 'Mail',
      text: 'info@niict.edu.in\nadmissions@niict.edu.in'
    },
    {
      icon: 'Clock',
      text: 'Mon - Sat: 9:00 AM - 7:00 PM\nSun: 10:00 AM - 5:00 PM'
    }
  ];

  const certifications = [
    'Government Recognized',
    'NIELIT Certified',
    'ISO 9001:2015',
    'Industry Approved'
  ];

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="GraduationCap" size={28} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">NIICT Portal</h3>
                <p className="text-sm opacity-80">National Institute of ICT</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering rural India with digital skills through quality computer education. Join thousands of successful graduates who have transformed their careers with us.
            </p>

            {/* Certifications */}
            <div className="space-y-2">
              <h4 className="font-semibold text-white mb-3">Certifications</h4>
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                  <Icon name="Award" size={14} color="var(--color-success)" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <Icon name="ChevronRight" size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <a
                    href={course.href}
                    className="text-gray-300 hover:text-secondary transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <Icon name="BookOpen" size={14} />
                    <span>{course.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name={info.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {info.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Stay Updated with NIICT
              </h4>
              <p className="text-gray-300">
                Get the latest updates on new courses, admission notifications, and success stories directly in your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2 min-touch-target">
                <Icon name="Send" size={18} />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-300 text-sm text-center md:text-left">
              <p>
                © {currentYear} NIICT Portal. All rights reserved. | 
                <a href="#" className="hover:text-primary transition-colors duration-200 ml-1">Privacy Policy</a> | 
                <a href="#" className="hover:text-primary transition-colors duration-200 ml-1">Terms of Service</a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-all duration-200 hover:bg-white/20 min-touch-target`}
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-xs">
              NIICT is committed to providing quality computer education and digital literacy to rural communities across India.
              <br />
              Recognized by Government of Rajasthan | Affiliated with NIELIT | ISO 9001:2015 Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;