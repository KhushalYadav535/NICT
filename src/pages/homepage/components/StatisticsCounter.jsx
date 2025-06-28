import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatisticsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    students: 0,
    courses: 0,
    placement: 0,
    experience: 0
  });

  const sectionRef = useRef(null);

  const statistics = [
    {
      key: 'students',
      target: 5000,
      suffix: '+',
      title: 'Students Trained',
      description: 'Successfully completed courses',
      icon: 'Users',
      color: 'primary'
    },
    {
      key: 'courses',
      target: 15,
      suffix: '+',
      title: 'Courses Offered',
      description: 'Industry-relevant programs',
      icon: 'BookOpen',
      color: 'secondary'
    },
    {
      key: 'placement',
      target: 85,
      suffix: '%',
      title: 'Placement Rate',
      description: 'Students placed in jobs',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      key: 'experience',
      target: 10,
      suffix: '+',
      title: 'Years Experience',
      description: 'In computer education',
      icon: 'Award',
      color: 'accent'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      statistics.forEach((stat) => {
        let current = 0;
        const increment = stat.target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            current = stat.target;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [stat.key]: Math.floor(current)
          }));
        }, 20);
      });
    };

    const timeout = setTimeout(animateCounters, 200);
    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-20 h-20 border border-white rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 border border-white rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Over the years, we have built a strong track record of success, helping thousands of students achieve their career goals through quality computer education.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <Icon name={stat.icon} size={32} color="white" />
              </div>

              {/* Counter */}
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold font-heading">
                  {counters[stat.key]}
                </span>
                <span className="text-2xl md:text-3xl font-bold">
                  {stat.suffix}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-semibold mb-2">
                {stat.title}
              </h3>

              {/* Description */}
              <p className="text-sm opacity-90">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Achievement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-3">
              <Icon name="Shield" size={24} />
              <span className="text-lg font-medium">Government Recognized</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Icon name="Star" size={24} />
              <span className="text-lg font-medium">4.8/5 Student Rating</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Icon name="MapPin" size={24} />
              <span className="text-lg font-medium">Prime Location</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsCounter;