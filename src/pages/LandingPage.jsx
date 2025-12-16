// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Sparkles, Brain, Zap, 
  Award, TrendingUp, Users, Smile,
  CheckCircle, ChevronRight, Star,
  Play, Target, BarChart3, Lightbulb,
  Quote, Shield, BookOpen,
  Globe, Mail, Twitter, Instagram,
  Linkedin, Facebook, Menu, X
} from 'lucide-react';
import SplashScreen from '../components/SplashScreen';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleDemoQuiz = () => {
    navigate('/demo-quiz');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (showSplash) {
    return (
      <SplashScreen 
        onComplete={() => setShowSplash(false)} 
        minDuration={3000}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-purple-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                QuizzyLearn
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition text-sm lg:text-base">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition text-sm lg:text-base">How it Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-purple-600 font-medium transition text-sm lg:text-base">Testimonials</a>
              <a href="#get-started" className="text-gray-700 hover:text-purple-600 font-medium transition text-sm lg:text-base">Get Started</a>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={handleSignIn}
                className="hidden sm:block px-3 sm:px-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-lg transition text-sm sm:text-base"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStarted}
                className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition shadow-sm text-sm sm:text-base"
              >
                Get Started
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden ml-2 p-2 text-gray-700 hover:text-purple-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition px-4 py-2">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition px-4 py-2">How it Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-purple-600 font-medium transition px-4 py-2">Testimonials</a>
                <a href="#get-started" className="text-gray-700 hover:text-purple-600 font-medium transition px-4 py-2">Get Started</a>
                <button 
                  onClick={handleSignIn}
                  className="px-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-lg transition text-left"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                Turn Learning Into a <span className="text-purple-600">Fun Challenge</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
                Gamified quizzes with Instant AI feedback and personalized recommendations. 
                Learn smarter, compete harder, achieve more!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={handleGetStarted}
                  className="px-6 sm:px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition shadow-sm flex items-center justify-center text-sm sm:text-base"
                >
                  Get Started Free
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button 
                  onClick={handleDemoQuiz}
                  className="px-6 sm:px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition flex items-center justify-center text-sm sm:text-base"
                >
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Try Demo Quiz
                </button>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-lg">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-purple-600" />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">50K+</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600">Active Students</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-pink-600" />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">10K+</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600">Outcome Teams</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">94%</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600">Completion Rate</div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Smile className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-yellow-600" />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">90%</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Tools That Make Quizzes Exciting
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Everything you need to turn boring study sessions into exciting learning adventures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Award,
                title: "Gamified Quizzes",
                description: "Learn through playing with points, badges, and achievements that make studying addictive.",
                color: "bg-purple-100",
                iconColor: "text-purple-600"
              },
              {
                icon: Zap,
                title: "Instant Feedback",
                description: "Get real-time explanations and tips right after each question to reinforce learning.",
                color: "bg-blue-100",
                iconColor: "text-blue-600"
              },
              {
                icon: Brain,
                title: "AI Recommendations",
                description: "Smart suggestions tailored to your learning style and areas needing improvement.",
                color: "bg-green-100",
                iconColor: "text-green-600"
              },
              {
                icon: BarChart3,
                title: "Leaderboards",
                description: "Compete with friends and classmates. Climb the ranks and show off your knowledge!",
                color: "bg-orange-100",
                iconColor: "text-orange-600"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6`}>
                  <feature.icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              HOW QuizzyLearn Works
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Get started in minutes and watch your knowledge grow with every quiz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {[
              { number: "01", title: "Choose a subject", description: "Select from various topics and difficulty levels" },
              { number: "02", title: "Take Quiz", description: "Answer questions with gamified elements and timers" },
              { number: "03", title: "View Results", description: "Get detailed feedback and AI-powered insights" },
              { number: "04", title: "Track Progress", description: "Monitor improvements and celebrate milestones" }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200 mb-3 sm:mb-4">{step.number}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-purple-600 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Start Learning Now</h3>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">Join thousands of students transforming their learning journey</p>
            <button 
              onClick={handleGetStarted}
              className="px-6 sm:px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-sm text-sm sm:text-base"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Students Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Join thousands of students who've transformed their learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote: "QuizzyLearn makes studying for exams actually fun. I've improved my grades by 20% since I started using it!",
                name: "David Samuel",
                role: "Computer Science Student",
                rating: 5
              },
              {
                quote: "The leaderboard system keeps me motivated to study every day. I've learned more than I ever did with textbooks.",
                name: "Femi Ade",
                role: "Medical Student",
                rating: 5
              },
              {
                quote: "Competing with friends in biology quizzes makes learning engaging. We help each other grow while having fun!",
                name: "Michael Child",
                role: "Biology Student",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3 sm:mr-4 text-sm sm:text-base">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</div>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-12 sm:py-16 lg:py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join 50,000+ students who are learning smarter with QuizzyLearn
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="px-6 sm:px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-sm text-sm sm:text-base"
            >
              Get Started Free
            </button>
            <button 
              onClick={handleDemoQuiz}
              className="px-6 sm:px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition text-sm sm:text-base"
            >
              Try Demo First
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold">QuizzyLearn</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Making learning fun and effective for students worldwide
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "How it Works", "Pricing", "FAQ"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Press"]
              },
              {
                title: "Legal",
                links: ["Terms of Service", "Privacy Policy", "Cookie Policy"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Community"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">{column.title}</h3>
                <ul className="space-y-1 sm:space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition text-sm sm:text-base">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-3 sm:mb-0 text-center sm:text-left">
              ©2023 QuizzyLearn. All rights reserved.
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-800 rounded-full">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-800 rounded-full">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-800 rounded-full">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-800 rounded-full">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;