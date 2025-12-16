// src/services/quizGenerator.js
import { generateQuizWithAI, generateMockQuestions } from './openai';

// Quiz difficulty levels
const DIFFICULTY_LEVELS = {
  Easy: {
    timePerQuestion: 60, // seconds
    xpPerQuestion: 50,
    hintPenalty: 10
  },
  Medium: {
    timePerQuestion: 45,
    xpPerQuestion: 75,
    hintPenalty: 15
  },
  Hard: {
    timePerQuestion: 30,
    xpPerQuestion: 100,
    hintPenalty: 20
  },
  Expert: {
    timePerQuestion: 20,
    xpPerQuestion: 150,
    hintPenalty: 25
  }
};

// Generate quiz based on parameters
export const generateQuiz = async (config) => {
  const {
    topic,
    difficulty = 'Medium',
    numQuestions = 10,
    timeLimit, // Optional: override calculated time
    userId,
    previousPerformance
  } = config;

  // Determine adaptive difficulty
  let finalDifficulty = difficulty;
  if (previousPerformance && userId) {
    finalDifficulty = calculateAdaptiveDifficulty(previousPerformance, difficulty);
  }

  // Generate questions
  let questions;
  try {
    questions = await generateQuizWithAI(topic, finalDifficulty, numQuestions);
  } catch (error) {
    console.error('Failed to generate questions, using mock data:', error);
    questions = generateMockQuestions(topic, finalDifficulty, numQuestions);
  }

  // Calculate time limit if not provided
  const calculatedTime = timeLimit || 
    (DIFFICULTY_LEVELS[finalDifficulty].timePerQuestion * numQuestions);

  // Add metadata to questions
  const enhancedQuestions = questions.map((question, index) => ({
    ...question,
    questionNumber: index + 1,
    timeAllocated: DIFFICULTY_LEVELS[finalDifficulty].timePerQuestion,
    xpValue: DIFFICULTY_LEVELS[finalDifficulty].xpPerQuestion,
    usedHint: false,
    answered: false,
    userAnswer: null,
    timeSpent: 0
  }));

  // Create quiz object
  const quiz = {
    id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: `${topic} Quiz - ${finalDifficulty} Difficulty`,
    description: `Test your knowledge of ${topic} with this ${finalDifficulty.toLowerCase()} level quiz.`,
    topic,
    difficulty: finalDifficulty,
    questions: enhancedQuestions,
    totalQuestions: numQuestions,
    timeLimit: calculatedTime,
    totalXp: numQuestions * DIFFICULTY_LEVELS[finalDifficulty].xpPerQuestion,
    createdAt: new Date().toISOString(),
    createdBy: userId || 'system',
    isAdaptive: previousPerformance ? true : false,
    metadata: {
      generatedWithAI: questions.some(q => q.generatedByAI),
      averageDifficulty: finalDifficulty,
      topicCoverage: [topic]
    }
  };

  return quiz;
};

// Calculate adaptive difficulty based on previous performance
const calculateAdaptiveDifficulty = (performance, baseDifficulty) => {
  const { averageScore, recentQuizzes = [] } = performance;
  
  if (recentQuizzes.length === 0) {
    return baseDifficulty;
  }

  // Adjust difficulty based on average score
  if (averageScore >= 80) {
    // Doing well, increase difficulty
    const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
    const currentIndex = difficulties.indexOf(baseDifficulty);
    return difficulties[Math.min(currentIndex + 1, difficulties.length - 1)];
  } else if (averageScore <= 40) {
    // Struggling, decrease difficulty
    const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
    const currentIndex = difficulties.indexOf(baseDifficulty);
    return difficulties[Math.max(currentIndex - 1, 0)];
  }
  
  return baseDifficulty;
};

// Generate quiz from uploaded content (PDF, text, etc.)
export const generateQuizFromContent = async (content, config = {}) => {
  // This would use NLP to extract key concepts and generate questions
  // For now, we'll extract topics and generate a quiz
  const topics = extractTopicsFromContent(content);
  
  if (topics.length === 0) {
    throw new Error('No topics found in content');
  }

  const mainTopic = topics[0]; // Use the most prominent topic
  return generateQuiz({
    topic: mainTopic,
    ...config
  });
};

// Extract topics from content (simplified)
const extractTopicsFromContent = (content) => {
  // Simple keyword extraction (in production, use NLP libraries)
  const commonTopics = [
    'JavaScript', 'React', 'Python', 'Java', 'Algorithms',
    'Data Structures', 'Machine Learning', 'Web Development',
    'Database', 'Networking', 'Security', 'DevOps'
  ];

  const foundTopics = commonTopics.filter(topic => 
    content.toLowerCase().includes(topic.toLowerCase())
  );

  return foundTopics.length > 0 ? foundTopics : ['General Knowledge'];
};

// Save quiz result to localStorage
export const saveQuizResult = (quizId, result) => {
  try {
    const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    const resultData = {
      quizId,
      ...result,
      completedAt: new Date().toISOString(),
      id: `result_${Date.now()}`
    };

    const updatedResults = [...existingResults, resultData];
    localStorage.setItem('quizResults', JSON.stringify(updatedResults));
    
    // Update user stats
    updateUserStats(result);
    
    return resultData;
  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return null;
  }
};

// Update user statistics
const updateUserStats = (result) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user.stats) {
    user.stats = {
      totalQuizzes: 0,
      totalXP: 0,
      averageScore: 0,
      bestCategory: '',
      totalTimeSpent: 0
    };
  }

  // Update stats
  user.stats.totalQuizzes += 1;
  user.stats.totalXP += result.totalXpEarned || 0;
  user.stats.totalTimeSpent += result.timeSpent || 0;
  
  // Calculate new average score
  const oldTotal = (user.stats.averageScore || 0) * (user.stats.totalQuizzes - 1);
  user.stats.averageScore = (oldTotal + result.score) / user.stats.totalQuizzes;

  // Update user streak
  updateStreak();

  localStorage.setItem('user', JSON.stringify(user));
};

// Update daily streak
const updateStreak = () => {
  const today = new Date().toDateString();
  const streakData = JSON.parse(localStorage.getItem('streak') || '{}');
  
  if (!streakData.lastActive || streakData.lastActive !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (streakData.lastActive === yesterdayStr) {
      streakData.currentStreak = (streakData.currentStreak || 0) + 1;
    } else {
      streakData.currentStreak = 1;
    }
    
    streakData.lastActive = today;
    streakData.bestStreak = Math.max(streakData.bestStreak || 0, streakData.currentStreak);
    
    localStorage.setItem('streak', JSON.stringify(streakData));
  }
};

// Get recommended quizzes based on user performance
export const getRecommendedQuizzes = async (userId) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
  
  // Analyze weak areas
  const weakAreas = analyzeWeakAreas(results);
  
  // Generate recommendations
  const recommendations = [];
  
  if (weakAreas.length > 0) {
    // Recommend quizzes in weak areas
    for (const area of weakAreas.slice(0, 3)) {
      recommendations.push({
        type: 'improvement',
        topic: area,
        difficulty: 'Medium',
        reason: `Improve your skills in ${area}`,
        priority: 'high'
      });
    }
  }
  
  // Recommend advanced topics if doing well
  if (user.stats?.averageScore > 70) {
    const advancedTopics = ['Advanced Algorithms', 'System Design', 'Machine Learning'];
    for (const topic of advancedTopics.slice(0, 2)) {
      recommendations.push({
        type: 'advancement',
        topic,
        difficulty: 'Hard',
        reason: `Challenge yourself with ${topic}`,
        priority: 'medium'
      });
    }
  }
  
  return recommendations;
};

// Analyze weak areas from quiz results
const analyzeWeakAreas = (results) => {
  const topicPerformance = {};
  
  results.forEach(result => {
    if (!topicPerformance[result.topic]) {
      topicPerformance[result.topic] = { total: 0, count: 0 };
    }
    
    topicPerformance[result.topic].total += result.score || 0;
    topicPerformance[result.topic].count += 1;
  });
  
  // Find topics with average score below 60
  const weakAreas = Object.entries(topicPerformance)
    .filter(([_, data]) => data.total / data.count < 60)
    .map(([topic]) => topic);
  
  return weakAreas;
};

// Export everything
export default {
  generateQuiz,
  generateQuizFromContent,
  saveQuizResult,
  getRecommendedQuizzes,
  DIFFICULTY_LEVELS
};

// Also export generateQuizWithAI for backward compatibility
export { generateQuizWithAI };