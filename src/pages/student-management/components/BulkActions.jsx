import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedStudents, 
  onApproveSelected, 
  onRejectSelected, 
  onSendNotification, 
  onGenerateReport, 
  onExportSelected,
  onDeselectAll 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBulkAction = async (action) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
      setShowActions(false);
    }
  };

  if (selectedStudents.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {selectedStudents.length} student{selectedStudents.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <button
            onClick={onDeselectAll}
            className="text-sm text-text-secondary hover:text-primary transition-colors duration-150"
          >
            Deselect all
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="success"
              size="sm"
              iconName="CheckCircle"
              onClick={() => handleBulkAction(onApproveSelected)}
              loading={isLoading}
            >
              Approve
            </Button>
            
            <Button
              variant="danger"
              size="sm"
              iconName="XCircle"
              onClick={() => handleBulkAction(onRejectSelected)}
              loading={isLoading}
            >
              Reject
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Bell"
              onClick={() => handleBulkAction(onSendNotification)}
              loading={isLoading}
            >
              Notify
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              onClick={() => handleBulkAction(onGenerateReport)}
              loading={isLoading}
            >
              Report
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => handleBulkAction(onExportSelected)}
              loading={isLoading}
            >
              Export
            </Button>
          </div>

          {/* Mobile Actions Menu */}
          <div className="lg:hidden relative">
            <Button
              variant="primary"
              size="sm"
              iconName="MoreVertical"
              onClick={() => setShowActions(!showActions)}
            >
              Actions
            </Button>

            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-10">
                <div className="py-2">
                  <button
                    onClick={() => handleBulkAction(onApproveSelected)}
                    className="flex items-center w-full px-4 py-2 text-sm text-success hover:bg-success-50 transition-colors duration-150"
                    disabled={isLoading}
                  >
                    <Icon name="CheckCircle" size={16} className="mr-3" />
                    Approve Selected
                  </button>
                  
                  <button
                    onClick={() => handleBulkAction(onRejectSelected)}
                    className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-150"
                    disabled={isLoading}
                  >
                    <Icon name="XCircle" size={16} className="mr-3" />
                    Reject Selected
                  </button>
                  
                  <div className="border-t border-border my-2"></div>
                  
                  <button
                    onClick={() => handleBulkAction(onSendNotification)}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors duration-150"
                    disabled={isLoading}
                  >
                    <Icon name="Bell" size={16} className="mr-3" />
                    Send Notification
                  </button>
                  
                  <button
                    onClick={() => handleBulkAction(onGenerateReport)}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors duration-150"
                    disabled={isLoading}
                  >
                    <Icon name="FileText" size={16} className="mr-3" />
                    Generate Report
                  </button>
                  
                  <button
                    onClick={() => handleBulkAction(onExportSelected)}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors duration-150"
                    disabled={isLoading}
                  >
                    <Icon name="Download" size={16} className="mr-3" />
                    Export Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Action Status */}
      {isLoading && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-primary">
          <Icon name="Loader2" size={16} className="animate-spin" />
          <span>Processing bulk action...</span>
        </div>
      )}
    </div>
  );
};

export default BulkActions;