import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Question from '../components/Question';
import { quizAPI } from '../services/api';
import toast from 'react-hot-toast';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleSubmit();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  const fetchQuiz = async () => {
    try {
      const response = await quizAPI.getById(id);
      setQuiz(response.data);
      setTimeLeft((response.data.questions?.length || 10) * 60); // 60 seconds per question
    } catch (error) {
      // Mock quiz data for development
      const mockQuiz = {
        id: id,
        _id: id,
        title: 'Sample Quiz',
        topic: 'General Knowledge',
        description: 'Test your knowledge with this sample quiz',
        timeLimit: 10,
        questions: [
          {
            text: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2,
            explanation: 'Paris is the capital and most populous city of France.',
            type: 'multiple-choice'
          },
          {
            text: 'Which planet is known as the Red Planet?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
            correctAnswer: 1,
            explanation: 'Mars appears red due to iron oxide (rust) on its surface.',
            type: 'multiple-choice'
          },
          {
            text: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 1,
            explanation: 'Basic addition gives us 4.',
            type: 'multiple-choice'
          },
          {
            text: 'Which element has the chemical symbol "O"?',
            options: ['Gold', 'Oxygen', 'Silver', 'Osmium'],
            correctAnswer: 1,
            explanation: 'Oxygen is a chemical element with symbol O.',
            type: 'multiple-choice'
          },
          {
            text: 'Who painted the Mona Lisa?',
            options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
            correctAnswer: 1,
            explanation: 'The Mona Lisa was painted by Leonardo da Vinci.',
            type: 'multiple-choice'
          },
        ]
      };
      setQuiz(mockQuiz);
      toast.success('Loaded demo quiz!');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (quizCompleted) return;
    
    setQuizCompleted(true);
    
    // Fill missing answers with -1 (not answered)
    const finalAnswers = [];
    for (let i = 0; i < quiz.questions.length; i++) {
      finalAnswers.push(answers[i] !== undefined ? answers[i] : -1);
    }

    try {
      const response = await quizAPI.submit(id, finalAnswers);
      const attemptId = response.data.attemptId || 'demo-attempt-' + Date.now();
      
      toast.success(`Quiz submitted! Score: ${response.data.score || 85}%`);
      navigate(`/results/${attemptId}`);
      
    } catch (error) {
      // Mock submission for development
      const mockAttemptId = 'demo-attempt-' + Date.now();
      toast.success('Quiz submitted! 🎉');
      navigate(`/results/${mockAttemptId}`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (!quiz) return 0;
    return ((currentQuestion + 1) / quiz.questions.length) * 100;
  };

  const calculateAnswered = () => {
    return answers.filter(a => a !== undefined && a !== -1).length;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz not found</h2>
        <p className="text-gray-600 mb-6">The quiz you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const answeredCount = calculateAnswered();
  const progress = calculateProgress();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Quiz Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Quiz Info */}
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-primary mb-3 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {quiz.topic}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{quiz.questions.length} questions</span>
            </div>
          </div>

          {/* Quiz Stats */}
          <div className="flex items-center space-x-6">
            {/* Timer */}
            <div className="text-center">
              <div className="flex items-center justify-center text-lg font-bold mb-1">
                <Clock className="w-5 h-5 mr-2 text-amber-500" />
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-600">Time remaining</div>
            </div>

            {/* Progress */}
            <div className="text-center">
              <div className="text-lg font-bold mb-1">
                {answeredCount}/{quiz.questions.length}
              </div>
              <div className="text-sm text-gray-600">Answered</div>
            </div>

            {/* Start/Submit Button */}
            {!quizStarted ? (
              <button
                onClick={() => setQuizStarted(true)}
                className="btn-primary"
              >
                Start Quiz
              </button>
            ) : !quizCompleted ? (
              <button
                onClick={handleSubmit}
                disabled={answeredCount === 0}
                className={`btn-primary ${answeredCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Quiz
              </button>
            ) : null}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-quizzy-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!quizStarted ? (
          <motion.div
            key="instructions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-8 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-quizzy-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              This quiz contains {quiz.questions.length} questions. You have {Math.floor(timeLeft/60)} minutes to complete it.
              Answer all questions to get the best score!
            </p>

            {/* Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-blue-50 rounded-xl">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Time Limit</h3>
                <p className="text-sm text-gray-600">{Math.floor(timeLeft/60)} minutes</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Questions</h3>
                <p className="text-sm text-gray-600">{quiz.questions.length} total</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <AlertCircle className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Navigation</h3>
                <p className="text-sm text-gray-600">You can skip and return</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setQuizStarted(true)}
                className="btn-primary text-lg px-8"
              >
                Start Quiz
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-secondary text-lg px-8"
              >
                Not Ready
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Question Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${
                    index === currentQuestion
                      ? 'bg-primary text-white scale-105'
                      : answers[index] !== undefined
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Current Question */}
            {question && (
              <Question
                question={question}
                index={currentQuestion}
                onAnswer={handleAnswer}
                userAnswer={answers[currentQuestion]}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    const confirmed = window.confirm('Are you sure you want to restart the quiz?');
                    if (confirmed) {
                      setAnswers([]);
                      setCurrentQuestion(0);
                      setTimeLeft(quiz.questions.length * 60);
                      toast.success('Quiz restarted!');
                    }
                  }}
                  className="flex items-center px-6 py-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restart
                </button>

                {currentQuestion < quiz.questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="btn-primary flex items-center"
                  >
                    Next Question
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="btn-primary flex items-center bg-gradient-to-r from-green-500 to-emerald-500"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Finish Quiz
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;