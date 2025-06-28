import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      course: 'DCA Graduate',
      location: 'Jaipur, Rajasthan',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5,
      text: `NIICT transformed my life completely. Coming from a rural background, I had no computer knowledge. The teachers here are so patient and supportive. After completing DCA, I got a job in a government office. The practical training and placement assistance were excellent.`,
      achievement: 'Government Job Placement',
      salary: '₹25,000/month'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      course: 'Tally Prime with GST',
      location: 'Udaipur, Rajasthan',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 5,
      text: `I was working in a small shop and wanted to upgrade my skills. The Tally course at NIICT was perfect for me. Now I handle accounts for multiple businesses and my income has tripled. The GST training was particularly valuable.`,
      achievement: 'Freelance Accountant',
      salary: '₹40,000/month'
    },
    {
      id: 3,
      name: 'Sunita Meena',
      course: 'CCC Certified',
      location: 'Kota, Rajasthan',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 5,
      text: `As a housewife, I wanted to learn computers to help my children and maybe find work from home. NIICT's flexible timings allowed me to study while managing my family. Now I do data entry work from home and earn well.`,
      achievement: 'Work from Home',salary: '₹15,000/month'
    },
    {
      id: 4,
      name: 'Vikash Jain',course: 'Python Programming',location: 'Jodhpur, Rajasthan',image: 'https://randomuser.me/api/portraits/men/33.jpg',rating: 5,text: `I completed my graduation and wanted to get into IT. The Python course at NIICT gave me a strong foundation. The practical projects and coding practice helped me land a job in a software company in Bangalore.`,achievement: 'Software Developer',salary: '₹60,000/month'
    },
    {
      id: 5,
      name: 'Kavita Rajput',course: 'Web Design & Development',location: 'Ajmer, Rajasthan',image: 'https://randomuser.me/api/portraits/women/41.jpg',rating: 5,text: `I always had a creative mind and wanted to build websites. NIICT's web development course was comprehensive and hands-on. Now I run my own web design business and have clients from across India.`,
      achievement: 'Business Owner',
      salary: '₹50,000/month'
    },
    {
      id: 6,
      name: 'Amit Sharma',
      course: 'Digital Marketing',
      location: 'Bikaner, Rajasthan',
      image: 'https://randomuser.me/api/portraits/men/29.jpg',
      rating: 5,
      text: `I had a small business but struggled with online marketing. The digital marketing course at NIICT taught me everything from social media to Google Ads. My business revenue has increased by 300% in just 6 months.`,
      achievement: 'Business Growth',
      salary: '₹80,000/month'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

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
            Success Stories from Our Students
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Hear from our graduates who have transformed their careers and lives through quality computer education at NIICT.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg border border-border p-8 md:p-12"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Testimonial Content */}
                  <div>
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={20} color="var(--color-warning)" className="fill-current" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl text-text-primary leading-relaxed mb-6 italic">
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    {/* Achievement & Salary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
                        <Icon name="Briefcase" size={20} color="var(--color-success)" />
                        <div>
                          <div className="text-sm text-success font-medium">Achievement</div>
                          <div className="text-sm text-text-primary">{testimonials[currentIndex].achievement}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                        <Icon name="IndianRupee" size={20} color="var(--color-primary)" />
                        <div>
                          <div className="text-sm text-primary font-medium">Current Salary</div>
                          <div className="text-sm text-text-primary">{testimonials[currentIndex].salary}</div>
                        </div>
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-200">
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-text-primary">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-primary font-medium">
                          {testimonials[currentIndex].course}
                        </p>
                        <p className="text-sm text-text-secondary flex items-center">
                          <Icon name="MapPin" size={14} className="mr-1" />
                          {testimonials[currentIndex].location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="relative">
                    <div className="relative w-full h-80 rounded-xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Students at NIICT"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                    </div>
                    
                    {/* Floating Success Card */}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-border">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                          <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-primary">Career Growth</div>
                          <div className="text-xs text-text-secondary">Success Guaranteed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary-50 transition-all duration-200 min-touch-target z-10"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary-50 transition-all duration-200 min-touch-target z-10"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 min-touch-target ${
                index === currentIndex 
                  ? 'bg-primary w-8' :'bg-border hover:bg-primary-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-text-secondary mb-6">
            Ready to write your own success story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/student-admission-form"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 min-touch-target"
            >
              <Icon name="UserPlus" size={20} className="mr-2" />
              Start Your Journey
            </a>
            <a
              href="https://wa.me/919876543210?text=I%20want%20to%20know%20more%20about%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-success text-white rounded-lg hover:bg-success-700 transition-colors duration-200 min-touch-target"
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Chat with Alumni
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;