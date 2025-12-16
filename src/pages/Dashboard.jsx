import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Target, Award, Zap, Users, BookOpen,
  TrendingUp, LogOut, Play, ChevronRight, Star, Brain, Sparkles, 
  Lightbulb, Flame, Crown, Activity, AlertCircle, Menu, X, Home
} from 'lucide-react';
import { quizAPI, scoreAPI, userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Add these helper functions at the top
const calculateUserStats = (userData, scores = []) => {
  if (!userData) return null;
  
  return {
    totalQuizzes: scores.length,
    averageScore: scores.length > 0 
      ? scores.reduce((sum, score) => sum + (score.percentage || 0), 0) / scores.length 
      : 0,
    totalXP: userData.xp || 500,
    level: userData.level || 1,
    streak: userData.streak || 0,
    rank: userData.rank || 'Beginner'
  };
};

const getAchievements = (stats, userData) => {
  const achievements = [];
  
  if (stats) {
    if (stats.totalQuizzes >= 1) {
      achievements.push({
        id: 1,
        name: 'First Quiz',
        description: 'Completed your first quiz',
        icon: '🏁',
        unlocked: true
      });
    }
    
    if (stats.totalXP >= 1000) {
      achievements.push({
        id: 2,
        name: 'XP Master',
        description: 'Earned 1000 XP',
        icon: '⭐',
        unlocked: true
      });
    }
    
    if (stats.streak >= 3) {
      achievements.push({
        id: 3,
        name: 'Streak Starter',
        description: '3-day learning streak',
        icon: '🔥',
        unlocked: true
      });
    }
  }
  
  if (achievements.length === 0) {
    achievements.push({
      id: 0,
      name: 'Welcome!',
      description: 'Start your first quiz to unlock achievements',
      icon: '🎯',
      unlocked: false
    });
  }
  
  return achievements;
};

const getWeeklyProgress = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    xp: Math.floor(Math.random() * 100) + 20,
    quizzes: Math.floor(Math.random() * 3)
  }));
};

const getMockQuizzes = () => [
  { id: '1', title: 'JavaScript Basics', category: 'Programming', difficulty: 'Easy', questionCount: 10 },
  { id: '2', title: 'React Fundamentals', category: 'Programming', difficulty: 'Medium', questionCount: 15 },
  { id: '3', title: 'General Knowledge', category: 'Trivia', difficulty: 'Mixed', questionCount: 20 }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout: authLogout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    user: user || null,
    stats: null,
    recentActivity: [],
    recommendedQuizzes: [],
    achievements: [],
    weeklyProgress: []
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = user.id || user._id;

        const [quizzesResponse, scoresResponse, userResponse] = await Promise.allSettled([
          quizAPI.getQuizzes().catch(() => ({ data: [] })),
          scoreAPI.getUserScores(userId).catch(() => ({ data: [] })),
          userAPI.getUser(userId).catch(() => ({ data: user }))
        ]);

        const recommendedQuizzes = quizzesResponse.status === 'fulfilled' && Array.isArray(quizzesResponse.value?.data)
          ? quizzesResponse.value.data.slice(0, 3) 
          : getMockQuizzes();

        const scores = scoresResponse.status === 'fulfilled' && Array.isArray(scoresResponse.value?.data)
          ? scoresResponse.value.data 
          : [];

        const userData = userResponse.status === 'fulfilled' && userResponse.value?.data
          ? userResponse.value.data 
          : user;

        const userStats = calculateUserStats(userData, scores);

        const recentActivity = scores.map((score, index) => ({
          id: index,
          type: 'quiz_completed',
          title: `Completed ${score.quiz?.title || 'Quiz'}`,
          description: `Scored ${Math.round(score.percentage || 0)}%`,
          xp: score.xpEarned || 50,
          timestamp: score.completedAt || new Date(Date.now() - index * 86400000)
        }));

        if (recentActivity.length === 0) {
          recentActivity.push({
            id: 1,
            type: 'account_created',
            title: 'Welcome to QuizzyLearn',
            description: 'Start your first quiz to earn XP!',
            xp: 500,
            timestamp: new Date()
          });
        }

        setDashboardData({
          user: userData,
          stats: userStats,
          recentActivity,
          recommendedQuizzes,
          achievements: getAchievements(userStats, userData),
          weeklyProgress: getWeeklyProgress()
        });

      } catch (err) {
        console.error('Dashboard loading error:', err);
        setError('Failed to load dashboard data. Using demo data instead.');
        
        setDashboardData({
          user,
          stats: calculateUserStats(user, []),
          recentActivity: [{
            id: 1,
            type: 'account_created',
            title: 'Welcome to QuizzyLearn',
            description: 'Start your first quiz to earn XP!',
            xp: 500,
            timestamp: new Date()
          }],
          recommendedQuizzes: getMockQuizzes(),
          achievements: getAchievements(calculateUserStats(user, []), user),
          weeklyProgress: getWeeklyProgress()
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user, navigate]);

  const handleLogout = () => {
    authLogout();
    navigate('/login');
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
    setMobileMenuOpen(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setMobileMenuOpen(false);
  };

  const navigateTo = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );

  // Mobile Navigation Menu
  const MobileNav = () => (
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}>
      <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <button
            onClick={() => navigateTo('/dashboard')}
            className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-100 rounded-lg"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => navigateTo('/discover')}
            className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-100 rounded-lg"
          >
            <BookOpen className="w-5 h-5" />
            Discover Quizzes
          </button>
          <button
            onClick={() => navigateTo('/leaderboard')}
            className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-100 rounded-lg"
          >
            <Trophy className="w-5 h-5" />
            Leaderboard
          </button>
          <button
            onClick={() => navigateTo('/achievements')}
            className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-100 rounded-lg"
          >
            <Award className="w-5 h-5" />
            Achievements
          </button>
          <button
            onClick={() => navigateTo('/create-quiz')}
            className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-100 rounded-lg"
          >
            <Sparkles className="w-5 h-5" />
            Create Quiz
          </button>
          <div className="pt-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      {mobileMenuOpen && <MobileNav />}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">QuizzyLearn</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/discover')}
                className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium"
              >
                Discover
              </button>
              <button
                onClick={() => navigate('/leaderboard')}
                className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium"
              >
                Leaderboard
              </button>
              <button
                onClick={() => navigate('/achievements')}
                className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium"
              >
                Achievements
              </button>
              <button
                onClick={() => navigate('/create-quiz')}
                className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium"
              >
                Create Quiz
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">
                    {dashboardData.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{dashboardData.user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">Level {dashboardData.stats?.level || 1}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, {dashboardData.user?.name || 'Learner'}! 👋
              </h1>
              <p className="text-gray-600 mt-1">Continue your learning journey</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-bold">{dashboardData.stats?.totalXP || 500}</span>
                <span className="text-gray-500 text-sm">XP</span>
              </div>
              <button
                onClick={handleLogout}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-yellow-800 font-medium">{error}</p>
              <p className="text-yellow-700 text-sm">Some features may be limited</p>
            </div>
          </div>
        )}

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-500">Level</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">{dashboardData.stats?.level || 1}</h3>
            <p className="text-gray-600 text-xs sm:text-sm truncate">Keep learning to level up!</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-500">Total XP</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">{dashboardData.stats?.totalXP || 500}</h3>
            <p className="text-gray-600 text-xs sm:text-sm truncate">{dashboardData.stats?.rank || 'Beginner'}</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-500">Quizzes</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">{dashboardData.stats?.totalQuizzes || 0}</h3>
            <p className="text-gray-600 text-xs sm:text-sm truncate">Completed</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-500">Avg Score</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {dashboardData.stats?.averageScore ? Math.round(dashboardData.stats.averageScore) : 0}%
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm truncate">Your performance</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recommended Quizzes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <h2 className="text-lg sm:text-xl font-bold">Recommended Quizzes</h2>
                <button 
                  onClick={() => navigate('/discover')}
                  className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 text-sm sm:text-base self-start sm:self-center"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {dashboardData.recommendedQuizzes.map((quiz) => (
                  <div key={quiz.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg mb-1">{quiz.title}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded">{quiz.category}</span>
                          <span className="text-xs text-gray-600">{quiz.difficulty}</span>
                          <span className="text-xs text-gray-600">{quiz.questionCount} questions</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleStartQuiz(quiz.id)}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm sm:text-base w-full sm:w-auto"
                      >
                        <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {activity.type === 'quiz_completed' ? (
                        <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                      ) : (
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{activity.title}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">+{activity.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-6">Achievements</h2>
              <div className="space-y-3">
                {dashboardData.achievements.map((achievement) => (
                  <div key={achievement.id} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                    <span className="text-xl sm:text-2xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{achievement.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats for Mobile */}
        <div className="mt-8 lg:hidden">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/discover')}
                className="flex flex-col items-center justify-center p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100"
              >
                <BookOpen className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Discover</span>
              </button>
              <button
                onClick={() => navigate('/leaderboard')}
                className="flex flex-col items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <Trophy className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Leaderboard</span>
              </button>
              <button
                onClick={() => navigate('/achievements')}
                className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
              >
                <Award className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Achievements</span>
              </button>
              <button
                onClick={() => navigate('/create-quiz')}
                className="flex flex-col items-center justify-center p-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100"
              >
                <Sparkles className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Create</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
