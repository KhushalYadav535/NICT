import React from 'react';
import Icon from '../../../components/AppIcon';

const QuestionDisplay = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  isMarkedForReview,
  onToggleMarkForReview 
}) => {
  if (!question) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} color="var(--color-text-secondary)" />
          <p className="text-text-secondary mt-4">No question available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6 lg:p-8">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
              Q{question.id}
            </span>
            <span className="text-sm text-text-secondary">
              {question.difficulty} • {question.subject}
            </span>
          </div>
          
          {/* Question Text */}
          <h2 className="text-lg lg:text-xl font-medium text-text-primary leading-relaxed">
            {question.text}
          </h2>
          
          {/* Question Image if exists */}
          {question.image && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <img 
                src={question.image} 
                alt="Question diagram" 
                className="max-w-full h-auto rounded"
              />
            </div>
          )}
        </div>

        {/* Mark for Review */}
        <button
          onClick={onToggleMarkForReview}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 min-touch-target ${
            isMarkedForReview
              ? 'bg-warning-100 text-warning-700 border border-warning-200' :'text-text-secondary hover:text-warning hover:bg-warning-50'
          }`}
        >
          <Icon name={isMarkedForReview ? 'BookmarkCheck' : 'Bookmark'} size={18} />
          <span className="text-sm font-medium">
            {isMarkedForReview ? 'Marked' : 'Mark for Review'}
          </span>
        </button>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === optionLabel;
          
          return (
            <label
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 min-touch-target ${
                isSelected
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="answer"
                  value={optionLabel}
                  checked={isSelected}
                  onChange={() => onAnswerSelect(optionLabel)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-primary bg-primary text-white' :'border-gray-300'
                }`}>
                  {isSelected && <Icon name="Check" size={14} />}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start space-x-3">
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-primary' : 'text-text-secondary'
                  }`}>
                    {optionLabel}.
                  </span>
                  <span className={`text-base ${
                    isSelected ? 'text-primary font-medium' : 'text-text-primary'
                  }`}>
                    {option}
                  </span>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Auto-save Indicator */}
      {selectedAnswer && (
        <div className="flex items-center space-x-2 mt-4 text-success">
          <Icon name="CheckCircle" size={16} />
          <span className="text-sm">Answer saved automatically</span>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;