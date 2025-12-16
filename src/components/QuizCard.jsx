// src/components/QuizCard.jsx
import React from 'react';
import { Users, Clock, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuizCard({
  title,
  category,
  difficulty,
  questions,
  xp,
  participants,
  color = 'from-purple-500 to-blue-500',
}) {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-sm font-medium text-gray-500">{category}</span>
            <h3 className="text-xl font-bold mt-1 mb-2">{title}</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Target className="w-4 h-4 mr-2" />
            <span className="text-sm">{questions} questions</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">20 min</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{participants.toLocaleString()} played</span>
          </div>
          <div className="flex items-center text-orange-600 font-bold">
            <span>+{xp} XP</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 py-3 rounded-xl font-semibold flex items-center justify-center hover:from-purple-100 hover:to-blue-100 transition">
          Start Quiz
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
}