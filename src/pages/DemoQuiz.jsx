// src/pages/DemoQuiz.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Play, Trophy, Users, Star, Zap, Target, 
  BookOpen, Brain, Timer, Check, X, Award, ChevronRight,
  Clock, AlertCircle, Home, BarChart, PieChart, HelpCircle
} from 'lucide-react';

export default function DemoQuiz() {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questions, setQuestions] = useState({});

  const demoTopics = [
    {
      id: 'science',
      title: 'Science',
      description: 'Biology, Physics, and Chemistry concepts',
      questions: 5,
      difficulty: 'Mixed',
      icon: '🔬',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'mathematics',
      title: 'Mathematics',
      description: 'Calculus, Statistics, and Algebra problems',
      questions: 5,
      difficulty: 'Mixed',
      icon: '🧮',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'computer_science',
      title: 'Computer Science',
      description: 'Algorithms, Data Structures, and AI concepts',
      questions: 5,
      difficulty: 'Mixed',
      icon: '💻',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    }
  ];

  // Base questions with correct answer always shuffled to random position
  const baseQuestions = {
    science: [
      {
        id: 1,
        question: "How does heat transfer work?",
        correctAnswer: "Through conduction, convection, and radiation",
        otherAnswers: [
          "Through chemical reactions only",
          "Through electrical circuits",
          "Through magnetic fields",
          "Through sound waves"
        ],
        explanation: "Heat transfer occurs through three main methods: conduction (direct contact), convection (fluid movement), and radiation (electromagnetic waves). This is a fundamental concept in thermodynamics.",
        difficulty: "Easy",
        category: "Science - Physics",
        points: 100
      },
      {
        id: 2,
        question: "Calculate the value of gravity.",
        correctAnswer: "9.8 m/s² on Earth's surface",
        otherAnswers: [
          "6.67 m/s²",
          "3.14 m/s²",
          "1.0 m/s²",
          "5.0 m/s²"
        ],
        explanation: "The acceleration due to gravity on Earth's surface is approximately 9.8 meters per second squared. This value varies slightly depending on altitude and location.",
        difficulty: "Medium",
        category: "Science - Physics",
        points: 150
      },
      {
        id: 3,
        question: "Why does cell division happen?",
        correctAnswer: "For growth, repair, and reproduction",
        otherAnswers: [
          "To create energy",
          "To absorb nutrients",
          "To produce oxygen",
          "To maintain temperature"
        ],
        explanation: "Cell division is essential for organism growth, tissue repair, and reproduction through mitosis and meiosis. It's a fundamental biological process.",
        difficulty: "Medium",
        category: "Science - Biology",
        points: 150
      },
      {
        id: 4,
        question: "What is the primary function of mitochondria?",
        correctAnswer: "Produce cellular energy (ATP)",
        otherAnswers: [
          "Store genetic information",
          "Synthesize proteins",
          "Detoxify the cell",
          "Control cell division"
        ],
        explanation: "Mitochondria are known as the 'powerhouses of the cell' because they produce ATP through cellular respiration, providing energy for cellular activities.",
        difficulty: "Medium",
        category: "Science - Biology",
        points: 150
      },
      {
        id: 5,
        question: "Which gas is most abundant in Earth's atmosphere?",
        correctAnswer: "Nitrogen (N₂)",
        otherAnswers: [
          "Oxygen (O₂)",
          "Carbon dioxide (CO₂)",
          "Argon (Ar)",
          "Helium (He)"
        ],
        explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere, while oxygen constitutes about 21%. The remaining 1% consists of other gases.",
        difficulty: "Easy",
        category: "Science - Chemistry",
        points: 100
      }
    ],
    
    mathematics: [
      {
        id: 6,
        question: "What is the value of π (pi) to two decimal places?",
        correctAnswer: "3.14",
        otherAnswers: [
          "2.71",
          "1.62",
          "3.00",
          "4.00"
        ],
        explanation: "π (pi) is a mathematical constant representing the ratio of a circle's circumference to its diameter. Its approximate value is 3.14159, often rounded to 3.14.",
        difficulty: "Easy",
        category: "Mathematics - Geometry",
        points: 100
      },
      {
        id: 7,
        question: "What does the Pythagorean theorem calculate?",
        correctAnswer: "The relationship between sides of a right triangle",
        otherAnswers: [
          "The area of a circle",
          "The volume of a sphere",
          "The slope of a line",
          "The circumference of an ellipse"
        ],
        explanation: "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c².",
        difficulty: "Medium",
        category: "Mathematics - Geometry",
        points: 150
      },
      {
        id: 8,
        question: "What is the derivative of x²?",
        correctAnswer: "2x",
        otherAnswers: [
          "x",
          "x³/3",
          "2x²",
          "x²/2"
        ],
        explanation: "The derivative of x² with respect to x is 2x. This follows the power rule of differentiation: d/dx(xⁿ) = n*xⁿ⁻¹.",
        difficulty: "Medium",
        category: "Mathematics - Calculus",
        points: 150
      },
      {
        id: 9,
        question: "What is the mean of the numbers 4, 8, 6, 5, 7?",
        correctAnswer: "6",
        otherAnswers: [
          "5",
          "7",
          "8",
          "4"
        ],
        explanation: "The mean (average) is calculated by summing all numbers and dividing by the count: (4 + 8 + 6 + 5 + 7) ÷ 5 = 30 ÷ 5 = 6.",
        difficulty: "Easy",
        category: "Mathematics - Statistics",
        points: 100
      },
      {
        id: 10,
        question: "Solve for x: 2x + 5 = 15",
        correctAnswer: "5",
        otherAnswers: [
          "10",
          "7.5",
          "20",
          "3"
        ],
        explanation: "Subtract 5 from both sides: 2x = 10. Then divide both sides by 2: x = 5. This is a basic linear equation.",
        difficulty: "Easy",
        category: "Mathematics - Algebra",
        points: 100
      }
    ],
    
    computer_science: [
      {
        id: 11,
        question: "What does HTML stand for?",
        correctAnswer: "HyperText Markup Language",
        otherAnswers: [
          "HighText Machine Language",
          "HyperTransfer Markup Language",
          "HighTech Media Language",
          "HyperText Modern Language"
        ],
        explanation: "HTML is the standard markup language for documents designed to be displayed in a web browser. It provides the structure for web pages.",
        difficulty: "Easy",
        category: "Computer Science - Web Development",
        points: 100
      },
      {
        id: 12,
        question: "What is the time complexity of binary search?",
        correctAnswer: "O(log n)",
        otherAnswers: [
          "O(n)",
          "O(n²)",
          "O(1)",
          "O(n log n)"
        ],
        explanation: "Binary search has O(log n) time complexity because it divides the search space in half with each comparison, making it very efficient for sorted arrays.",
        difficulty: "Medium",
        category: "Computer Science - Algorithms",
        points: 150
      },
      {
        id: 13,
        question: "Which data structure uses LIFO (Last In, First Out)?",
        correctAnswer: "Stack",
        otherAnswers: [
          "Queue",
          "Linked List",
          "Tree",
          "Array"
        ],
        explanation: "A stack follows the LIFO principle, where the last element added is the first one removed. Common operations are push (add) and pop (remove).",
        difficulty: "Medium",
        category: "Computer Science - Data Structures",
        points: 150
      },
      {
        id: 14,
        question: "What is machine learning?",
        correctAnswer: "AI systems that learn from data",
        otherAnswers: [
          "Manual programming of rules",
          "Hardware optimization",
          "Network configuration",
          "Database management"
        ],
        explanation: "Machine learning is a subset of AI where algorithms learn patterns from data without being explicitly programmed, improving their performance over time.",
        difficulty: "Hard",
        category: "Computer Science - AI",
        points: 200
      },
      {
        id: 15,
        question: "What does API stand for?",
        correctAnswer: "Application Programming Interface",
        otherAnswers: [
          "Advanced Programming Interface",
          "Application Protocol Interface",
          "Advanced Protocol Interface",
          "Application Process Integration"
        ],
        explanation: "An API is a set of rules and protocols that allows different software applications to communicate with each other and exchange data.",
        difficulty: "Medium",
        category: "Computer Science - Software Engineering",
        points: 150
      }
    ]
  };

  // Initialize questions with shuffled answers
  useEffect(() => {
    if (Object.keys(questions).length === 0) {
      const initializedQuestions = {};
      
      Object.keys(baseQuestions).forEach(topic => {
        initializedQuestions[topic] = baseQuestions[topic].map(q => {
          // Combine correct answer with other answers
          const allAnswers = [q.correctAnswer, ...q.otherAnswers];
          
          // Shuffle the answers
          const shuffledAnswers = [...allAnswers].sort(() => Math.random() - 0.5);
          
          // Find new position of correct answer
          const correctIndex = shuffledAnswers.indexOf(q.correctAnswer);
          
          return {
            ...q,
            options: shuffledAnswers,
            correct: correctIndex
          };
        });
      });
      
      setQuestions(initializedQuestions);
    }
  }, []);

  useEffect(() => {
    if (selectedTopic && !quizCompleted && timeLeft > 0 && !showResult && questions[selectedTopic]) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, quizCompleted, selectedTopic, questions]);

  const startQuiz = (topicId) => {
    if (!questions[topicId]) return;
    
    setSelectedTopic(topicId);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setCorrectAnswers(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (index) => {
    if (showResult || quizCompleted || !selectedTopic || !questions[selectedTopic]) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    const currentQ = questions[selectedTopic][currentQuestion];
    const isCorrect = index === currentQ.correct;
    
    if (isCorrect) {
      const timeBonus = Math.max(0, Math.floor(timeLeft / 3));
      const streakBonus = streak * 20;
      const totalPoints = currentQ.points + timeBonus + streakBonus;
      
      setScore(score + totalPoints);
      setStreak(streak + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < questions[selectedTopic].length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions[selectedTopic].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setSelectedTopic(null);
    setShowInstructions(false);
  };

  const backToTopics = () => {
    setSelectedTopic(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-2xl w-full">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow">
              <Play className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4 text-gray-900">QuizzyLearn Demo</h1>
            <p className="text-gray-600 mb-8">
              Experience our adaptive learning platform with real educational content. Test your knowledge across multiple subjects.
            </p>

            <div className="bg-purple-50 rounded-xl p-6 mb-8 border border-purple-100">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Demo Features:</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 border border-purple-200">
                    <Trophy className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">5 Questions per Topic</span>
                    <p className="text-gray-600 text-sm">Comprehensive topic coverage</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 border border-purple-200">
                    <Star className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">Randomized Answers</span>
                    <p className="text-gray-600 text-sm">Shuffled options for better learning</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 border border-purple-200">
                    <BarChart className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">Performance Analytics</span>
                    <p className="text-gray-600 text-sm">Track your progress in real-time</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 border border-purple-200">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">Adaptive Scoring</span>
                    <p className="text-gray-600 text-sm">Time and streak bonuses</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-sm"
            >
              Start Demo Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTopic && !quizCompleted && questions[selectedTopic]) {
    const currentQ = questions[selectedTopic][currentQuestion];
    const selectedTopicData = demoTopics.find(t => t.id === selectedTopic);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Header */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <button
                  onClick={backToTopics}
                  className="flex items-center text-gray-600 hover:text-purple-600 mb-2 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Topics
                </button>
                <h1 className="text-xl font-bold text-gray-900">{selectedTopicData?.title}</h1>
                <p className="text-gray-600 text-sm">Question {currentQuestion + 1} of {questions[selectedTopic].length}</p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <div className="flex items-center bg-purple-50 px-3 py-2 rounded-lg border border-purple-100">
                  <Trophy className="w-4 h-4 text-yellow-600 mr-2" />
                  <span className="font-semibold text-gray-900">{score} pts</span>
                </div>
                <div className={`flex items-center px-3 py-2 rounded-lg border ${timeLeft < 10 ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
                  <Timer className={`w-4 h-4 ${timeLeft < 10 ? 'text-red-600' : 'text-blue-600'} mr-2`} />
                  <span className={`font-semibold ${timeLeft < 10 ? 'text-red-600' : 'text-blue-600'}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                  <Zap className="w-4 h-4 text-green-600 mr-2" />
                  <span className="font-semibold text-gray-900">Streak: {streak}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(((currentQuestion + 1) / questions[selectedTopic].length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-600 transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions[selectedTopic].length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100">
                    {currentQ.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded border ${
                    currentQ.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-100' :
                    currentQ.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                    'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {currentQ.points} points
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6 leading-relaxed">{currentQ.question}</h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentQ.options.map((option, index) => {
                const isCorrect = index === currentQ.correct;
                const isSelected = selectedAnswer === index;
                
                let bgColor = "bg-white";
                let borderColor = "border-gray-300";
                let hoverEffect = "hover:border-purple-400";
                
                if (showResult) {
                  hoverEffect = "";
                  if (isCorrect) {
                    bgColor = "bg-green-50";
                    borderColor = "border-green-500";
                  } else if (isSelected && !isCorrect) {
                    bgColor = "bg-red-50";
                    borderColor = "border-red-500";
                  }
                } else if (isSelected) {
                  bgColor = "bg-purple-50";
                  borderColor = "border-purple-500";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`p-4 rounded-lg border ${borderColor} ${bgColor} text-left transition-all duration-200 ${hoverEffect} ${!showResult && 'hover:shadow-sm'} disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 border ${
                          showResult 
                            ? isCorrect 
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : isSelected
                                ? 'bg-red-100 text-red-700 border-red-300'
                                : 'bg-gray-100 text-gray-600 border-gray-300'
                            : isSelected
                              ? 'bg-purple-100 text-purple-700 border-purple-300'
                              : 'bg-gray-100 text-gray-600 border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-800">{option}</span>
                      </div>
                      
                      {showResult && (
                        <div className="ml-2">
                          {isCorrect && <Check className="h-5 w-5 text-green-600" />}
                          {isSelected && !isCorrect && <X className="h-5 w-5 text-red-600" />}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200 animate-fadeIn">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {selectedAnswer === currentQ.correct ? 'Correct! 🎉 ' : 'Not quite. '}
                      Explanation:
                    </h3>
                    <p className="text-gray-700 text-sm mb-3">{currentQ.explanation}</p>
                    {selectedAnswer === currentQ.correct && (
                      <div className="bg-green-50 rounded border border-green-200 p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-green-700 mr-2" />
                            <span className="text-sm font-medium text-green-800">
                              +{currentQ.points} base points
                            </span>
                          </div>
                          {streak > 1 && (
                            <span className="text-sm font-medium text-green-800">
                              +{(streak-1)*20} streak bonus
                            </span>
                          )}
                          {timeLeft > 0 && (
                            <span className="text-sm font-medium text-green-800">
                              +{Math.floor(timeLeft/3)} time bonus
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center shadow-sm"
                >
                  {currentQuestion < questions[selectedTopic].length - 1 ? "Next Question" : "View Results"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 mb-1">{currentQuestion + 1}</div>
                <div className="text-xs text-gray-600">Current</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">{questions[selectedTopic]?.length || 0}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600 mb-1">{correctAnswers}</div>
                <div className="text-xs text-gray-600">Correct</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const selectedTopicData = demoTopics.find(t => t.id === selectedTopic);
    const totalQuestions = questions[selectedTopic]?.length || 0;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const performanceLevel = accuracy >= 80 ? 'Excellent' : accuracy >= 60 ? 'Good' : 'Keep Learning';
    
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <button
              onClick={backToTopics}
              className="flex items-center text-gray-600 hover:text-purple-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Topics
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-3">Quiz Completed!</h1>
              <p className="text-gray-600 mb-8">You've completed the {selectedTopicData?.title} demo quiz</p>
              
              {/* Score Card */}
              <div className="bg-purple-50 rounded-xl p-6 mb-8 border border-purple-100">
                <div className="text-4xl font-bold text-gray-900 mb-2">{score}</div>
                <div className="text-gray-600">Total Points</div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-xl font-bold text-gray-900 mb-1">{totalQuestions}</div>
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-xl font-bold text-gray-900 mb-1">{correctAnswers}</div>
                  <div className="text-xs text-gray-600">Correct</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {accuracy}%
                  </div>
                  <div className="text-xs text-gray-600">Accuracy</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {streak > 0 ? `${streak}x` : "0"}
                  </div>
                  <div className="text-xs text-gray-600">Best Streak</div>
                </div>
              </div>
              
              {/* Performance Rating */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Performance Level</h3>
                <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                  accuracy >= 80 ? 'bg-green-100 text-green-800 border border-green-200' :
                  accuracy >= 60 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                  'bg-purple-100 text-purple-800 border border-purple-200'
                }`}>
                  {performanceLevel}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={restartQuiz}
                  className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                >
                  Try Another Topic
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-2 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Get Full Access
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2 border border-gray-400 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Topic Selection Screen
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowInstructions(true)}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Instructions
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Choose a Topic</h1>
            <p className="text-gray-600">Select a topic to start your demo quiz (5 questions each)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {demoTopics.map((topic) => (
              <div key={topic.id} className={`bg-white rounded-xl border ${topic.borderColor} p-6 hover:shadow transition-shadow`}>
                <div className={`w-12 h-12 ${topic.bgColor} rounded-lg flex items-center justify-center mb-4 border ${topic.borderColor}`}>
                  <span className={`text-2xl ${topic.iconColor}`}>{topic.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-300">
                    {topic.questions} questions
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {topic.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => startQuiz(topic.id)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>

          {/* Features Showcase */}
          <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">QuizzyLearn Features</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-100">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Adaptive Learning</h3>
                <p className="text-xs text-gray-600">Personalized difficulty</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-100">
                  <PieChart className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Analytics</h3>
                <p className="text-xs text-gray-600">Detailed performance data</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-100">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Comprehensive</h3>
                <p className="text-xs text-gray-600">Wide range of topics</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-100">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Gamified</h3>
                <p className="text-xs text-gray-600">Engaging learning experience</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-12 text-center bg-purple-600 rounded-xl p-6 text-white shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Ready for the Full Experience?</h2>
            <p className="mb-6 text-purple-100 text-sm">
              Get unlimited access to thousands of quizzes, detailed analytics, and personalized learning paths
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors shadow"
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border border-white text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors"
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}