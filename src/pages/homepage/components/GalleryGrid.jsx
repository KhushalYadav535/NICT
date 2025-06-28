import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const GalleryGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All', icon: 'Grid3X3' },
    { id: 'classroom', label: 'Classrooms', icon: 'Monitor' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
    { id: 'labs', label: 'Computer Labs', icon: 'Laptop' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Modern Computer Lab',
      description: 'State-of-the-art computer lab with latest hardware and software',
      category: 'labs'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Interactive Classroom Session',
      description: 'Students actively participating in hands-on learning',
      category: 'classroom'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Programming Workshop',
      description: 'Python programming workshop for advanced students',
      category: 'events'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Tally Training Session',
      description: 'Practical accounting software training with real scenarios',
      category: 'classroom'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Student Achievement Ceremony',
      description: 'Celebrating successful course completion and job placements',
      category: 'achievements'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Advanced Programming Lab',
      description: 'Dedicated space for web development and programming courses',
      category: 'labs'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Digital Marketing Workshop',
      description: 'Hands-on training in SEO, social media, and online advertising',
      category: 'events'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Web Design Classroom',
      description: 'Creative workspace for web design and development courses',
      category: 'classroom'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Industry Expert Session',
      description: 'Guest lecture by industry professionals sharing real-world insights',
      category: 'events'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Certificate Distribution',
      description: 'Proud moment of students receiving their course completion certificates',
      category: 'achievements'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1515378791036-0648a814c963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Group Study Session',
      description: 'Collaborative learning environment fostering peer-to-peer education',
      category: 'classroom'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Technology Showcase',
      description: 'Annual tech fest showcasing student projects and innovations',
      category: 'events'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
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
            Institute Gallery
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Take a virtual tour of our modern facilities, vibrant classrooms, and memorable moments from our educational journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 min-touch-target ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-text-secondary hover:text-primary hover:bg-primary-50 border border-border'
              }`}
            >
              <Icon name={category.icon} size={18} />
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <div className="relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
                  <Image
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <h4 className="font-semibold mb-1">{image.title}</h4>
                      <p className="text-sm opacity-90 line-clamp-2">{image.description}</p>
                    </div>
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Icon name="Eye" size={20} color="var(--color-primary)" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-200 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 min-touch-target"
                >
                  <Icon name="X" size={24} />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 min-touch-target"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 min-touch-target"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>

                {/* Image */}
                <div className="relative">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                  
                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-white/90">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-text-secondary mb-6">
            Want to experience our facilities in person?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919876543210?text=I%20want%20to%20schedule%20a%20campus%20visit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-success text-white rounded-lg hover:bg-success-700 transition-colors duration-200 min-touch-target"
            >
              <Icon name="Calendar" size={20} className="mr-2" />
              Schedule Campus Visit
            </a>
            <a
              href="/student-admission-form"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 min-touch-target"
            >
              <Icon name="UserPlus" size={20} className="mr-2" />
              Apply for Admission
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryGrid;