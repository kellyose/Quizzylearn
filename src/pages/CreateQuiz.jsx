// src/pages/CreateQuiz.jsx (Updated imports)
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  Sparkles,
  Brain,
  Zap,
  Target,
  BookOpen
} from 'lucide-react';
import { generateQuizWithAI } from '../services/openai'; // Changed from quizGenerator

export default function CreateQuiz() {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    difficulty: 'Medium',
    questions: [],
    isPublic: true,
    timeLimit: 20,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const categories = [
    'Programming', 'Mathematics', 'Science', 'History', 
    'Languages', 'Business', 'Art', 'Music', 'Sports'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];

  const handleGenerateAI = async () => {
    if (!quizData.title.trim()) {
      alert('Please enter a quiz topic first!');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedQuestions = await generateQuizWithAI(
        quizData.title,
        quizData.difficulty,
        5
      );
      
      setQuizData(prev => ({
        ...prev,
        questions: [...prev.questions, ...generatedQuestions.map((q, i) => ({
          ...q,
          id: Date.now() + i,
          generatedByAI: true
        }))]
      }));
    } catch (error) {
      console.error('Failed to generate questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      explanation: '',
    };
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
    setEditIndex(quizData.questions.length);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    
    if (field.startsWith('options.')) {
      const optionIndex = parseInt(field.split('.')[1]);
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    
    setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const removeQuestion = (index) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const saveQuiz = () => {
    // Validate quiz
    if (!quizData.title.trim()) {
      alert('Please enter a quiz title');
      return;
    }
    
    if (quizData.questions.length === 0) {
      alert('Please add at least one question');
      return;
    }
    
    // Save to localStorage or send to API
    const quizzes = JSON.parse(localStorage.getItem('userQuizzes') || '[]');
    quizzes.push({
      ...quizData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      createdBy: JSON.parse(localStorage.getItem('user')).name,
    });
    localStorage.setItem('userQuizzes', JSON.stringify(quizzes));
    
    alert('Quiz saved successfully!');
    // Reset form
    setQuizData({
      title: '',
      description: '',
      category: 'Programming',
      difficulty: 'Medium',
      questions: [],
      isPublic: true,
      timeLimit: 20,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Quiz</h1>
        <p className="text-gray-600">Design engaging quizzes with AI assistance</p>
      </div>

      {/* Quiz Settings */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Title *
          </label>
          <input
            type="text"
            value={quizData.title}
            onChange={(e) => setQuizData({...quizData, title: e.target.value})}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
            placeholder="e.g., JavaScript Fundamentals"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={quizData.category}
            onChange={(e) => setQuizData({...quizData, category: e.target.value})}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            value={quizData.difficulty}
            onChange={(e) => setQuizData({...quizData, difficulty: e.target.value})}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Limit (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={quizData.timeLimit}
            onChange={(e) => setQuizData({...quizData, timeLimit: parseInt(e.target.value)})}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
          />
        </div>
      </div>

      {/* AI Generation */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <div>
              <h3 className="font-bold">AI Quiz Generator</h3>
              <p className="text-sm text-gray-600">Let AI create questions for you</p>
            </div>
          </div>
          <button
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center hover:opacity-90 transition disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate with AI
              </>
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium">Quick Generation</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium">Difficulty Based</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">Educational</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm font-medium">Explanations</p>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Questions ({quizData.questions.length})</h3>
          <button
            onClick={addQuestion}
            className="flex items-center text-purple-600 font-semibold hover:text-purple-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Question
          </button>
        </div>

        {quizData.questions.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">No questions yet</h4>
            <p className="text-gray-600 mb-6">Add questions manually or generate with AI</p>
            <div className="space-x-4">
              <button
                onClick={addQuestion}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Add Manually
              </button>
              <button
                onClick={handleGenerateAI}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
              >
                Generate with AI
              </button>
            </div>
          </div>
        ) : (
          quizData.questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-lg">Q{index + 1}</span>
                  {q.generatedByAI && (
                    <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs px-3 py-1 rounded-full flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Generated
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditIndex(index === editIndex ? -1 : index)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => removeQuestion(index)}
                    className="p-2 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {editIndex === index ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
                    placeholder="Enter your question"
                  />
                  
                  <div className="space-y-3">
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`correct-${index}`}
                          checked={q.correct === optIndex}
                          onChange={() => updateQuestion(index, 'correct', optIndex)}
                          className="text-purple-600"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateQuestion(index, `options.${optIndex}`, e.target.value)}
                          className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
                          placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <textarea
                    value={q.explanation}
                    onChange={(e) => updateQuestion(index, 'explanation', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
                    placeholder="Explanation (optional)"
                    rows="3"
                  />
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium mb-4">{q.question}</p>
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-xl ${
                          optIndex === q.correct
                            ? 'bg-green-50 border-2 border-green-200'
                            : 'bg-gray-50 border-2 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                            optIndex === q.correct
                              ? 'bg-green-100 text-green-800 font-bold'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
                      <p className="text-sm text-blue-800">{q.explanation}</p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Save Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={quizData.isPublic}
              onChange={(e) => setQuizData({...quizData, isPublic: e.target.checked})}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="ml-2 text-gray-700">Make quiz public</span>
          </label>
        </div>
        
        <div className="flex space-x-4">
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
            Preview
          </button>
          <button
            onClick={saveQuiz}
            disabled={quizData.questions.length === 0}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold flex items-center hover:opacity-90 transition disabled:opacity-50"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
}