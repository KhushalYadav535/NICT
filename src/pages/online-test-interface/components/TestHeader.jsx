import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestHeader = ({ 
  testTitle, 
  timeRemaining, 
  totalQuestions, 
  currentQuestion, 
  onSubmit,
  onTogglePalette,
  isPaletteVisible 
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining > 600) return 'text-success'; // > 10 minutes
    if (timeRemaining > 300) return 'text-warning'; // > 5 minutes
    return 'text-error'; // <= 5 minutes
  };

  const getTimerBgColor = () => {
    if (timeRemaining > 600) return 'bg-success-50 border-success-200';
    if (timeRemaining > 300) return 'bg-warning-50 border-warning-200';
    return 'bg-error-50 border-error-200';
  };

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Test Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="ClipboardCheck" size={24} color="var(--color-primary)" />
              <div>
                <h1 className="text-lg font-heading font-semibold text-text-primary">
                  {testTitle}
                </h1>
                <p className="text-sm text-text-secondary">
                  Question {currentQuestion} of {totalQuestions}
                </p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg border ${getTimerBgColor()}`}>
            <Icon name="Clock" size={20} className={getTimerColor()} />
            <div className="text-center">
              <div className={`text-lg font-mono font-bold ${getTimerColor()}`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-text-secondary">Time Left</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Palette Toggle */}
            <button
              onClick={onTogglePalette}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target"
              aria-label="Toggle question palette"
            >
              <Icon name={isPaletteVisible ? 'X' : 'Grid3X3'} size={20} />
            </button>

            {/* Submit Button */}
            <Button
              variant="danger"
              size="sm"
              iconName="Send"
              iconPosition="right"
              onClick={onSubmit}
            >
              Submit Test
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TestHeader;