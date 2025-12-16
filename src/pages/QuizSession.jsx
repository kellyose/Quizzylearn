// src/pages/QuizSession.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Target, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  SkipForward,
  Zap,
  Volume2
} from 'lucide-react';
import Confetti from 'react-confetti';

export default function QuizSession() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResults, setShowResults] = useState(false);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    skip: true,
    hint: true,
  });

  const questions = [
    {
      id: 1,
      question: "What is the time complexity of binary search in a sorted array?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      correct: 1,
      explanation: "Binary search divides the search interval in half each time, resulting in logarithmic time complexity.",
      difficulty: "Medium",
      category: "Algorithms"
    },
    {
      id: 2,
      question: "Which React Hook is used to perform side effects in function components?",
      options: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer"
      ],
      correct: 1,
      explanation: "useEffect lets you perform side effects in function components.",
      difficulty: "Easy",
      category: "React"
    },
    // Add more questions...
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 100);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const useLifeline = (lifeline) => {
    if (lifelines[lifeline]) {
      setLifelines(prev => ({ ...prev, [lifeline]: false }));
      
      if (lifeline === 'fiftyFifty') {
        // Logic to remove two wrong answers
      } else if (lifeline === 'hint') {
        // Show hint
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <Confetti />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4"
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Quiz Complete! 🎉</h1>
            <p className="text-xl text-gray-600 mb-8">
              You scored {score} points out of {questions.length * 100}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold">{Math.round((score / (questions.length * 100)) * 100)}%</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-2xl font-bold">{formatTime(300 - timeLeft)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">XP Earned</p>
                <p className="text-2xl font-bold">+{score}</p>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition">
                View Detailed Results
              </button>
              <button className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-bold text-lg hover:bg-purple-50 transition">
                Take Another Quiz
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-400"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Quiz Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{currentQ.category}</h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Volume2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Timer */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-semibold">Time Remaining</span>
                  </div>
                  <span className={`text-2xl font-bold ${
                    timeLeft < 60 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              {/* Score */}
              <div className="text-center">
                <p className="text-sm text-gray-600">Current Score</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {score} XP
                </p>
              </div>
            </div>

            {/* Lifelines */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold mb-4">Lifelines</h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(lifelines).map(([key, available]) => (
                  <button
                    key={key}
                    onClick={() => useLifeline(key)}
                    disabled={!available}
                    className={`flex flex-col items-center p-3 rounded-xl transition ${
                      available
                        ? 'hover:bg-purple-50 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                      available
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {key === 'fiftyFifty' ? '50/50' : key === 'skip' ? <SkipForward /> : <HelpCircle />}
                    </div>
                    <span className="text-xs capitalize">{key.replace('Fifty', '50')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Quiz Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">{currentQ.question}</h1>
                    <div className="grid gap-3">
                      {currentQ.options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`p-4 rounded-xl text-left transition-all ${
                            selectedAnswer === null
                              ? 'hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300'
                              : selectedAnswer === index
                              ? index === currentQ.correct
                                ? 'bg-green-100 border-2 border-green-500'
                                : 'bg-red-100 border-2 border-red-500'
                              : index === currentQ.correct
                              ? 'bg-green-100 border-2 border-green-500'
                              : 'bg-gray-100 border-2 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                              selectedAnswer === null
                                ? 'bg-gray-100 text-gray-700'
                                : selectedAnswer === index
                                ? index === currentQ.correct
                                  ? 'bg-green-500 text-white'
                                  : 'bg-red-500 text-white'
                                : index === currentQ.correct
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="font-medium">{option}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6"
                    >
                      <h3 className="font-bold mb-2">
                        {selectedAnswer === currentQ.correct ? '✅ Correct!' : '❌ Incorrect'}
                      </h3>
                      <p>{currentQ.explanation}</p>
                    </motion.div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-6 border-t">
                    <button
                      onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestion === 0}
                      className="flex items-center px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => useLifeline('skip')}
                        disabled={!lifelines.skip}
                        className="flex items-center px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 text-orange-600 transition"
                      >
                        Skip Question
                        <SkipForward className="w-5 h-5 ml-2" />
                      </button>
                      
                      <button
                        onClick={() => {
                          if (currentQuestion < questions.length - 1) {
                            setCurrentQuestion(prev => prev + 1);
                            setSelectedAnswer(null);
                          } else {
                            setShowResults(true);
                          }
                        }}
                        className="flex items-center px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition"
                      >
                        {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}