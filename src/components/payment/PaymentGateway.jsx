import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const PaymentGateway = ({ 
  amount, 
  courseName, 
  studentName, 
  onSuccess, 
  onFailure, 
  onClose 
}) => {
  const [selectedMethod, setSelectedMethod] = useState('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  const paymentMethods = [
    {
      id: 'online',
      name: 'Online Payment',
      description: 'Pay securely with cards, UPI, or net banking',
      icon: 'CreditCard',
      popular: true
    },
    {
      id: 'emi',
      name: 'EMI Payment',
      description: 'Pay in easy monthly installments',
      icon: 'Calendar',
      popular: false
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using UPI apps like Google Pay, PhonePe',
      icon: 'Smartphone',
      popular: false
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock successful payment
      const paymentResult = {
        id: `pay_${Date.now()}`,
        amount: amount,
        currency: 'INR',
        status: 'success',
        method: selectedMethod,
        timestamp: new Date().toISOString(),
        transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      setPaymentStatus('success');
      onSuccess(paymentResult);

    } catch (error) {
      setPaymentStatus('failed');
      onFailure(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);

    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay test key
          amount: amount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          name: 'NIICT Portal',
          description: `Payment for ${courseName}`,
          image: '/logo.png',
          order_id: `order_${Date.now()}`,
          handler: function (response) {
            const paymentResult = {
              id: response.razorpay_payment_id,
              amount: amount,
              currency: 'INR',
              status: 'success',
              method: 'razorpay',
              timestamp: new Date().toISOString(),
              transactionId: response.razorpay_payment_id
            };
            onSuccess(paymentResult);
          },
          prefill: {
            name: studentName,
            email: 'student@example.com',
            contact: '+919876543210'
          },
          notes: {
            course: courseName,
            student: studentName
          },
          theme: {
            color: '#3B82F6'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };

    } catch (error) {
      console.error('Payment failed:', error);
      onFailure(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentMethods = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Choose Payment Method
      </h3>
      
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => setSelectedMethod(method.id)}
          className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
            selectedMethod === method.id
              ? 'border-primary bg-primary-50 text-primary'
              : 'border-border hover:border-primary-200 hover:bg-primary-25'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedMethod === method.id ? 'bg-primary' : 'bg-gray-100'
              }`}>
                <Icon 
                  name={method.icon} 
                  size={20} 
                  color={selectedMethod === method.id ? 'white' : 'var(--color-text-secondary)'} 
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{method.name}</span>
                  {method.popular && (
                    <span className="px-2 py-1 bg-accent text-white text-xs rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary">{method.description}</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === method.id 
                ? 'border-primary bg-primary' 
                : 'border-border'
            }`}>
              {selectedMethod === method.id && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const renderPaymentSummary = () => (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Payment Summary
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Course:</span>
          <span className="font-medium">{courseName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Student:</span>
          <span className="font-medium">{studentName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Payment Method:</span>
          <span className="font-medium capitalize">{selectedMethod}</span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-text-primary">Total Amount:</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(amount)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEMIOptions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        EMI Options
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { months: 3, amount: Math.ceil(amount / 3), interest: 0 },
          { months: 6, amount: Math.ceil(amount / 6), interest: 0 },
          { months: 9, amount: Math.ceil(amount / 9), interest: 2 },
          { months: 12, amount: Math.ceil(amount / 12), interest: 5 }
        ].map((option) => (
          <div key={option.months} className="border border-border rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(option.amount)}
              </div>
              <div className="text-sm text-text-secondary">
                for {option.months} months
              </div>
              {option.interest > 0 && (
                <div className="text-xs text-warning mt-1">
                  +{option.interest}% interest
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">
              Complete Payment
            </h2>
            <p className="text-text-secondary">Secure payment for {courseName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {paymentStatus === 'pending' && (
            <>
              {renderPaymentMethods()}
              
              {selectedMethod === 'emi' && renderEMIOptions()}
              
              {renderPaymentSummary()}
              
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  loading={isProcessing}
                  onClick={selectedMethod === 'online' ? handleRazorpayPayment : handlePayment}
                  iconName="CreditCard"
                  iconPosition="left"
                >
                  {isProcessing ? 'Processing...' : `Pay ${formatCurrency(amount)}`}
                </Button>
              </div>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Processing Payment
              </h3>
              <p className="text-text-secondary">
                Please wait while we process your payment...
              </p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} color="var(--color-success)" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Payment Successful!
              </h3>
              <p className="text-text-secondary mb-6">
                Your payment has been processed successfully. You will receive a confirmation email shortly.
              </p>
              <Button
                variant="primary"
                onClick={onClose}
              >
                Continue
              </Button>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="XCircle" size={32} color="var(--color-error)" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Payment Failed
              </h3>
              <p className="text-text-secondary mb-6">
                Something went wrong with your payment. Please try again.
              </p>
              <div className="space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setPaymentStatus('pending')}
                >
                  Try Again
                </Button>
                <Button
                  variant="primary"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-primary-50 border-t border-primary-200 p-4">
          <div className="flex items-center space-x-2 text-sm text-primary">
            <Icon name="Shield" size={16} />
            <span>Your payment is secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentGateway; 