import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Trophy, Zap, Sparkles } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const token = localStorage.getItem('token');
            navigate(token ? '/dashboard' : '/login');
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // 2.5 seconds total

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-quizzy-blue via-quizzy-purple to-quizzy-pink flex flex-col items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-lg border border-white/20">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Quizzy<span className="text-yellow-300">Learn</span>
        </h1>
        
        <p className="text-xl text-white/90 mb-10 max-w-lg mx-auto">
          Where learning meets fun! Challenge yourself with AI-powered quizzes
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { icon: Zap, text: 'AI-Powered', color: 'text-yellow-300' },
            { icon: Trophy, text: 'Gamified', color: 'text-emerald-300' },
            { icon: Brain, text: 'Adaptive', color: 'text-cyan-300' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <feature.icon className={`w-5 h-5 ${feature.color}`} />
              <span className="text-white font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-emerald-300 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-white/70">Loading...</span>
            <span className="text-sm text-white font-semibold">{progress}%</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-white/60 text-sm">
          Made with ❤️ for learners worldwide
        </p>
      </div>
    </div>
  );
};

export default Splash;