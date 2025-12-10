import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const Question = ({ question, index, onAnswer, showResult = false, userAnswer = null }) => {
  const [selectedOption, setSelectedOption] = useState(userAnswer);

  const handleSelect = (optionIndex) => {
    if (!showResult) {
      setSelectedOption(optionIndex);
      onAnswer(index, optionIndex);
    }
  };

  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card mb-6"
    >
      <div className="p-6">
        {/* Question Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Question {index + 1}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <HelpCircle className="w-4 h-4 mr-1" />
              {question.type === 'multiple-choice' ? 'Multiple Choice' : 'True/False'}
            </div>
          </div>
          
          {showResult && (
            <div className={`flex items-center px-3 py-1 rounded-full ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isCorrect ? (
                <CheckCircle className="w-4 h-4 mr-1" />
              ) : (
                <XCircle className="w-4 h-4 mr-1" />
              )}
              <span className="font-medium">{isCorrect ? 'Correct' : 'Incorrect'}</span>
            </div>
          )}
        </div>
        
        {/* Question Text */}
        <h3 className="text-xl font-semibold text-gray-900 mb-8 leading-relaxed">
          {question.text}
        </h3>
        
        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            let optionStyle = 'cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ';
            
            if (showResult) {
              if (i === question.correctAnswer) {
                optionStyle += 'bg-green-50 border-green-500 shadow-green-100 shadow-sm';
              } else if (i === userAnswer && !isCorrect) {
                optionStyle += 'bg-red-50 border-red-500 shadow-red-100 shadow-sm';
              } else {
                optionStyle += 'bg-gray-50 border-gray-200';
              }
            } else if (selectedOption === i) {
              optionStyle += 'bg-primary/10 border-primary shadow-primary/20 shadow-sm';
            } else {
              optionStyle += 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300';
            }
            
            return (
              <div
                key={i}
                className={optionStyle}
                onClick={() => handleSelect(i)}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3 mt-1 ${
                    (showResult && i === question.correctAnswer) 
                      ? 'bg-green-500 text-white' 
                      : (showResult && i === userAnswer && !isCorrect)
                      ? 'bg-red-500 text-white'
                      : selectedOption === i
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">{option}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Explanation (if showResult) */}
        {showResult && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
          >
            <p className="text-sm font-semibold text-blue-800 mb-1">Explanation</p>
            <p className="text-blue-700">{question.explanation}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Question;