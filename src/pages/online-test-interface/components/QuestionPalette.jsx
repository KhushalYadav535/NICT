import React from 'react';
import Icon from '../../../components/AppIcon';

const QuestionPalette = ({ 
  questions, 
  currentQuestion, 
  answeredQuestions, 
  markedQuestions, 
  onQuestionSelect,
  isVisible,
  onClose 
}) => {
  const getQuestionStatus = (questionId) => {
    if (markedQuestions.includes(questionId) && answeredQuestions.includes(questionId)) {
      return 'answered-marked';
    }
    if (markedQuestions.includes(questionId)) {
      return 'marked';
    }
    if (answeredQuestions.includes(questionId)) {
      return 'answered';
    }
    if (questionId === currentQuestion) {
      return 'current';
    }
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-success text-white';
      case 'marked':
        return 'bg-warning text-white';
      case 'answered-marked':
        return 'bg-purple-600 text-white';
      case 'current':
        return 'bg-primary text-white ring-2 ring-primary-300';
      default:
        return 'bg-gray-100 text-text-secondary hover:bg-gray-200';
    }
  };

  const getStatusStats = () => {
    const answered = answeredQuestions.length;
    const marked = markedQuestions.filter(q => !answeredQuestions.includes(q)).length;
    const unanswered = questions.length - answeredQuestions.length;
    
    return { answered, marked, unanswered };
  };

  const stats = getStatusStats();

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose}>
        <div className="fixed inset-y-0 right-0 w-80 bg-surface shadow-xl animate-slide-left" onClick={(e) => e.stopPropagation()}>
          <PaletteContent 
            questions={questions}
            currentQuestion={currentQuestion}
            getQuestionStatus={getQuestionStatus}
            getStatusColor={getStatusColor}
            onQuestionSelect={onQuestionSelect}
            stats={stats}
            onClose={onClose}
            isMobile={true}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-surface border-l border-border">
        <PaletteContent 
          questions={questions}
          currentQuestion={currentQuestion}
          getQuestionStatus={getQuestionStatus}
          getStatusColor={getStatusColor}
          onQuestionSelect={onQuestionSelect}
          stats={stats}
          isMobile={false}
        />
      </div>
    </>
  );
};

const PaletteContent = ({ 
  questions, 
  currentQuestion, 
  getQuestionStatus, 
  getStatusColor, 
  onQuestionSelect, 
  stats, 
  onClose, 
  isMobile 
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Question Palette
          </h3>
          {isMobile && (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-success-50 rounded-lg">
            <div className="text-lg font-bold text-success">{stats.answered}</div>
            <div className="text-xs text-success">Answered</div>
          </div>
          <div className="p-3 bg-warning-50 rounded-lg">
            <div className="text-lg font-bold text-warning">{stats.marked}</div>
            <div className="text-xs text-warning">Marked</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-text-secondary">{stats.unanswered}</div>
            <div className="text-xs text-text-secondary">Unanswered</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning rounded"></div>
            <span>Marked for Review</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-600 rounded"></div>
            <span>Answered & Marked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded"></div>
            <span>Current Question</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <span>Not Answered</span>
          </div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question, index) => {
            const questionNumber = index + 1;
            const status = getQuestionStatus(questionNumber);
            
            return (
              <button
                key={question.id}
                onClick={() => onQuestionSelect(questionNumber)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 min-touch-target ${getStatusColor(status)}`}
                title={`Question ${questionNumber} - ${status.replace('-', ' & ')}`}
              >
                {questionNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <button className="w-full px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target">
            Review Marked Questions
          </button>
          <button className="w-full px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 min-touch-target">
            Review Unanswered
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;