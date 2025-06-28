import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroBanner from './components/HeroBanner';
import CourseGrid from './components/CourseGrid';
import FeaturesShowcase from './components/FeaturesShowcase';
import StatisticsCounter from './components/StatisticsCounter';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import AboutSection from './components/AboutSection';
import GalleryGrid from './components/GalleryGrid';
import ContactSection from './components/ContactSection';
import WhatsAppWidget from './components/WhatsAppWidget';
import Footer from './components/Footer';

const Homepage = () => {
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate('/student-admission-form');
  };

  const handleViewSyllabus = (course) => {
    // Navigate to course details modal with course data
    navigate('/course-details-modal', { state: { course } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Banner */}
        <HeroBanner onEnrollClick={handleEnrollClick} />

        {/* Course Grid */}
        <CourseGrid onViewSyllabus={handleViewSyllabus} />

        {/* Features Showcase */}
        <FeaturesShowcase />

        {/* Statistics Counter */}
        <StatisticsCounter />

        {/* Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* About Section */}
        <AboutSection />

        {/* Gallery Grid */}
        <GalleryGrid />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;