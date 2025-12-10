import { Link } from 'react-router-dom';
import { Play, Clock, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizCard = ({ quiz, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6">
        {/* Topic Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {quiz.topic}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {quiz.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-2">
          {quiz.description || 'Test your knowledge with this challenging quiz!'}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{quiz.timeLimit || 10}m</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{quiz.plays || 0}</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{quiz.averageScore || 0}%</span>
            </div>
          </div>
        </div>
        
        {/* Difficulty Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Difficulty</span>
            <span className={`text-sm font-bold ${
              quiz.difficulty === 'easy' ? 'text-green-600' :
              quiz.difficulty === 'medium' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {quiz.difficulty?.toUpperCase() || 'MEDIUM'}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                quiz.difficulty === 'easy' ? 'bg-green-500 w-1/3' :
                quiz.difficulty === 'medium' ? 'bg-yellow-500 w-2/3' : 'bg-red-500 w-full'
              }`}
            />
          </div>
        </div>
        
        {/* Action Button */}
        <Link
          to={`/quiz/${quiz._id || quiz.id}`}
          className="btn-primary w-full flex items-center justify-center group"
        >
          <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Start Quiz
        </Link>
      </div>
    </motion.div>
  );
};

export default QuizCard;