import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestResultsModal = ({ 
  isOpen, 
  onClose, 
  onReturnToDashboard,
  results 
}) => {
  if (!isOpen || !results) return null;

  const {
    score,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unanswered,
    percentage,
    timeTaken,
    passed,
    passingScore,
    subjectWiseResults
  } = results;

  const getGradeColor = () => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-primary';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getGradeBg = () => {
    if (percentage >= 90) return 'bg-success-50 border-success-200';
    if (percentage >= 75) return 'bg-primary-50 border-primary-200';
    if (percentage >= 60) return 'bg-warning-50 border-warning-200';
    return 'bg-error-50 border-error-200';
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="fixed inset-0 z-200 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-surface rounded-xl shadow-modal animate-scale-in">
            {/* Header */}
            <div className={`p-6 border-b border-border ${getGradeBg()} rounded-t-xl`}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-surface rounded-full flex items-center justify-center">
                  <Icon 
                    name={passed ? "Trophy" : "AlertCircle"} 
                    size={32} 
                    color={passed ? "var(--color-success)" : "var(--color-error)"} 
                  />
                </div>
                <h2 className="text-2xl font-heading font-bold text-text-primary">
                  Test Completed!
                </h2>
                <p className="text-text-secondary mt-2">
                  {passed ? "Congratulations! You have passed the test." : "You need more practice. Keep learning!"}
                </p>
              </div>
            </div>

            {/* Results Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Score Overview */}
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getGradeBg()} ${getGradeColor()}`}>
                    <span className="text-2xl font-bold">{percentage}%</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-text-primary">
                      {score} out of {totalQuestions} correct
                    </p>
                    <p className="text-sm text-text-secondary">
                      Passing score: {passingScore}%
                    </p>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-success-50 rounded-lg">
                    <div className="text-2xl font-bold text-success">{correctAnswers}</div>
                    <div className="text-sm text-success">Correct</div>
                  </div>
                  <div className="text-center p-4 bg-error-50 rounded-lg">
                    <div className="text-2xl font-bold text-error">{incorrectAnswers}</div>
                    <div className="text-sm text-error">Incorrect</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-text-secondary">{unanswered}</div>
                    <div className="text-sm text-text-secondary">Unanswered</div>
                  </div>
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formatTime(timeTaken)}</div>
                    <div className="text-sm text-primary">Time Taken</div>
                  </div>
                </div>

                {/* Subject-wise Results */}
                {subjectWiseResults && subjectWiseResults.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Subject-wise Performance</h3>
                    <div className="space-y-3">
                      {subjectWiseResults.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-text-primary">{subject.name}</p>
                            <p className="text-sm text-text-secondary">
                              {subject.correct} of {subject.total} questions
                            </p>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${
                              subject.percentage >= 75 ? 'text-success' : 
                              subject.percentage >= 60 ? 'text-warning' : 'text-error'
                            }`}>
                              {subject.percentage}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance Analysis */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
                    <div>
                      <h4 className="font-medium text-primary">Performance Analysis</h4>
                      <div className="text-sm text-blue-700 mt-1">
                        {percentage >= 90 && "Excellent performance! You have mastered the concepts."}
                        {percentage >= 75 && percentage < 90 && "Good job! You have a solid understanding of the material."}
                        {percentage >= 60 && percentage < 75 && "Fair performance. Consider reviewing the topics you missed."}
                        {percentage < 60 && "Keep practicing! Focus on understanding the fundamental concepts."}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-2">What's Next?</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                      <span>Review your answers and explanations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                      <span>Practice more questions on weak areas</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                      <span>Take additional practice tests</span>
                    </li>
                    {passed && (
                      <li className="flex items-start space-x-2">
                        <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                        <span>Download your certificate from the dashboard</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  size="md"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={() => {
                    // This would restart the test
                    console.log('Retake test');
                  }}
                >
                  Retake Test
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={onReturnToDashboard}
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultsModal;