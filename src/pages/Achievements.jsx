// src/pages/Achievements.jsx (Complete working version)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Star,
  Zap,
  Target,
  Flame,
  Shield,
  Crown,
  Award,
  TrendingUp,
  Users,
  Clock,
  BookOpen,
  Brain,
  Gem,
  Rocket,
  Lock,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3
} from 'lucide-react';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [userLevel, setUserLevel] = useState(12);

  useEffect(() => {
    // Load achievements and stats
    loadAchievements();
    loadUserStats();
  }, []);

  const loadAchievements = () => {
    // Mock data - in production, fetch from API
    const allAchievements = [
      // Streak Achievements
      {
        id: 1,
        title: "First Steps",
        description: "Complete your first quiz",
        icon: <Zap className="w-6 h-6" />,
        type: "streak",
        tier: "bronze",
        progress: 100,
        required: 1,
        current: 1,
        unlocked: true,
        xp: 100,
        unlockedAt: "2024-01-15",
        color: "from-yellow-400 to-orange-400"
      },
      {
        id: 2,
        title: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: <Flame className="w-6 h-6" />,
        type: "streak",
        tier: "silver",
        progress: 85,
        required: 7,
        current: 6,
        unlocked: false,
        xp: 250,
        color: "from-gray-400 to-gray-300"
      },
      {
        id: 3,
        title: "Month Master",
        description: "Maintain a 30-day streak",
        icon: <Target className="w-6 h-6" />,
        type: "streak",
        tier: "gold",
        progress: 45,
        required: 30,
        current: 14,
        unlocked: false,
        xp: 500,
        color: "from-yellow-500 to-yellow-300"
      },

      // Quiz Count Achievements
      {
        id: 4,
        title: "Quiz Novice",
        description: "Complete 10 quizzes",
        icon: <BookOpen className="w-6 h-6" />,
        type: "quizzes",
        tier: "bronze",
        progress: 100,
        required: 10,
        current: 10,
        unlocked: true,
        xp: 150,
        unlockedAt: "2024-01-20",
        color: "from-blue-400 to-cyan-400"
      },
      {
        id: 5,
        title: "Quiz Enthusiast",
        description: "Complete 50 quizzes",
        icon: <Brain className="w-6 h-6" />,
        type: "quizzes",
        tier: "silver",
        progress: 62,
        required: 50,
        current: 31,
        unlocked: false,
        xp: 350,
        color: "from-purple-400 to-pink-400"
      },
      {
        id: 6,
        title: "Quiz Master",
        description: "Complete 100 quizzes",
        icon: <Crown className="w-6 h-6" />,
        type: "quizzes",
        tier: "gold",
        progress: 12,
        required: 100,
        current: 12,
        unlocked: false,
        xp: 750,
        color: "from-purple-500 to-pink-500"
      },

      // Accuracy Achievements
      {
        id: 7,
        title: "Sharp Shooter",
        description: "Score 90%+ on any quiz",
        icon: <Target className="w-6 h-6" />,
        type: "accuracy",
        tier: "bronze",
        progress: 100,
        required: 1,
        current: 1,
        unlocked: true,
        xp: 200,
        unlockedAt: "2024-01-18",
        color: "from-green-400 to-emerald-400"
      },
      {
        id: 8,
        title: "Precision Expert",
        description: "Score 95%+ on 5 quizzes",
        icon: <Zap className="w-6 h-6" />,
        type: "accuracy",
        tier: "silver",
        progress: 60,
        required: 5,
        current: 3,
        unlocked: false,
        xp: 400,
        color: "from-indigo-400 to-blue-400"
      },
      {
        id: 9,
        title: "Perfect Score",
        description: "Get 100% on any quiz",
        icon: <Star className="w-6 h-6" />,
        type: "accuracy",
        tier: "gold",
        progress: 0,
        required: 1,
        current: 0,
        unlocked: false,
        xp: 1000,
        color: "from-yellow-400 to-orange-400"
      },

      // Category Achievements
      {
        id: 10,
        title: "JavaScript Pro",
        description: "Complete 20 JavaScript quizzes",
        icon: <Brain className="w-6 h-6" />,
        type: "category",
        category: "JavaScript",
        tier: "silver",
        progress: 85,
        required: 20,
        current: 17,
        unlocked: false,
        xp: 300,
        color: "from-yellow-400 to-yellow-600"
      },
      {
        id: 11,
        title: "React Wizard",
        description: "Complete 15 React quizzes",
        icon: <Gem className="w-6 h-6" />,
        type: "category",
        category: "React",
        tier: "gold",
        progress: 40,
        required: 15,
        current: 6,
        unlocked: false,
        xp: 500,
        color: "from-cyan-400 to-blue-400"
      },
      {
        id: 12,
        title: "Algorithm Ace",
        description: "Complete 25 algorithm quizzes",
        icon: <TrendingUp className="w-6 h-6" />,
        type: "category",
        category: "Algorithms",
        tier: "gold",
        progress: 28,
        required: 25,
        current: 7,
        unlocked: false,
        xp: 600,
        color: "from-red-400 to-orange-400"
      },

      // Special Achievements
      {
        id: 13,
        title: "Speed Demon",
        description: "Complete a quiz in under 2 minutes",
        icon: <Zap className="w-6 h-6" />,
        type: "special",
        tier: "diamond",
        progress: 100,
        required: 1,
        current: 1,
        unlocked: true,
        xp: 300,
        unlockedAt: "2024-01-22",
        color: "from-cyan-400 to-blue-500"
      },
      {
        id: 14,
        title: "Night Owl",
        description: "Complete 5 quizzes after midnight",
        icon: <Clock className="w-6 h-6" />,
        type: "special",
        tier: "platinum",
        progress: 40,
        required: 5,
        current: 2,
        unlocked: false,
        xp: 450,
        color: "from-purple-400 to-indigo-500"
      },
      {
        id: 15,
        title: "Social Butterfly",
        description: "Invite 3 friends who complete a quiz",
        icon: <Users className="w-6 h-6" />,
        type: "social",
        tier: "gold",
        progress: 0,
        required: 3,
        current: 0,
        unlocked: false,
        xp: 400,
        color: "from-pink-400 to-rose-500"
      },
    ];

    setAchievements(allAchievements);
  };

  const loadUserStats = () => {
    const userStats = {
      totalQuizzes: 31,
      totalXP: 2450,
      averageScore: 87,
      currentStreak: 14,
      bestStreak: 21,
      totalTimeSpent: "45h 22m",
      achievementsUnlocked: 4,
      achievementsTotal: 15,
      level: 12,
      nextLevelXP: 3000,
      currentLevelXP: 2450,
      rank: "Explorer",
      badges: 8
    };

    setStats(userStats);
  };

  const filters = [
    { id: 'all', label: 'All Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'unlocked', label: 'Unlocked', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'locked', label: 'Locked', icon: <Lock className="w-4 h-4" /> },
    { id: 'streak', label: 'Streak', icon: <Flame className="w-4 h-4" /> },
    { id: 'quizzes', label: 'Quizzes', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'accuracy', label: 'Accuracy', icon: <Target className="w-4 h-4" /> },
    { id: 'special', label: 'Special', icon: <Star className="w-4 h-4" /> },
  ];

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unlocked') return achievement.unlocked;
    if (selectedFilter === 'locked') return !achievement.unlocked;
    return achievement.type === selectedFilter;
  });

  const getTierColor = (tier) => {
    switch(tier) {
      case 'bronze': return 'text-yellow-700 bg-yellow-100';
      case 'silver': return 'text-gray-700 bg-gray-100';
      case 'gold': return 'text-yellow-600 bg-yellow-50';
      case 'platinum': return 'text-cyan-700 bg-cyan-100';
      case 'diamond': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTierIcon = (tier) => {
    switch(tier) {
      case 'bronze': return '🥉';
      case 'silver': return '🥈';
      case 'gold': return '🥇';
      case 'platinum': return '💎';
      case 'diamond': return '🔷';
      default: return '🏆';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Achievements</h1>
            <p className="opacity-90">Unlock badges, earn XP, and climb the ranks</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold mb-2">{stats.achievementsUnlocked}/{stats.achievementsTotal}</div>
            <p className="opacity-90">Achievements Unlocked</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mr-4">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Level</p>
              <p className="text-2xl font-bold">Level {stats.level}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{stats.currentLevelXP} XP</span>
              <span>{stats.nextLevelXP} XP</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-400"
                style={{ width: `${(stats.currentLevelXP / stats.nextLevelXP) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.nextLevelXP - stats.currentLevelXP} XP to next level
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl flex items-center justify-center mr-4">
              <Flame className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold">{stats.currentStreak} days</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">Best: {stats.bestStreak} days</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-50 rounded-xl flex items-center justify-center mr-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold">{stats.averageScore}%</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">Across {stats.totalQuizzes} quizzes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mr-4">
              <Rocket className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total XP</p>
              <p className="text-2xl font-bold">{stats.totalXP.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">Rank: {stats.rank}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Browse Achievements</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter by:</span>
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {filters.map(filter => (
                <option key={filter.id} value={filter.id}>{filter.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Achievement Grid */}
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No achievements found</h3>
            <p className="text-gray-600">Try selecting a different filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white border-2 rounded-2xl p-6 hover:shadow-lg transition ${
                  achievement.unlocked 
                    ? 'border-purple-200 hover:border-purple-300' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${achievement.color}`}>
                      <div className="text-white">
                        {achievement.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{achievement.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTierColor(achievement.tier)}`}>
                        {getTierIcon(achievement.tier)} {achievement.tier.charAt(0).toUpperCase() + achievement.tier.slice(1)}
                      </span>
                    </div>
                  </div>
                  {achievement.unlocked ? (
                    <div className="text-green-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <Lock className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{achievement.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">
                      {achievement.unlocked ? 'Unlocked' : 'Progress'}
                    </span>
                    <span className="font-medium">
                      {achievement.current}/{achievement.required}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                          : 'bg-gradient-to-r from-purple-500 to-blue-400'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">+{achievement.xp} XP</span>
                  </div>
                  
                  {achievement.unlocked ? (
                    <div className="text-sm text-gray-500">
                      Unlocked {achievement.unlockedAt}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      {achievement.required - achievement.current} more to go
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Badge Collection */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Badge Collection</h2>
            <p className="text-gray-600">Collect special badges for unique accomplishments</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{stats.badges} badges</div>
            <p className="text-sm text-gray-600">Collected</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Badge 1 */}
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold">Streak Starter</h4>
            <p className="text-xs text-gray-500">7-day streak</p>
            <div className="mt-2">
              <span className="text-xs text-green-600">✓ Unlocked</span>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold">Quick Learner</h4>
            <p className="text-xs text-gray-500">5 quizzes in a day</p>
            <div className="mt-2">
              <span className="text-xs text-green-600">✓ Unlocked</span>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold">Accuracy Pro</h4>
            <p className="text-xs text-gray-500">95%+ score</p>
            <div className="mt-2">
              <span className="text-xs text-green-600">✓ Unlocked</span>
            </div>
          </div>

          {/* Badge 4 */}
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold">Night Owl</h4>
            <p className="text-xs text-gray-500">Quiz after midnight</p>
            <div className="mt-2">
              <span className="text-xs text-gray-500">🔒 Locked</span>
            </div>
          </div>

          {/* Badge 5 */}
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold">Speed Demon</h4>
            <p className="text-xs text-gray-500">Under 1 minute</p>
            <div className="mt-2">
              <span className="text-xs text-green-600">✓ Unlocked</span>
            </div>
          </div>

          {/* Badge 6 */}
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold">Quiz Master</h4>
            <p className="text-xs text-gray-500">100 quizzes</p>
            <div className="mt-2">
              <span className="text-xs text-gray-500">🔒 Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Unlocks */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Recently Unlocked</h2>
        <div className="space-y-4">
          {achievements
            .filter(a => a.unlocked)
            .slice(0, 3)
            .map(achievement => (
              <div key={achievement.id} className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${achievement.color} mr-4`}>
                  <div className="text-white">
                    {achievement.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">+{achievement.xp} XP</div>
                  <div className="text-sm text-gray-500">{achievement.unlockedAt}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Level Up Progress</h3>
            <p className="opacity-90">You're making great progress! Keep learning to unlock new features.</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">Level {stats.level}</div>
            <div className="text-sm opacity-90">{stats.rank}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>{stats.currentLevelXP} XP</span>
            <span>{stats.nextLevelXP} XP</span>
          </div>
          <div className="h-3 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
              style={{ width: `${(stats.currentLevelXP / stats.nextLevelXP) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm opacity-90">Next Level Rewards:</p>
              <ul className="text-sm opacity-90 mt-1 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Unlock advanced quizzes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Get +10% XP bonus
                </li>
              </ul>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition self-end">
              View All Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}