import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Users, Clock, BookOpen } from 'lucide-react';
import QuizCard from '../components/QuizCard';

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'programming', label: 'Programming' },
    { id: 'science', label: 'Science' },
    { id: 'math', label: 'Mathematics' },
    { id: 'history', label: 'History' },
    { id: 'language', label: 'Languages' },
    { id: 'business', label: 'Business' },
  ];

  const trendingQuizzes = [
    {
      id: 1,
      title: 'React Hooks Mastery',
      category: 'Programming',
      difficulty: 'Medium',
      questions: 25,
      xp: 350,
      participants: 2345,
      trending: true,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Quantum Physics Basics',
      category: 'Science',
      difficulty: 'Hard',
      questions: 20,
      xp: 400,
      participants: 1567,
      trending: true,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      title: 'Spanish Vocabulary 2024',
      category: 'Languages',
      difficulty: 'Easy',
      questions: 30,
      xp: 250,
      participants: 3124,
      trending: true,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const allQuizzes = [
    ...trendingQuizzes,
    {
      id: 4,
      title: 'Calculus Fundamentals',
      category: 'Mathematics',
      difficulty: 'Medium',
      questions: 18,
      xp: 280,
      participants: 892,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 5,
      title: 'World History Timeline',
      category: 'History',
      difficulty: 'Medium',
      questions: 22,
      xp: 320,
      participants: 1256,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 6,
      title: 'Startup Finance 101',
      category: 'Business',
      difficulty: 'Easy',
      questions: 15,
      xp: 200,
      participants: 743,
      color: 'from-teal-500 to-green-500',
    },
  ];

  const filteredQuizzes = allQuizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || quiz.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Discover New Quizzes</h1>
        <p className="text-lg opacity-90 mb-6">Explore thousands of quizzes across all subjects and levels</p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search quizzes by topic, subject, or keyword..."
            className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Browse Categories</h2>
          <button className="flex items-center text-sm text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Quizzes */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-orange-500 mr-3" />
          <h2 className="text-xl font-bold">Trending Now</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {trendingQuizzes.map((quiz) => (
            <div key={quiz.id} className="relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  🔥 TRENDING
                </span>
              </div>
              <QuizCard {...quiz} />
            </div>
          ))}
        </div>
      </div>

      {/* All Quizzes */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2">All Quizzes</h2>
            <p className="text-gray-600">Showing {filteredQuizzes.length} quizzes</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Sort by: Popularity</option>
              <option>Newest</option>
              <option>Highest XP</option>
              <option>Difficulty</option>
            </select>
          </div>
        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No quizzes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Learners</p>
              <p className="text-2xl font-bold">50,234+</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Quizzes Completed</p>
              <p className="text-2xl font-bold">1.2M+</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Improvement</p>
              <p className="text-2xl font-bold">42%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}