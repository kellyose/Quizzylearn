import axios from 'axios';

// Create axios instances
const mainAPI = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const aiAPI = axios.create({
  baseURL: import.meta.env.PROD ? '/ai' : 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
mainAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
mainAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for development
const mockQuizzes = [
  {
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

const mockUser = {
  _id: '1',
  name: 'Demo User',
  email: 'demo@quizzylearn.com',
  level: 5,
  xp: 1250,
  streak: 7,
  badges: [
    { name: 'Quick Learner', icon: '⚡' },
    { name: 'Perfect Score', icon: '🏆' },
  ]
};

// API Functions
export const authAPI = {
  register: async (data) => {
    console.log('Register:', data);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        token: 'demo-token-' + Date.now(),
        user: {
          ...mockUser,
          name: data.username,
          email: data.email
        }
      }
    };
  },

  login: async (credentials) => {
    console.log('Login:', credentials);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        token: 'demo-token-' + Date.now(),
        user: mockUser
      }
    };
  },

  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { data: { user: mockUser } };
  }
};

export const quizAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { data: mockQuizzes };
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const quiz = mockQuizzes.find(q => q._id === id) || mockQuizzes[0];
    return { data: quiz };
  },

  submit: async (id, answers) => {
    console.log('Submit quiz:', { id, answers });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate score
    const correctCount = answers.filter((ans, idx) => {
      const quiz = mockQuizzes.find(q => q._id === id) || mockQuizzes[0];
      const question = quiz.questions?.[idx];
      return question && ans === question.correctAnswer;
    }).length;
    
    const total = answers.length;
    const score = Math.round((correctCount / total) * 100);
    
    return {
      data: {
        success: true,
        score,
        correct: correctCount,
        total,
        attemptId: 'attempt-' + Date.now(),
        user: {
          score: mockUser.xp + (score * 10),
          level: score > 90 ? mockUser.level + 1 : mockUser.level,
          leveledUp: score > 90 ? {
            from: mockUser.level,
            to: mockUser.level + 1,
            message: `🎉 Level Up! You're now level ${mockUser.level + 1}!`
          } : null
        }
      }
    };
  },

  create: async (data) => {
    console.log('Create quiz:', data);
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      data: {
        ...data,
        _id: 'quiz-' + Date.now(),
        plays: 0,
        averageScore: 0
      }
    };
  }
};

export const topicAPI = {
  getTopics: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { data: ['Programming', 'Mathematics', 'History', 'Science', 'Geography', 'General Knowledge'] };
  },

  getQuizzesByTopic: async (topic) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const filtered = mockQuizzes.filter(q => q.topic === topic);
    return { data: filtered };
  }
};

export const leaderboardAPI = {
  getLeaderboard: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      data: [
        { _id: '1', username: 'QuizMaster', score: 15000, level: 25 },
        { _id: '2', username: 'Brainiac', score: 12500, level: 22 },
        { _id: '3', username: 'CodeWizard', score: 11000, level: 20 },
        { _id: '4', username: 'HistoryBuff', score: 9800, level: 18 },
        { _id: '5', username: 'MathGenius', score: 8500, level: 16 },
        { _id: '6', username: 'ScienceGeek', score: 7200, level: 14 },
        { _id: '7', username: 'Demo User', score: mockUser.xp, level: mockUser.level },
      ]
    };
  }
};

export const aiService = {
  generateQuestions: async (text, numQuestions = 5) => {
    console.log('Generating questions from:', text.substring(0, 100));
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI response
    return {
      data: Array.from({ length: numQuestions }, (_, i) => ({
        text: `Sample question ${i + 1} based on: "${text.substring(0, 50)}..."`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: Math.floor(Math.random() * 4),
        explanation: 'This is an AI-generated explanation.',
        difficulty: 'medium'
      }))
    };
  },

  analyzeText: async (text) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      data: {
        key_concepts: ['concept1', 'concept2', 'concept3'],
        readability_score: Math.floor(Math.random() * 30) + 70,
        estimated_time: Math.floor(text.length / 1000) * 5
      }
    };
  },

  healthCheck: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { status: 'healthy', service: 'AI Question Generator' } };
  }
};

export default mainAPI;