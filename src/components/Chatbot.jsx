// src/components/Chatbot.jsx (Updated)
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  HelpCircle,
  Brain,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { chatWithAI } from '../services/openai';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm your QuizzyLearn AI assistant. I can help explain concepts, suggest learning strategies, and answer your questions about quizzes. How can I help you today?", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpenAI, setHasOpenAI] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if OpenAI is available
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    setHasOpenAI(apiKey && apiKey !== 'your_openai_api_key_here');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithAI([
        ...messages.map(msg => ({
          role: msg.sender === 'bot' ? 'assistant' : 'user',
          content: msg.text
        })),
        { role: 'user', content: input }
      ]);

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm having trouble connecting right now. Please try again in a moment, or check if your OpenAI API key is properly configured.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "Explain binary search algorithm",
    "What's the difference between React and Vue?",
    "How can I improve my learning retention?",
    "Suggest JavaScript projects for beginners",
  ];

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-white font-bold">AI</span>
        </motion.div>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-24 right-6 w-96 max-w-full bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">QuizzyLearn AI Assistant</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs opacity-90">
                        {hasOpenAI ? 'Powered by GPT-4' : 'Demo Mode'}
                      </span>
                      {!hasOpenAI && (
                        <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">
                          Demo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {!hasOpenAI && (
                <div className="mt-3 p-2 bg-yellow-500/20 rounded-lg text-sm">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span>Using demo mode. Add OpenAI API key for full features.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {message.sender === 'bot' && <Bot className="w-4 h-4" />}
                      <span className="text-sm font-medium">
                        {message.sender === 'bot' ? 'Quizzy AI' : 'You'}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-none p-4">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <span className="text-sm font-medium">Quizzy AI is thinking</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Try asking:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => {
                        const inputField = document.querySelector('input[type="text"]');
                        if (inputField) inputField.focus();
                      }, 100);
                    }}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about learning..."
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button 
                    onClick={() => setMessages([messages[0]])}
                    className="hover:text-purple-600 transition"
                  >
                    Clear chat
                  </button>
                  {!hasOpenAI && (
                    <a 
                      href="https://platform.openai.com/api-keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-purple-600 transition flex items-center"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Get API Key
                    </a>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {hasOpenAI ? 'Powered by OpenAI' : 'Demo Mode'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}