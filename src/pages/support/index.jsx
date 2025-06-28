import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SupportPortal = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock support data
  const supportData = {
    tickets: [
      {
        id: 1,
        title: 'Payment Issue - Transaction Failed',
        category: 'payment',
        priority: 'high',
        status: 'open',
        createdAt: '2024-12-20T10:30:00Z',
        updatedAt: '2024-12-20T14:20:00Z',
        studentName: 'Rahul Kumar',
        studentId: 'NIICT2024001',
        description: 'I tried to make a payment for the DCA course but the transaction failed. The amount was deducted from my account but the payment is not showing in my portal.',
        attachments: ['payment_receipt.pdf'],
        messages: [
          {
            id: 1,
            sender: 'student',
            message: 'I tried to make a payment for the DCA course but the transaction failed. The amount was deducted from my account but the payment is not showing in my portal.',
            timestamp: '2024-12-20T10:30:00Z'
          },
          {
            id: 2,
            sender: 'support',
            message: 'Hello Rahul, thank you for reaching out. I understand your concern. Could you please share the transaction ID or payment receipt so I can help you resolve this issue?',
            timestamp: '2024-12-20T11:00:00Z'
          },
          {
            id: 3,
            sender: 'student',
            message: 'I have attached the payment receipt. Please check and help me resolve this.',
            timestamp: '2024-12-20T14:20:00Z'
          }
        ]
      },
      {
        id: 2,
        title: 'Cannot Access Live Class',
        category: 'technical',
        priority: 'medium',
        status: 'in-progress',
        createdAt: '2024-12-19T15:45:00Z',
        updatedAt: '2024-12-20T09:15:00Z',
        studentName: 'Priya Singh',
        studentId: 'NIICT2024002',
        description: 'I am unable to join the live class. The Zoom link is not working and I keep getting an error message.',
        attachments: [],
        messages: [
          {
            id: 1,
            sender: 'student',
            message: 'I am unable to join the live class. The Zoom link is not working and I keep getting an error message.',
            timestamp: '2024-12-19T15:45:00Z'
          },
          {
            id: 2,
            sender: 'support',
            message: 'Hi Priya, I apologize for the inconvenience. Let me check the Zoom link and provide you with an updated one.',
            timestamp: '2024-12-19T16:00:00Z'
          }
        ]
      },
      {
        id: 3,
        title: 'Course Material Download Issue',
        category: 'technical',
        priority: 'low',
        status: 'resolved',
        createdAt: '2024-12-18T12:20:00Z',
        updatedAt: '2024-12-19T10:30:00Z',
        studentName: 'Amit Patel',
        studentId: 'NIICT2024003',
        description: 'I am unable to download the course materials. The download button is not responding.',
        attachments: [],
        messages: [
          {
            id: 1,
            sender: 'student',
            message: 'I am unable to download the course materials. The download button is not responding.',
            timestamp: '2024-12-18T12:20:00Z'
          },
          {
            id: 2,
            sender: 'support',
            message: 'Hello Amit, this issue has been resolved. Please try downloading the materials again. If the problem persists, please clear your browser cache.',
            timestamp: '2024-12-19T10:30:00Z'
          }
        ]
      }
    ],
    faq: [
      {
        id: 1,
        question: 'How do I reset my password?',
        answer: 'To reset your password, go to the login page and click on "Forgot Password". Enter your registered email address and follow the instructions sent to your email.',
        category: 'account'
      },
      {
        id: 2,
        question: 'What payment methods are accepted?',
        answer: 'We accept various payment methods including credit/debit cards, net banking, UPI, and EMI options. All payments are processed securely through our payment gateway.',
        category: 'payment'
      },
      {
        id: 3,
        question: 'How can I join live classes?',
        answer: 'Live class links are shared via email and SMS before each session. You can also find them in your student portal under the "Live Classes" section.',
        category: 'classes'
      },
      {
        id: 4,
        question: 'What is the refund policy?',
        answer: 'We offer a 7-day money-back guarantee if you are not satisfied with the course. Refunds are processed within 5-7 business days.',
        category: 'payment'
      },
      {
        id: 5,
        question: 'How do I download my certificate?',
        answer: 'Once you complete your course, your certificate will be available for download in the "Certificates" section of your student portal.',
        category: 'certificate'
      }
    ]
  };

  const ticketCategories = [
    { id: 'all', name: 'All Tickets', icon: 'Ticket' },
    { id: 'payment', name: 'Payment Issues', icon: 'DollarSign' },
    { id: 'technical', name: 'Technical Support', icon: 'Settings' },
    { id: 'course', name: 'Course Related', icon: 'BookOpen' },
    { id: 'certificate', name: 'Certificate Issues', icon: 'Award' }
  ];

  const priorityColors = {
    high: 'text-error',
    medium: 'text-warning',
    low: 'text-success'
  };

  const statusColors = {
    open: 'bg-warning-100 text-warning-700',
    'in-progress': 'bg-primary-100 text-primary-700',
    resolved: 'bg-success-100 text-success-700',
    closed: 'bg-gray-100 text-gray-700'
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'student',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate support response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: 'support',
        message: 'Thank you for your message. Our support team will get back to you shortly.',
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleCreateTicket = () => {
    console.log('Creating new ticket...');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTickets = supportData.tickets.filter(ticket => 
    activeTab === 'tickets' || ticket.category === activeTab
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Support Portal
              </h1>
              <p className="text-text-secondary">
                Get help and support for all your queries
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsChatOpen(!isChatOpen)}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Live Chat
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateTicket}
                iconName="Plus"
                iconPosition="left"
              >
                New Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Ticket" size={24} color="var(--color-primary)" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Open Tickets</h3>
            <p className="text-2xl font-bold text-primary">
              {supportData.tickets.filter(t => t.status === 'open').length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={24} color="var(--color-warning)" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">In Progress</h3>
            <p className="text-2xl font-bold text-warning">
              {supportData.tickets.filter(t => t.status === 'in-progress').length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Resolved</h3>
            <p className="text-2xl font-bold text-success">
              {supportData.tickets.filter(t => t.status === 'resolved').length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageCircle" size={24} color="var(--color-secondary)" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Live Chat</h3>
            <p className="text-sm text-text-secondary">Available 24/7</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'tickets', name: 'My Tickets', icon: 'Ticket' },
            { id: 'faq', name: 'FAQ', icon: 'HelpCircle' },
            { id: 'payment', name: 'Payment Issues', icon: 'DollarSign' },
            { id: 'technical', name: 'Technical Support', icon: 'Settings' },
            { id: 'course', name: 'Course Related', icon: 'BookOpen' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-border hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tickets List */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-text-primary">
                            {ticket.title}
                          </h3>
                          <p className="text-text-secondary">By {ticket.studentName} ({ticket.studentId})</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                            {ticket.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className={`text-sm font-medium ${priorityColors[ticket.priority]}`}>
                            {ticket.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <p className="text-text-secondary mb-4 line-clamp-2">
                        {ticket.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>Created: {formatDate(ticket.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>Updated: {formatDate(ticket.updatedAt)}</span>
                        </div>
                        {ticket.attachments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Paperclip" size={14} />
                            <span>{ticket.attachments.length} attachment(s)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedTicket(ticket)}
                        iconName="Eye"
                        iconPosition="left"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {supportData.faq.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md border border-border overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                    {item.question}
                  </h3>
                  <p className="text-text-secondary">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Live Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-xl shadow-2xl border border-border z-50">
          <div className="bg-primary text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={20} color="white" />
                <span className="font-medium">Live Chat Support</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <Icon name="X" size={16} color="white" />
              </button>
            </div>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'student'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-text-primary'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {formatDate(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleSendMessage}
                iconName="Send"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  Ticket Details
                </h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {selectedTicket.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
                    <span>By {selectedTicket.studentName}</span>
                    <span>ID: {selectedTicket.studentId}</span>
                    <span className={`font-medium ${priorityColors[selectedTicket.priority]}`}>
                      {selectedTicket.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedTicket.status]}`}>
                      {selectedTicket.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-text-secondary">{selectedTicket.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Conversation</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedTicket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg ${
                            message.sender === 'student'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-text-primary'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {formatDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add a reply..."
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Button variant="primary" iconName="Send" iconPosition="left">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SupportPortal; 