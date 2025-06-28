import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TestHeader from './components/TestHeader';
import QuestionDisplay from './components/QuestionDisplay';
import QuestionPalette from './components/QuestionPalette';
import NavigationControls from './components/NavigationControls';
import SubmitConfirmationModal from './components/SubmitConfirmationModal';
import TimeWarningModal from './components/TimeWarningModal';
import TestResultsModal from './components/TestResultsModal';

const OnlineTestInterface = () => {
  const navigate = useNavigate();

  // Mock test data
  const mockTestData = {
    id: "test_001",
    title: "Computer Fundamentals - Module 1 Assessment",
    duration: 3600, // 60 minutes in seconds
    totalQuestions: 25,
    passingScore: 60,
    questions: [
      {
        id: 1,
        text: "What does CPU stand for in computer terminology?",
        subject: "Computer Basics",
        difficulty: "Easy",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Unit",
          "Computer Processing Unit"
        ],
        correctAnswer: "A"
      },
      {
        id: 2,
        text: "Which of the following is an input device?",
        subject: "Hardware",
        difficulty: "Easy",
        options: [
          "Monitor",
          "Printer",
          "Keyboard",
          "Speaker"
        ],
        correctAnswer: "C"
      },
      {
        id: 3,
        text: "What is the primary function of RAM in a computer system?",
        subject: "Memory",
        difficulty: "Medium",
        options: [
          "Permanent storage of data",
          "Temporary storage of data and programs",
          "Processing of data",
          "Display of information"
        ],
        correctAnswer: "B"
      },
      {
        id: 4,
        text: "Which file extension is commonly used for executable files in Windows?",
        subject: "Operating Systems",
        difficulty: "Medium",
        options: [
          ".txt",
          ".doc",
          ".exe",
          ".jpg"
        ],
        correctAnswer: "C"
      },
      {
        id: 5,
        text: "What does HTTP stand for?",
        subject: "Internet",
        difficulty: "Medium",
        options: [
          "HyperText Transfer Protocol",
          "High Transfer Text Protocol",
          "HyperText Transport Protocol",
          "High Text Transfer Protocol"
        ],
        correctAnswer: "A"
      },
      {
        id: 6,
        text: "Which of the following is NOT an operating system?",
        subject: "Operating Systems",
        difficulty: "Easy",
        options: [
          "Windows",
          "Linux",
          "Microsoft Office",
          "macOS"
        ],
        correctAnswer: "C"
      },
      {
        id: 7,
        text: "What is the binary equivalent of decimal number 10?",
        subject: "Number Systems",
        difficulty: "Hard",
        options: [
          "1010",
          "1100",
          "1001",
          "1110"
        ],
        correctAnswer: "A"
      },
      {
        id: 8,
        text: "Which protocol is used for sending emails?",
        subject: "Internet",
        difficulty: "Medium",
        options: [
          "HTTP",
          "FTP",
          "SMTP",
          "TCP"
        ],
        correctAnswer: "C"
      },
      {
        id: 9,
        text: "What is the full form of URL?",
        subject: "Internet",
        difficulty: "Easy",
        options: [
          "Universal Resource Locator",
          "Uniform Resource Locator",
          "Universal Reference Link",
          "Uniform Reference Locator"
        ],
        correctAnswer: "B"
      },
      {
        id: 10,
        text: "Which storage device has the fastest access time?",
        subject: "Storage",
        difficulty: "Medium",
        options: [
          "Hard Disk Drive",
          "CD-ROM",
          "RAM",
          "Floppy Disk"
        ],
        correctAnswer: "C"
      }
    ]
  };

  // Test state
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(mockTestData.duration);
  const [isPaletteVisible, setIsPaletteVisible] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isTimeWarningOpen, setIsTimeWarningOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [warningType, setWarningType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [testStarted, setTestStarted] = useState(true);
  const [warningsShown, setWarningsShown] = useState({
    tenMin: false,
    fiveMin: false,
    oneMin: false
  });

  // Timer effect
  useEffect(() => {
    if (!testStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Show warnings
        if (newTime === 600 && !warningsShown.tenMin) { // 10 minutes
          setWarningType('10min');
          setIsTimeWarningOpen(true);
          setWarningsShown(prev => ({ ...prev, tenMin: true }));
        } else if (newTime === 300 && !warningsShown.fiveMin) { // 5 minutes
          setWarningType('5min');
          setIsTimeWarningOpen(true);
          setWarningsShown(prev => ({ ...prev, fiveMin: true }));
        } else if (newTime === 60 && !warningsShown.oneMin) { // 1 minute
          setWarningType('1min');
          setIsTimeWarningOpen(true);
          setWarningsShown(prev => ({ ...prev, oneMin: true }));
        }
        
        // Auto-submit when time expires
        if (newTime <= 0) {
          handleAutoSubmit();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, timeRemaining, warningsShown]);

  // Auto-save answers
  useEffect(() => {
    // Simulate auto-save to backend
    const saveTimer = setTimeout(() => {
      console.log('Auto-saving answers:', answers);
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [answers]);

  const getCurrentQuestionData = () => {
    return mockTestData.questions.find(q => q.id === currentQuestion);
  };

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockTestData.totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestion(questionNumber);
    setIsPaletteVisible(false);
  };

  const handleToggleMarkForReview = () => {
    setMarkedQuestions(prev => {
      if (prev.includes(currentQuestion)) {
        return prev.filter(q => q !== currentQuestion);
      } else {
        return [...prev, currentQuestion];
      }
    });
  };

  const handleSubmitClick = () => {
    setIsSubmitModalOpen(true);
  };

  const calculateResults = useCallback(() => {
    const totalQuestions = mockTestData.questions.length;
    const answeredQuestions = Object.keys(answers);
    let correctAnswers = 0;

    // Calculate correct answers
    mockTestData.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const incorrectAnswers = answeredQuestions.length - correctAnswers;
    const unanswered = totalQuestions - answeredQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = percentage >= mockTestData.passingScore;

    // Calculate subject-wise results
    const subjectStats = {};
    mockTestData.questions.forEach(question => {
      if (!subjectStats[question.subject]) {
        subjectStats[question.subject] = { total: 0, correct: 0 };
      }
      subjectStats[question.subject].total++;
      
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        subjectStats[question.subject].correct++;
      }
    });

    const subjectWiseResults = Object.entries(subjectStats).map(([subject, stats]) => ({
      name: subject,
      total: stats.total,
      correct: stats.correct,
      percentage: Math.round((stats.correct / stats.total) * 100)
    }));

    return {
      score: correctAnswers,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      percentage,
      timeTaken: mockTestData.duration - timeRemaining,
      passed,
      passingScore: mockTestData.passingScore,
      subjectWiseResults
    };
  }, [answers, timeRemaining]);

  const handleSubmitConfirm = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const results = calculateResults();
      setTestResults(results);
      setIsSubmitModalOpen(false);
      setIsResultsModalOpen(true);
      setTestStarted(false);
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoSubmit = () => {
    const results = calculateResults();
    setTestResults(results);
    setIsResultsModalOpen(true);
    setTestStarted(false);
  };

  const handleReturnToDashboard = () => {
    navigate('/student-portal-dashboard');
  };

  const answeredQuestions = Object.keys(answers).map(Number);
  const currentQuestionData = getCurrentQuestionData();
  const isMarkedForReview = markedQuestions.includes(currentQuestion);
  const hasAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-background">
      {/* Test Header */}
      <TestHeader
        testTitle={mockTestData.title}
        timeRemaining={timeRemaining}
        totalQuestions={mockTestData.totalQuestions}
        currentQuestion={currentQuestion}
        onSubmit={handleSubmitClick}
        onTogglePalette={() => setIsPaletteVisible(!isPaletteVisible)}
        isPaletteVisible={isPaletteVisible}
      />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Question Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
              <QuestionDisplay
                question={currentQuestionData}
                selectedAnswer={answers[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
                isMarkedForReview={isMarkedForReview}
                onToggleMarkForReview={handleToggleMarkForReview}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <NavigationControls
            currentQuestion={currentQuestion}
            totalQuestions={mockTestData.totalQuestions}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmitClick}
            hasAnswered={hasAnswered}
            isMarkedForReview={isMarkedForReview}
            onToggleMarkForReview={handleToggleMarkForReview}
          />
        </div>

        {/* Question Palette */}
        <QuestionPalette
          questions={mockTestData.questions}
          currentQuestion={currentQuestion}
          answeredQuestions={answeredQuestions}
          markedQuestions={markedQuestions}
          onQuestionSelect={handleQuestionSelect}
          isVisible={isPaletteVisible}
          onClose={() => setIsPaletteVisible(false)}
        />
      </div>

      {/* Modals */}
      <SubmitConfirmationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleSubmitConfirm}
        answeredCount={answeredQuestions.length}
        totalQuestions={mockTestData.totalQuestions}
        markedCount={markedQuestions.length}
        isSubmitting={isSubmitting}
      />

      <TimeWarningModal
        isOpen={isTimeWarningOpen}
        onClose={() => setIsTimeWarningOpen(false)}
        timeRemaining={timeRemaining}
        warningType={warningType}
      />

      <TestResultsModal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        onReturnToDashboard={handleReturnToDashboard}
        results={testResults}
      />
    </div>
  );
};

export default OnlineTestInterface;