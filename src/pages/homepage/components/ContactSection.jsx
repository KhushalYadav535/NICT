import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const courses = [
    'DCA (Diploma in Computer Applications)',
    'Tally Prime with GST',
    'CCC (Course on Computer Concepts)',
    'Python Programming',
    'Web Design & Development',
    'Digital Marketing',
    'MS Office Suite',
    'Data Entry & Typing'
  ];

  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Visit Our Center',
      details: 'Main Market, Near Bus Stand\nJaipur, Rajasthan - 302001',
      action: 'Get Directions',
      link: 'https://maps.google.com/?q=26.9124,75.7873'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      details: '+91 98765 43210\n+91 87654 32109',
      action: 'Call Now',
      link: 'tel:+919876543210'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      details: 'info@niict.edu.in\nadmissions@niict.edu.in',
      action: 'Send Email',
      link: 'mailto:info@niict.edu.in'
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp',
      details: 'Quick support & inquiries\n24/7 Available',
      action: 'Chat Now',
      link: 'https://wa.me/919876543210'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: ''
      });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
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
            Get in Touch
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Ready to start your digital journey? Contact us for course information, admission guidance, or any questions about our programs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-border p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Send us a Message
              </h3>
              <p className="text-text-secondary">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Course of Interest
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="">Select a course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your goals and any specific questions you have..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus === 'success' ?'bg-success-50 text-success border border-success-200' :'bg-error-50 text-error border border-error-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={submitStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                      size={20} 
                    />
                    <span className="font-medium">
                      {submitStatus === 'success' ?'Message sent successfully! We\'ll contact you soon.' :'Failed to send message. Please try again.'}
                    </span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md border border-border p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={info.icon} size={24} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-text-primary mb-2">
                        {info.title}
                      </h4>
                      <p className="text-text-secondary text-sm mb-3 whitespace-pre-line">
                        {info.details}
                      </p>
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="inline-flex items-center text-primary hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                      >
                        {info.action}
                        <Icon name="ExternalLink" size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md border border-border overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  Our Location
                </h4>
                <p className="text-text-secondary">
                  Visit our main center located in the heart of Jaipur, easily accessible by public transport.
                </p>
              </div>
              <div className="h-64 relative">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="NIICT Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=26.9124,75.7873&z=14&output=embed"
                  className="border-0"
                />
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white"
            >
              <h4 className="text-lg font-semibold mb-4">
                Need Immediate Assistance?
              </h4>
              <div className="space-y-3">
                <a
                  href="https://wa.me/919876543210?text=I%20need%20immediate%20assistance%20regarding%20courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200 min-touch-target"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="MessageCircle" size={20} />
                    <span>WhatsApp Support</span>
                  </div>
                  <Icon name="ArrowRight" size={16} />
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-between w-full p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200 min-touch-target"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={20} />
                    <span>Call Directly</span>
                  </div>
                  <Icon name="ArrowRight" size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;