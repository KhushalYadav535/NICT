import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeaturesShowcase = () => {
  const features = [
    {
      icon: 'Award',
      title: 'Government Certified',
      description: 'All our courses are recognized by government bodies and provide valid certifications for employment.',
      color: 'primary'
    },
    {
      icon: 'Users',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of practical experience in their respective fields.',
      color: 'secondary'
    },
    {
      icon: 'Clock',
      title: 'Flexible Timings',
      description: 'Choose from morning, afternoon, or evening batches that fit your schedule and lifestyle.',
      color: 'accent'
    },
    {
      icon: 'Laptop',
      title: 'Modern Lab Facilities',
      description: 'Practice on latest computers with high-speed internet and industry-standard software.',
      color: 'success'
    },
    {
      icon: 'Briefcase',
      title: 'Placement Assistance',
      description: 'Get job placement support with resume building, interview preparation, and employer connections.',
      color: 'warning'
    },
    {
      icon: 'IndianRupee',
      title: 'Affordable Fees',
      description: 'Quality education at reasonable costs with flexible payment options and scholarship programs.',
      color: 'primary'
    },
    {
      icon: 'BookOpen',
      title: 'Practical Learning',
      description: 'Hands-on training with real projects and case studies to build practical skills.',
      color: 'secondary'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Get continuous support through WhatsApp, phone calls, and in-person assistance.',
      color: 'accent'
    }
  ];

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
            Why Choose NIICT?
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            We provide comprehensive computer education with modern facilities, expert guidance, and strong industry connections to ensure your success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border group hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-${feature.color}-100 group-hover:bg-${feature.color}-200 transition-colors duration-300`}>
                <Icon 
                  name={feature.icon} 
                  size={32} 
                  color={`var(--color-${feature.color})`}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg border border-border"
        >
          <div className="flex items-center justify-center mb-4">
            <Icon name="MapPin" size={24} color="var(--color-primary)" className="mr-2" />
            <span className="text-lg font-medium text-text-primary">Visit Our Center</span>
          </div>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Experience our modern facilities firsthand. Schedule a visit to see our computer labs, meet our instructors, and get a feel for the learning environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919876543210?text=I%20want%20to%20visit%20NIICT%20center"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-success text-white rounded-lg hover:bg-success-700 transition-colors duration-200 min-touch-target"
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Schedule Visit via WhatsApp
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 min-touch-target"
            >
              <Icon name="Phone" size={20} className="mr-2" />
              Call Now: +91 98765 43210
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;