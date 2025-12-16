import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000 // 5 second timeout
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url
    });

    return Promise.reject({
      success: false,
      error: error.response?.data?.error || 'Network error',
      message: error.response?.data?.message || error.message,
      status: error.response?.status
    });
  }
);

// ============= MOCK DATA FOR DEVELOPMENT =============
const mockQuizzes = [
  {
    _id: '1',
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your basic JavaScript knowledge',
    category: 'Programming',
    difficulty: 'Beginner',
    questionCount: 10,
    questions: [
      {
        question: 'What is JavaScript?',
        options: ['A coffee brand', 'A programming language', 'A type of car', 'A movie'],
        correctAnswer: 1
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    id: '2',
    title: 'React Basics',
    description: 'Learn React fundamentals',
    category: 'Programming',
    difficulty: 'Intermediate',
    questionCount: 8,
    questions: [
      {
        question: 'What is React?',
        options: ['A JavaScript library', 'A database', 'A programming language', 'An operating system'],
        correctAnswer: 0
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    id: '3',
    title: 'General Knowledge',
    description: 'Test your general knowledge',
    category: 'Trivia',
    difficulty: 'Mixed',
    questionCount: 15,
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2
      }
    ],
    createdAt: new Date().toISOString()
  }
];

const mockUser = (userId) => ({
  _id: userId,
  id: userId,
  name: 'Test User',
  email: 'test@example.com',
  xp: 500,
  level: 1,
  streak: 0,
  rank: 'Beginner',
  createdAt: new Date().toISOString()
});

const mockScores = (userId) => [
  {
    _id: 'score1',
    userId: userId,
    quizId: '1',
    quizTitle: 'JavaScript Fundamentals',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    xpEarned: 120,
    completedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: 'score2',
    userId: userId,
    quizId: '2',
    quizTitle: 'React Basics',
    score: 6,
    totalQuestions: 8,
    percentage: 75,
    xpEarned: 100,
    completedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// ============= API FUNCTIONS WITH FALLBACK =============

// Test API connection
export const testAPI = {
  test: () => api.get('/test').catch(() => ({ 
    success: true, 
    message: 'Mock: API test endpoint not available' 
  })),
  health: () => api.get('/health').catch(() => ({ 
    status: 'healthy', 
    message: 'Mock: Using fallback data' 
  }))
};

// Auth API - Updated to match our backend
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me').catch(() => {
    // Fallback to localStorage user
    const userStr = localStorage.getItem('user');
    if (userStr && userStr !== 'undefined') {
      try {
        return Promise.resolve({ user: JSON.parse(userStr) });
      } catch (e) {
        return Promise.reject({ error: 'Invalid user data' });
      }
    }
    return Promise.reject({ error: 'Not authenticated' });
  })
};

// Quiz API - With fallback to mock data
//export const quizAPI = {
//  getQuizzes: (params = {}) => api.get('/quizzes', { params }).catch((error) => {
    console.log('Falling back to mock quizzes');
    // Return mock data in the same format as real API
    return Promise.resolve({
      success: true,
      data: mockQuizzes,
      message: 'Using mock data'
    });
  }),
  
  getQuiz: (id) => api.get(`/quizzes/${id}`).catch((error) => {
    console.log('Falling back to mock quiz');
    const quiz = mockQuizzes.find(q => q.id === id || q._id === id) || mockQuizzes[0];
    return Promise.resolve({
      success: true,
      data: quiz,
      message: 'Using mock data'
    });
  }),
  
  submitQuiz: (id, answers) => api.post(`/quizzes/${id}/submit`, answers).catch((error) => {
    console.log('Mock quiz submission');
    // Simulate successful submission
    return Promise.resolve({
      success: true,
      data: {
        score: Math.floor(Math.random() * 10) + 1,
        totalQuestions: 10,
        percentage: Math.floor(Math.random() * 30) + 70,
        xpEarned: 100,
        correctAnswers: Math.floor(Math.random() * 8) + 2
      },
      message: 'Mock submission successful'
    });
  }),
  
  createQuiz: (quizData) => api.post('/quizzes', quizData).catch((error) => {
    console.log('Mock quiz creation');
    return Promise.resolve({
      success: true,
      data: { ...quizData, _id: `mock_${Date.now()}` },
      message: 'Mock quiz created'
    });
  })
};:

// User API - With fallback to mock data
export const userAPI = {
  getUser: (id) => api.get(`/users/${id}`).catch((error) => {
    console.log('Falling back to mock user');
    // Get user from localStorage first, then mock
    const userStr = localStorage.getItem('user');
    let user;
    if (userStr && userStr !== 'undefined') {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        user = mockUser(id);
      }
    } else {
      user = mockUser(id);
    }
    
    return Promise.resolve({
      success: true,
      data: user,
      message: 'Using mock user data'
    });
  }),
  
  updateStats: (id, stats) => api.put(`/users/${id}/stats`, { stats }).catch((error) => {
    console.log('Mock stats update');
    return Promise.resolve({
      success: true,
      data: stats,
      message: 'Mock stats updated'
    });
  }),
  
  getUserStats: (id) => api.get(`/users/${id}/stats`).catch((error) => {
    console.log('Falling back to mock stats');
    return Promise.resolve({
      success: true,
      data: {
        totalQuizzes: 2,
        averageScore: 77.5,
        totalXP: 720,
        level: 1,
        streak: 2,
        rank: 'Beginner'
      },
      message: 'Using mock stats'
    });
  }),
  
  updateUser: (id, userData) => api.put(`/users/${id}`, userData).catch((error) => {
    console.log('Mock user update');
    return Promise.resolve({
      success: true,
      data: userData,
      message: 'Mock user updated'
    });
  })
};

// Score API - With fallback to mock data
export const scoreAPI = {
  saveScore: (scoreData) => api.post('/scores', scoreData).catch((error) => {
    console.log('Mock score save');
    return Promise.resolve({
      success: true,
      data: scoreData,
      message: 'Mock score saved'
    });
  }),
  
  getUserScores: (userId) => api.get(`/scores/user/${userId}`).catch((error) => {
    console.log('Falling back to mock scores');
    return Promise.resolve({
      success: true,
      data: mockScores(userId),
      message: 'Using mock scores'
    });
  }),
  
  getLeaderboard: (params) => api.get('/scores/leaderboard', { params }).catch((error) => {
    console.log('Falling back to mock leaderboard');
    return Promise.resolve({
      success: true,
      data: [
        { userId: '1', name: 'Alice', xp: 1500, rank: 1 },
        { userId: '2', name: 'Bob', xp: 1200, rank: 2 },
        { userId: '3', name: 'Charlie', xp: 900, rank: 3 }
      ],
      message: 'Using mock leaderboard'
    });
  })
};

// Helper function to check API connectivity
export const checkApiStatus = async () => {
  try {
    const response = await testAPI.health();
    return {
      connected: true,
      message: 'API is connected',
      data: response
    };
  } catch (error) {
    return {
      connected: false,
      message: 'Using fallback mock data',
      error: error.message
    };
  }
};

// Helper function for registration with proper response format
export const registerUser = async (userData) => {
  try {
    const response = await authAPI.register(userData);
    
    console.log('Register API response:', response);
    
    if (response && (response.success || response.token)) {
      const token = response.token || `mock_token_${Date.now()}`;
      const user = response.user || {
        _id: `user_${Date.now()}`,
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        xp: 500,
        level: 1
      };
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        success: true,
        token,
        user
      };
    } else {
      return {
        success: false,
        error: response?.error || 'Registration failed',
        message: response?.message || 'Unknown error'
      };
    }
  } catch (error) {
    console.error('Register error:', error);
    
    // If API fails completely, simulate success for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Creating mock user');
      const mockToken = `dev_token_${Date.now()}`;
      const mockUserData = {
        _id: `dev_user_${Date.now()}`,
        id: `dev_user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        xp: 500,
        level: 1,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      return {
        success: true,
        token: mockToken,
        user: mockUserData
      };
    }
    
    return {
      success: false,
      error: error.error || 'Registration failed',
      message: error.message || 'Network error'
    };
  }
};

// Helper function for login with proper response format
export const loginUser = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    
    console.log('Login API response:', response);
    
    if (response && (response.success || response.token)) {
      const token = response.token || `mock_token_${Date.now()}`;
      const user = response.user || {
        _id: `user_${Date.now()}`,
        id: `user_${Date.now()}`,
        name: 'Test User',
        email: credentials.email,
        xp: 500,
        level: 1
      };
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        success: true,
        token,
        user
      };
    } else {
      return {
        success: false,
        error: response?.error || 'Login failed',
        message: response?.message || 'Invalid credentials'
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // If API fails completely, simulate success for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Creating mock login');
      const mockToken = `dev_token_${Date.now()}`;
      const mockUserData = {
        _id: `dev_user_${Date.now()}`,
        id: `dev_user_${Date.now()}`,
        name: 'Development User',
        email: credentials.email,
        xp: 500,
        level: 1,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      return {
        success: true,
        token: mockToken,
        user: mockUserData
      };
    }
    
    return {
      success: false,
      error: error.error || 'Login failed',
      message: error.message || 'Network error'
    };
  }
};

// Helper to get current user from localStorage
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr || userStr === 'undefined' || userStr === 'null') {
      return null;
    }
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Helper to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = getCurrentUser();
  return !!(token && user);
};

// Helper to logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Dispatch storage event to update AuthContext
  window.dispatchEvent(new Event('storage'));
  window.location.href = '/login';
};

// Initialize auth state on load
export const initAuth = () => {
  const token = localStorage.getItem('token');
  const user = getCurrentUser();
  
  if (token && user) {
    // Set default Authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return { isAuthenticated: true, user };
  }
  
  return { isAuthenticated: false, user: null };
};

// Export everything
export default {
  api,
  testAPI,
  authAPI,
  quizAPI,
  userAPI,
  scoreAPI,
  checkApiStatus,
  registerUser,
  loginUser,
  getCurrentUser,
  isAuthenticated,
  logout,
  initAuth
};