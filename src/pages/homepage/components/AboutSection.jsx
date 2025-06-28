import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: 'Target' },
    { id: 'vision', label: 'Our Vision', icon: 'Eye' },
    { id: 'values', label: 'Our Values', icon: 'Heart' }
  ];

  const content = {
    mission: {
      title: 'Empowering Rural Communities Through Digital Education',
      description: `Our mission is to bridge the digital divide by providing accessible, affordable, and quality computer education to rural and semi-urban communities. We believe that every individual, regardless of their background, deserves the opportunity to acquire digital skills that can transform their lives and career prospects.

We are committed to delivering practical, industry-relevant training that not only teaches technical skills but also builds confidence and opens doors to new opportunities. Through our comprehensive courses and dedicated support, we aim to create a digitally literate society where technology becomes a tool for empowerment and growth.`,
      highlights: [
        'Accessible education for all backgrounds',
        'Industry-relevant practical training',
        'Building confidence through technology',
        'Creating employment opportunities'
      ]
    },
    vision: {
      title: 'Leading Digital Transformation in Rural India',
      description: `We envision a future where every village and small town in India has access to world-class computer education. Our vision is to become the most trusted and recognized computer training institute in rural India, known for our quality education, successful placements, and positive impact on communities.

By 2030, we aim to have trained over 50,000 students across multiple centers, with each graduate equipped with the skills needed to thrive in the digital economy. We see ourselves as catalysts of change, transforming not just individual lives but entire communities through the power of digital literacy.`,
      highlights: [
        'Expanding to 100+ rural locations',
        'Training 50,000+ students by 2030',
        '100% placement assistance guarantee',
        'Community-wide digital transformation'
      ]
    },
    values: {
      title: 'Core Values That Guide Our Journey',
      description: `Our values form the foundation of everything we do at NIICT. We believe in excellence without compromise, ensuring that every student receives the highest quality education. Integrity guides our interactions, building trust with students, parents, and the community.

We embrace innovation in our teaching methods, constantly updating our curriculum to match industry trends. Inclusivity is at our heart - we welcome students from all backgrounds and provide equal opportunities for growth. Finally, we are committed to community service, giving back to the society that has supported our growth.`,
      highlights: [
        'Excellence in education delivery',
        'Integrity in all interactions',
        'Innovation in teaching methods',
        'Inclusivity and equal opportunities'
      ]
    }
  };

  const instructors = [
    {
      name: 'Dr. Rajesh Kumar',
      designation: 'Director & Senior Instructor',
      specialization: 'Computer Science & Programming',
      experience: '15+ Years',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      qualifications: 'Ph.D. Computer Science, M.Tech IT',
      achievements: 'Published 25+ research papers, Former IT Manager at TCS'
    },
    {
      name: 'Prof. Sunita Sharma',
      designation: 'Head of Academics',
      specialization: 'Office Applications & Tally',
      experience: '12+ Years',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      qualifications: 'M.Sc. Computer Science, B.Ed.',
      achievements: 'Certified Tally Trainer, 5000+ students trained'
    },
    {
      name: 'Mr. Vikash Jain',
      designation: 'Programming Instructor',
      specialization: 'Python, Web Development',
      experience: '8+ Years',
      image: 'https://randomuser.me/api/portraits/men/35.jpg',
      qualifications: 'B.Tech CSE, Full Stack Developer',
      achievements: 'Ex-Software Engineer at Infosys, 50+ projects completed'
    },
    {
      name: 'Ms. Priya Meena',
      designation: 'Digital Marketing Trainer',
      specialization: 'SEO, Social Media, Google Ads',
      experience: '6+ Years',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      qualifications: 'MBA Marketing, Google Certified',
      achievements: 'Helped 200+ businesses grow online, Digital Marketing Expert'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-surface via-primary-50 to-surface">
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
            About NIICT
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Learn more about our mission, vision, values, and the dedicated team that makes quality computer education accessible to everyone.
          </p>
        </motion.div>

        {/* Mission, Vision, Values Tabs */}
        <div className="mb-16">
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-center mb-8 bg-white rounded-xl p-2 shadow-md border border-border max-w-2xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 min-touch-target flex-1 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:text-primary hover:bg-primary-50'
                }`}
              >
                <Icon name={tab.icon} size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-border p-8 md:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-6">
                  {content[activeTab].title}
                </h3>
                <div className="text-text-secondary leading-relaxed mb-6 whitespace-pre-line">
                  {content[activeTab].description}
                </div>
                <div className="space-y-3">
                  {content[activeTab].highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={14} color="var(--color-primary)" />
                      </div>
                      <span className="text-text-primary">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="NIICT Institute"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Instructor Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
              Meet Our Expert Instructors
            </h3>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Learn from industry professionals with years of practical experience and a passion for teaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group"
              >
                {/* Instructor Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-90">{instructor.experience}</div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="p-6">
                  <h4 className="text-lg font-heading font-semibold text-text-primary mb-1">
                    {instructor.name}
                  </h4>
                  <p className="text-primary font-medium mb-2">
                    {instructor.designation}
                  </p>
                  <p className="text-sm text-text-secondary mb-3">
                    {instructor.specialization}
                  </p>
                  <div className="text-xs text-text-secondary mb-3">
                    <div className="mb-1">{instructor.qualifications}</div>
                    <div>{instructor.achievements}</div>
                  </div>
                  <div className="flex items-center text-success text-sm">
                    <Icon name="Award" size={14} className="mr-1" />
                    Expert Instructor
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Institute Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-lg border border-border p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calendar" size={24} color="var(--color-primary)" />
              </div>
              <div className="text-2xl font-bold text-primary">10+</div>
              <div className="text-sm text-text-secondary">Years of Excellence</div>
            </div>
            <div>
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MapPin" size={24} color="var(--color-secondary)" />
              </div>
              <div className="text-2xl font-bold text-secondary">5</div>
              <div className="text-sm text-text-secondary">Center Locations</div>
            </div>
            <div>
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={24} color="var(--color-success)" />
              </div>
              <div className="text-2xl font-bold text-success">25+</div>
              <div className="text-sm text-text-secondary">Industry Awards</div>
            </div>
            <div>
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} color="var(--color-accent)" />
              </div>
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-sm text-text-secondary">Expert Faculty</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;