// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Trophy, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext'; // Add this import

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth(); // Get register function from AuthContext
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = 'Password must contain at least one number';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!agreed) {
      errors.agreed = 'You must agree to the terms and conditions';
    }

    return errors;
  };

  const passwordStrength = {
    score: 0,
    color: 'text-red-500',
    text: 'Weak',
    progress: '25%'
  };

  if (formData.password.length >= 8) passwordStrength.score = 1;
  if (/[A-Z]/.test(formData.password)) passwordStrength.score = 2;
  if (/[0-9]/.test(formData.password)) passwordStrength.score = 3;
  if (/[^A-Za-z0-9]/.test(formData.password)) passwordStrength.score = 4;

  switch(passwordStrength.score) {
    case 1:
      passwordStrength.color = 'text-red-500';
      passwordStrength.text = 'Weak';
      passwordStrength.progress = '25%';
      break;
    case 2:
      passwordStrength.color = 'text-orange-500';
      passwordStrength.text = 'Fair';
      passwordStrength.progress = '50%';
      break;
    case 3:
      passwordStrength.color = 'text-yellow-500';
      passwordStrength.text = 'Good';
      passwordStrength.progress = '75%';
      break;
    case 4:
      passwordStrength.color = 'text-green-500';
      passwordStrength.text = 'Strong';
      passwordStrength.progress = '100%';
      break;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare registration data (remove confirmPassword)
      const { confirmPassword, ...registrationData } = formData;
      
      console.log('Sending registration data:', registrationData);
      
      const result = await registerUser(registrationData);
      
      console.log('Registration result:', result);
      
      if (result.success) {
        // Set success message
        setSuccess(`🎉 Welcome to QuizzyLearn, ${formData.name}! Account created successfully.`);
        
        // Update AuthContext with the new user
        if (register) {
          register(result.user, result.token);
        } else {
          // Fallback: Manually store auth data if AuthContext doesn't have register function
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          
          // Force reload to update auth state
          window.dispatchEvent(new Event('storage'));
        }
        
        // Navigate to dashboard immediately (remove setTimeout)
        navigate('/dashboard');
      } else {
        // Handle API error response
        setError(result.error || result.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Registration catch error:', error);
      setError(error.error || error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a function to test API connection
  const testApiConnection = async () => {
    try {
      console.log('Testing API connection...');
      const response = await fetch('http://localhost:5000/api/test');
      const data = await response.json();
      console.log('API test response:', data);
      return data;
    } catch (error) {
      console.error('API test failed:', error);
      return null;
    }
  };

  // Test API on component mount (optional)
  React.useEffect(() => {
    testApiConnection();
  }, []);

  // Add a debug function
  const debugRegistration = () => {
    console.log('Debug: Simulating successful registration');
    
    const mockUser = { 
      id: '123', 
      name: formData.name || 'Test User', 
      email: formData.email || 'test@example.com',
      xp: 500
    };
    const mockToken = 'mock-token-' + Date.now();
    
    // Store in localStorage
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Update AuthContext if available
    if (register) {
      register(mockUser, mockToken);
    }
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="grid lg:grid-cols-2 max-w-6xl w-full gap-12 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center border border-purple-700">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  QuizzyLearn
                </h1>
                <p className="text-gray-600">Start your learning adventure</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Join 50,000+ Learners
              </h3>
              <p className="text-gray-600 text-lg">
                Start your journey with personalized learning paths, gamified quizzes, and AI-powered recommendations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Personalized learning paths</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">AI quiz recommendations</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Compete on leaderboards</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Earn badges and rewards</span>
              </div>
            </div>

            <div className="bg-purple-600 rounded-2xl p-6 text-white border border-purple-700 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Get 500 XP Bonus!</h3>
                  <p className="opacity-90">Start your journey with extra points</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8"
        >
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  QuizzyLearn
                </h1>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Create Your Account</h2>
          <p className="text-gray-600 text-center mb-8">
            Join thousands of learners and start your journey
          </p>

          {/* Debug buttons in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg space-y-2">
              <button
                type="button"
                onClick={testApiConnection}
                className="text-sm text-yellow-700 hover:text-yellow-800 block w-full text-left"
              >
                🔧 Test API Connection
              </button>
              <button
                type="button"
                onClick={debugRegistration}
                className="text-sm text-yellow-700 hover:text-yellow-800 block w-full text-left"
              >
                🐛 Debug: Simulate Registration
              </button>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-700 text-sm font-medium">{success}</p>
                <p className="text-green-600 text-xs mt-1">Redirecting to dashboard...</p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 text-sm font-medium">{error}</p>
                <p className="text-red-600 text-xs mt-1">
                  Please check your information and try again.
                  {process.env.NODE_ENV === 'development' && ' Check browser console for details.'}
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    formErrors.name 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Enter your name"
                />
              </div>
              {formErrors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    formErrors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="your@email.com"
                />
              </div>
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition ${
                    formErrors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Create a strong password"
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
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Password strength:</span>
                    <span className={`font-semibold ${passwordStrength.color}`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        passwordStrength.score === 1 ? 'bg-red-500' :
                        passwordStrength.score === 2 ? 'bg-orange-500' :
                        passwordStrength.score === 3 ? 'bg-yellow-500' :
                        'bg-green-500'
                      } transition-all duration-300`}
                      style={{ width: passwordStrength.progress }}
                    ></div>
                  </div>
                </div>
              )}
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formErrors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition ${
                    formErrors.confirmPassword 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={isLoading}
                  className={`w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
                <span className="ml-2 text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {formErrors.agreed && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formErrors.agreed}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                Sign in
              </Link>
            </p>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}