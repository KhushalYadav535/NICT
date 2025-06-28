import React from 'react';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  currentQuestion, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onSubmit,
  hasAnswered,
  isMarkedForReview,
  onToggleMarkForReview 
}) => {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="bg-surface border-t border-border p-4 lg:p-6">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="lg"
          iconName="ChevronLeft"
          iconPosition="left"
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          Previous
        </Button>

        {/* Center Actions */}
        <div className="flex items-center space-x-3">
          {/* Mark for Review Button */}
          <Button
            variant={isMarkedForReview ? "warning" : "ghost"}
            size="md"
            iconName={isMarkedForReview ? "BookmarkCheck" : "Bookmark"}
            iconPosition="left"
            onClick={onToggleMarkForReview}
          >
            {isMarkedForReview ? "Marked" : "Mark for Review"}
          </Button>

          {/* Clear Answer Button */}
          {hasAnswered && (
            <Button
              variant="ghost"
              size="md"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => {
                // This would be handled by parent component
                console.log('Clear answer');
              }}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Next/Submit Button */}
        {isLastQuestion ? (
          <Button
            variant="primary"
            size="lg"
            iconName="Send"
            iconPosition="right"
            onClick={onSubmit}
          >
            Submit Test
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            iconName="ChevronRight"
            iconPosition="right"
            onClick={onNext}
          >
            Next
          </Button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
          <span>Progress</span>
          <span>{currentQuestion} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NavigationControls;