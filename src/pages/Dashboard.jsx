import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Brain, Clock, Target, Zap, Sparkles, BarChart } from 'lucide-react';
import QuizCard from '../components/QuizCard';
import { quizAPI } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await quizAPI.getAll();
      setQuizzes(response.data || []);
    } catch (error) {
      // Mock data for development
      const mockQuizzes = [
        {
          id: '1',
          _id: '1',
          title: 'JavaScript Fundamentals',
          topic: 'Programming',
          description: 'Master the basics of JavaScript with this comprehensive quiz',
          timeLimit: 15,
          plays: 1245,
          averageScore: 72,
          difficulty: 'medium',
          questions: []
        },
        {
          id: '2',
          _id: '2',
          title: 'World History Quiz',
          topic: 'History',
          description: 'Test your knowledge of important historical events',
          timeLimit: 20,
          plays: 892,
          averageScore: 65,
          difficulty: 'hard',
          questions: []
        },
        {
          id: '3',
          _id: '3',
          title: 'Basic Mathematics',
          topic: 'Mathematics',
          description: 'Practice your math skills with fun problems',
          timeLimit: 10,
          plays: 2156,
          averageScore: 85,
          difficulty: 'easy',
          questions: []
        },
      ];
      setQuizzes(mockQuizzes);
      toast.success('Loaded demo quizzes!');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Trophy, label: 'Current Level', value: user?.level || 1, color: 'from-yellow-400 to-amber-500' },
    { icon: TrendingUp, label: 'Total XP', value: user?.xp || 0, color: 'from-green-400 to-emerald-500' },
    { icon: Brain, label: 'Quizzes Taken', value: '12', color: 'from-blue-400 to-cyan-500' },
    { icon: Target, label: 'Accuracy', value: '78%', color: 'from-purple-400 to-pink-500' },
  ];

  const recentAchievements = [
    { title: 'Quick Learner', description: 'Complete 5 quizzes in one day', icon: Zap, date: 'Today' },
    { title: 'Perfect Score', description: 'Score 100% on any quiz', icon: Trophy, date: '2 days ago' },
    { title: 'Consistent', description: '7-day streak', icon: TrendingUp, date: '1 week ago' },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'Learner'}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to continue your learning journey? Here's what's new today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recommended Quizzes */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
            <Link to="/topics" className="text-primary hover:underline font-medium">
              View all →
            </Link>
          </div>

          {quizzes.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No quizzes available</h3>
              <p className="text-gray-600 mb-6">Check back later for new quizzes!</p>
              <Link to="/ai-generator" className="btn-primary inline-flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Your Own Quiz
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz, index) => (
                <QuizCard key={quiz.id || quiz._id} quiz={quiz} index={index} />
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/ai-generator"
              className="glass-card p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                    AI Quiz Generator
                  </h3>
                  <p className="text-sm text-gray-600">Create custom quizzes with AI</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/leaderboard"
              className="glass-card p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                    Leaderboard
                  </h3>
                  <p className="text-sm text-gray-600">Compete with other learners</p>
                </div>
              </div>
            </Link>
            
            <div className="glass-card p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Daily Goal</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-3/4" />
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div>
          {/* Daily Streak */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">🔥 Daily Streak</h3>
              <span className="text-2xl font-bold text-primary">7 days</span>
            </div>
            <div className="flex space-x-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i < 7 ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Keep going! 3 more days for a new badge.
            </p>
          </div>

          {/* Recent Achievements */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">🏆 Recent Achievements</h3>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <achievement.icon className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{achievement.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-gray-900 mb-4">📊 Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Score</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Time Spent</span>
                <span className="font-semibold">24h 36m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Questions Answered</span>
                <span className="font-semibold">456</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Correct Answers</span>
                <span className="font-semibold">89%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;