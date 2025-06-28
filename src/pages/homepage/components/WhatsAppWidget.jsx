import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const quickMessages = [
    {
      id: 1,
      text: "I want to know about course fees and duration",
      icon: "IndianRupee"
    },
    {
      id: 2,
      text: "What are the admission requirements?",
      icon: "UserPlus"
    },
    {
      id: 3,
      text: "Can I visit the center for a demo class?",
      icon: "Calendar"
    },
    {
      id: 4,
      text: "Do you provide placement assistance?",
      icon: "Briefcase"
    },
    {
      id: 5,
      text: "What are the available batch timings?",
      icon: "Clock"
    }
  ];

  const handleQuickMessage = (message) => {
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleDirectChat = () => {
    const whatsappUrl = 'https://wa.me/919876543210?text=Hello! I am interested in NIICT courses.';
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide widget when near footer (last 200px)
      if (scrollY + windowHeight >= documentHeight - 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-150">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border border-border p-6 w-80 max-w-[calc(100vw-3rem)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} color="white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">NIICT Support</h4>
                  <p className="text-xs text-success flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="X" size={16} color="var(--color-text-secondary)" />
              </button>
            </div>

            {/* Welcome Message */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-text-primary">
                👋 Hi there! How can we help you today?
              </p>
            </div>

            {/* Quick Messages */}
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Quick Questions
              </p>
              {quickMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => handleQuickMessage(message.text)}
                  className="w-full text-left p-3 rounded-lg border border-border hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                      <Icon name={message.icon} size={16} color="var(--color-primary)" />
                    </div>
                    <span className="text-sm text-text-primary group-hover:text-primary transition-colors duration-200">
                      {message.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Direct Chat Button */}
            <button
              onClick={handleDirectChat}
              className="w-full bg-success text-white rounded-lg p-3 hover:bg-success-700 transition-colors duration-200 flex items-center justify-center space-x-2 min-touch-target"
            >
              <Icon name="MessageCircle" size={18} />
              <span className="font-medium">Start New Chat</span>
            </button>

            {/* Footer */}
            <div className="mt-3 text-center">
              <p className="text-xs text-text-secondary">
                Usually replies within minutes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-success text-white rounded-full shadow-2xl hover:bg-success-700 transition-all duration-300 flex items-center justify-center relative min-touch-target group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon name="X" size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon name="MessageCircle" size={28} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Dot */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white"
          />
        )}

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-success opacity-30 group-hover:animate-ping"></div>
      </motion.button>

      {/* Tooltip */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute right-20 top-1/2 -translate-y-1/2 bg-text-primary text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
        >
          Need help? Chat with us!
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-4 border-l-text-primary border-y-4 border-y-transparent"></div>
        </motion.div>
      )}
    </div>
  );
};

export default WhatsAppWidget;