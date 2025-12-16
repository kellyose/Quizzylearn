// src/components/SplashScreen.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Trophy, Sparkles, Brain, Zap, Loader2 } from 'lucide-react';

const SplashScreen = ({ onComplete, minDuration = 4000 }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const startTimeRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    
    let currentProgress = 0;
    let isMounted = true;

    const updateProgress = () => {
      if (!isMounted) return;

      const elapsed = Date.now() - startTimeRef.current;
      const timeBasedProgress = Math.min((elapsed / minDuration) * 100, 100);
      
      currentProgress = Math.min(
        currentProgress + 0.5 + Math.random(),
        timeBasedProgress
      );
      
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        const remainingTime = Math.max(0, minDuration - elapsed);
        
        setTimeout(() => {
          if (isMounted) {
            setShow(false);
            setTimeout(() => {
              if (isMounted) onComplete();
            }, 500);
          }
        }, remainingTime);
      } else {
        progressIntervalRef.current = setTimeout(updateProgress, 40);
      }
    };

    const initialTimeout = setTimeout(updateProgress, 300);

    return () => {
      isMounted = false;
      clearTimeout(initialTimeout);
      clearTimeout(progressIntervalRef.current);
    };
  }, [onComplete, minDuration]);

  const messages = [
    { threshold: 10, text: "Starting QuizzyLearn..." },
    { threshold: 20, text: "Loading interactive modules..." },
    { threshold: 35, text: "Initializing AI assistant..." },
    { threshold: 50, text: "Preparing quizzes..." },
    { threshold: 65, text: "Loading educational content..." },
    { threshold: 80, text: "Optimizing learning paths..." },
    { threshold: 90, text: "Finalizing setup..." },
    { threshold: 95, text: "Ready to learn!" },
  ];

  const currentMessage = messages
    .filter(m => progress >= m.threshold)
    .pop()?.text || "Loading...";

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-purple-600 z-50 flex items-center justify-center p-4">
      <div className="text-center w-full max-w-md">
        <div className="relative mb-6 sm:mb-8 md:mb-10">
          {/* Outer pulsing ring - hidden on small screens */}
          <div 
            className="hidden sm:block absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto border-4 border-white/20 rounded-full"
            style={{ 
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }} 
          />
          
          {/* Main logo - responsive sizing */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto border-2 border-white/30">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <div className="relative">
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Floating icons - adjust for mobile */}
          {[
            { Icon: Sparkles, position: "-top-6 -right-6", smPosition: "-top-8 -right-8", color: "text-yellow-300", delay: "0s" },
            { Icon: Brain, position: "-bottom-6 -left-6", smPosition: "-bottom-8 -left-8", color: "text-cyan-300", delay: "0.3s" },
            { Icon: Zap, position: "top-1/2 -right-10", smPosition: "top-1/2 -right-12", color: "text-orange-300", delay: "0.6s" },
            { Icon: Loader2, position: "top-1/2 -left-10", smPosition: "top-1/2 -left-12", color: "text-pink-300", delay: "0.9s" },
          ].map(({ Icon, position, smPosition, color, delay }, index) => (
            <div
              key={index}
              className={`absolute ${position} sm:${smPosition}`}
              style={{ 
                animation: `float 3s ease-in-out ${delay} infinite`
              }}
            >
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${color}`} />
            </div>
          ))}
        </div>

        {/* Title - responsive font sizes */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-4">
          <span className="text-white">Quizzy</span>
          <span className="text-yellow-300">Learn</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10" style={{ animation: 'pulse-slow 2s ease-in-out infinite' }}>
          Where knowledge meets fun
        </p>

        {/* Loading progress - responsive width */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-white/70 text-xs sm:text-sm mb-2 px-2 sm:px-0">
            <span>Loading</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-96 h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm mx-auto">
            <div 
              className="h-full rounded-full bg-purple-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="h-full w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              style={{ 
                transform: `translateX(${progress - 20}%)`,
                animation: 'shimmer 2s infinite'
              }}
            />
          </div>
        </div>

        {/* Dynamic loading message */}
        <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium min-h-[24px] sm:min-h-[28px] mb-2 px-4 sm:px-0">
          {currentMessage}
        </p>
        
        {/* Subtle hint for users */}
        <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-0 px-4 sm:px-0">
          Preparing your personalized learning experience...
        </p>

        {/* Loading dots - responsive spacing */}
        <div className="mt-6 sm:mt-8 md:mt-12 flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                progress >= (dot * 25) 
                  ? 'bg-green-400' 
                  : 'bg-white/30'
              }`}
              style={{ 
                animation: progress >= (dot * 25) ? `pulse 1s ease-in-out ${dot * 0.2}s infinite` : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Regular style tag without jsx attribute */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(5deg); }
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;