import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseFees = ({ feeStructure, discounts }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="CreditCard" size={20} className="mr-2" />
        Fee Structure
      </h2>

      <div className="space-y-6">
        {/* Main Fee Structure */}
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Course Fee</h3>
              <p className="text-sm text-text-secondary">Complete course with certification</p>
            </div>
            <div className="text-right">
              {feeStructure.originalPrice > feeStructure.currentPrice && (
                <p className="text-sm text-text-secondary line-through">
                  {formatCurrency(feeStructure.originalPrice)}
                </p>
              )}
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(feeStructure.currentPrice)}
              </p>
            </div>
          </div>
          
          {feeStructure.originalPrice > feeStructure.currentPrice && (
            <div className="flex items-center space-x-2 text-sm text-success">
              <Icon name="Tag" size={16} />
              <span className="font-medium">
                Save {formatCurrency(feeStructure.originalPrice - feeStructure.currentPrice)}
              </span>
            </div>
          )}
        </div>

        {/* Payment Options */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-3">Payment Options:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {feeStructure.paymentOptions.map((option, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-text-primary">{option.type}</h4>
                  <span className="text-sm font-semibold text-primary">
                    {formatCurrency(option.amount)}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{option.description}</p>
                {option.discount && (
                  <div className="mt-2 flex items-center space-x-1 text-xs text-success">
                    <Icon name="Percent" size={12} />
                    <span>{option.discount}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Discounts */}
        {discounts && discounts.length > 0 && (
          <div>
            <h3 className="text-md font-medium text-text-primary mb-3">Available Discounts:</h3>
            <div className="space-y-3">
              {discounts.map((discount, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-success-50 rounded-lg">
                  <Icon name="Gift" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-success">{discount.title}</h4>
                    <p className="text-xs text-text-secondary">{discount.description}</p>
                    <p className="text-xs text-success font-medium mt-1">
                      Save up to {discount.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's Included */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-3">What's Included:</h3>
          <ul className="space-y-2">
            {feeStructure.includes.map((item, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">Accepted Payment Methods:</h4>
          <div className="flex flex-wrap gap-2">
            {['UPI', 'Bank Transfer', 'Cash', 'Card Payment'].map((method, index) => (
              <span key={index} className="px-3 py-1 bg-white border border-border rounded-full text-xs text-text-secondary">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFees;