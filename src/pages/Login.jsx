// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Trophy, 
  AlertCircle,
  Loader2,
  ArrowLeft,
  Home
} from 'lucide-react';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/dashboard');
      return;
    }
    
    // Load remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginUser(formData);

      if (result.success) {
        if (login) {
          login(result.user, result.token);
        } else {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          window.dispatchEvent(new Event('storage'));
        }

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="grid lg:grid-cols-2 max-w-6xl w-full gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">QuizzyLearn</h1>
                  <p className="text-gray-600">Learn. Compete. Achieve.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Why Join QuizzyLearn?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Personalized learning paths</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Compete with friends</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Earn badges and rewards</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Start Your Journey!</h3>
                    <p className="opacity-90">Join thousands of learners today</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6 md:p-8">
              {/* Mobile Header */}
              <div className="lg:hidden mb-6 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">QuizzyLearn</h1>
                    <p className="text-gray-600">Learn. Compete. Achieve.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 text-center mb-6 md:mb-8">Sign in to continue your learning journey</p>

              {/* Debug button in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('token', 'dev_token');
                      localStorage.setItem('user', JSON.stringify({
                        id: 'dev_user',
                        name: 'Test User',
                        email: 'test@example.com',
                        xp: 500,
                        level: 1
                      }));
                      window.dispatchEvent(new Event('storage'));
                      navigate('/dashboard');
                    }}
                    className="text-sm text-yellow-700 hover:text-yellow-800 w-full text-left"
                  >
                    🚀 Dev: Quick Login (Skip API)
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      disabled={isLoading}
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-purple-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </button>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-purple-600 hover:text-purple-700 font-semibold">
                      Create one now
                    </Link>
                  </p>
                  
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 mx-auto"
                    >
                      <Home className="w-4 h-4" />
                      Return to Homepage
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}