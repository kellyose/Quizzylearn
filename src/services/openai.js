// src/services/openai.js
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Mock data for development
const MOCK_QUESTIONS = {
  "JavaScript": [
    {
      question: "What is the output of `console.log(typeof null)` in JavaScript?",
      options: ["'null'", "'object'", "'undefined'", "'number'"],
      correct: 1,
      explanation: "In JavaScript, typeof null returns 'object'. This is a known bug in JavaScript that has been preserved for compatibility.",
      difficulty: "Easy"
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correct: 0,
      explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
      difficulty: "Easy"
    }
  ],
  "React": [
    {
      question: "What is the purpose of React hooks?",
      options: [
        "To connect React with backend services",
        "To add lifecycle methods to functional components",
        "To style React components",
        "To optimize React performance"
      ],
      correct: 1,
      explanation: "React hooks allow you to use state and other React features in functional components, which previously required class components.",
      difficulty: "Medium"
    }
  ]
  // Add more topics as needed
};

// Check if OpenAI API key is available
const hasOpenAIKey = () => {
  return OPENAI_API_KEY && OPENAI_API_KEY !== 'your_openai_api_key_here';
};

// Generate quiz questions using OpenAI API
export const generateQuizWithAI = async (topic, difficulty = 'Medium', numQuestions = 5) => {
  // If no OpenAI key or in development, use mock data
  if (!hasOpenAIKey() || import.meta.env.VITE_ENVIRONMENT === 'development') {
    console.log('Using mock data for quiz generation');
    return generateMockQuestions(topic, difficulty, numQuestions);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a quiz generation expert. Generate educational multiple-choice questions.'
          },
          {
            role: 'user',
            content: `Generate ${numQuestions} ${difficulty.toLowerCase()} difficulty multiple-choice questions about ${topic}. 
            Format as JSON array with objects containing: 
            question (string), 
            options (array of 4 strings), 
            correct (index number 0-3), 
            explanation (string),
            difficulty (string),
            category (string).
            
            Example format:
            [
              {
                "question": "What is JavaScript?",
                "options": ["A programming language", "A coffee brand", "A text editor", "A browser"],
                "correct": 0,
                "explanation": "JavaScript is a programming language used for web development.",
                "difficulty": "Easy",
                "category": "JavaScript"
              }
            ]`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      const questions = JSON.parse(content);
      return questions.map((q, index) => ({
        ...q,
        id: Date.now() + index,
        generatedByAI: true
      }));
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return generateMockQuestions(topic, difficulty, numQuestions);
    }
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    // Fallback to mock data
    return generateMockQuestions(topic, difficulty, numQuestions);
  }
};

// Generate mock questions for development
export const generateMockQuestions = (topic, difficulty, numQuestions) => {
  const topicKey = Object.keys(MOCK_QUESTIONS).find(key => 
    topic.toLowerCase().includes(key.toLowerCase())
  ) || 'JavaScript';

  const baseQuestions = MOCK_QUESTIONS[topicKey] || MOCK_QUESTIONS.JavaScript;
  
  // Clone and modify questions to match requested count
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    questions.push({
      ...JSON.parse(JSON.stringify(baseQuestion)), // Deep clone
      id: Date.now() + i,
      category: topic,
      difficulty: difficulty,
      generatedByAI: false,
      question: baseQuestion.question.replace('JavaScript', topic)
    });
  }
  
  return questions;
};

// Chat with AI assistant
export const chatWithAI = async (messages) => {
  // If no OpenAI key or in development, use mock responses
  if (!hasOpenAIKey() || import.meta.env.VITE_ENVIRONMENT === 'development') {
    return getMockAIResponse(messages[messages.length - 1]?.content || '');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are QuizzyLearn AI, an educational assistant specializing in quiz-based learning. Help users with concepts, explanations, and learning strategies.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI chat failed:', error);
    return getMockAIResponse(messages[messages.length - 1]?.content || '');
  }
};

// Mock AI responses for development
const getMockAIResponse = (userMessage) => {
  const responses = [
    "I understand you're asking about learning. As your AI assistant, I can help explain concepts, suggest learning strategies, and recommend quizzes based on your interests.",
    "That's a great question! Based on your learning progress, I recommend focusing on understanding the fundamentals first before moving to advanced topics.",
    "I notice you're interested in this topic. Here are some key points to remember...",
    "For better retention, try taking short quizzes regularly rather than long study sessions. Spaced repetition is very effective!",
    "Remember: Practice makes perfect! Try solving similar problems and don't hesitate to review concepts you find challenging."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Analyze learning patterns
export const analyzeLearningPatterns = async (quizResults) => {
  if (!hasOpenAIKey()) {
    return getMockAnalysis(quizResults);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Analyze quiz performance data and provide insights about learning patterns, strengths, weaknesses, and recommendations.'
          },
          {
            role: 'user',
            content: `Analyze this quiz performance data: ${JSON.stringify(quizResults)}`
          }
        ],
        temperature: 0.5,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI analysis failed:', error);
    return getMockAnalysis(quizResults);
  }
};

const getMockAnalysis = (quizResults) => {
  return `Based on your recent performance:
  
  **Strengths:**
  - Good understanding of basic concepts
  - Consistent performance in timed quizzes
  
  **Areas for Improvement:**
  - Advanced topics need more practice
  - Time management on complex questions
  
  **Recommendations:**
  1. Focus on practicing advanced topics
  2. Take more timed quizzes to improve speed
  3. Review explanations for incorrect answers
  
  Keep up the good work!`;
};