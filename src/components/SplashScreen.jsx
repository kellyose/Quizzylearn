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
    <div className="fixed inset-0 bg-purple-600 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="text-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Logo Container */}
        <div className="relative mb-6 sm:mb-8 md:mb-10">
          {/* Outer pulsing ring - responsive size */}
          <div 
            className="hidden xs:block absolute inset-0 w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto border-4 border-white/20 rounded-full"
            style={{ 
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }} 
          />
          
          {/* Main logo - fully responsive sizing */}
          <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto border-2 border-white/30">
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
              <Trophy className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-purple-600" />
            </div>
          </div>

          {/* Floating icons - responsive positioning and sizing */}
          {[
            { 
              Icon: Sparkles, 
              mobile: "-top-4 -right-4", 
              tablet: "sm:-top-6 sm:-right-6", 
              desktop: "md:-top-8 md:-right-8", 
              color: "text-yellow-300", 
              delay: "0s" 
            },
            { 
              Icon: Brain, 
              mobile: "-bottom-4 -left-4", 
              tablet: "sm:-bottom-6 sm:-left-6", 
              desktop: "md:-bottom-8 md:-left-8", 
              color: "text-cyan-300", 
              delay: "0.3s" 
            },
            { 
              Icon: Zap, 
              mobile: "top-1/2 -right-6", 
              tablet: "sm:top-1/2 sm:-right-8", 
              desktop: "md:top-1/2 md:-right-12", 
              color: "text-orange-300", 
              delay: "0.6s" 
            },
            { 
              Icon: Loader2, 
              mobile: "top-1/2 -left-6", 
              tablet: "sm:top-1/2 sm:-left-8", 
              desktop: "md:top-1/2 md:-left-12", 
              color: "text-pink-300", 
              delay: "0.9s" 
            },
          ].map(({ Icon, mobile, tablet, desktop, color, delay }, index) => (
            <div
              key={index}
              className={`absolute ${mobile} ${tablet} ${desktop}`}
              style={{ 
                animation: `float 3s ease-in-out ${delay} infinite`
              }}
            >
              <Icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${color}`} />
            </div>
          ))}
        </div>

        {/* Title - responsive font sizes */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2 xs:mb-3 sm:mb-4">
          <span className="text-white">Quizzy</span>
          <span className="text-yellow-300">Learn</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-4 xs:mb-6 sm:mb-8 md:mb-10" style={{ animation: 'pulse-slow 2s ease-in-out infinite' }}>
          Where knowledge meets fun
        </p>

        {/* Loading Progress */}
        <div className="mb-3 xs:mb-4 sm:mb-6">
          {/* Progress labels */}
          <div className="flex justify-between text-white/70 text-xs xs:text-sm mb-1 xs:mb-2 px-2">
            <span>Loading</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          
          {/* Progress bar container - responsive width */}
          <div className="w-full max-w-[240px] xs:max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            {/* Progress bar */}
            <div className="h-1.5 xs:h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full rounded-full bg-purple-400 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
              {/* Shimmer effect */}
              <div 
                className="h-full w-12 xs:w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                style={{ 
                  transform: `translateX(${progress - 20}%)`,
                  animation: 'shimmer 2s infinite'
                }}
              />
            </div>
          </div>
        </div>

        {/* Current loading message */}
        <p className="text-white/90 text-xs xs:text-sm sm:text-base md:text-lg font-medium min-h-[20px] xs:min-h-[24px] sm:min-h-[28px] mb-1 xs:mb-2 px-2 xs:px-0">
          {currentMessage}
        </p>
        
        {/* Subtle hint */}
        <p className="text-white/50 text-xs xs:text-sm mb-3 xs:mb-4 sm:mb-0 px-2 xs:px-0">
          Preparing your personalized learning experience...
        </p>

        {/* Loading dots */}
        <div className="mt-4 xs:mt-6 sm:mt-8 md:mt-12 flex justify-center space-x-1.5 xs:space-x-2 sm:space-x-3 md:space-x-4">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full ${
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

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
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
        
        /* Extra small devices (phones, less than 400px) */
        @media (max-width: 400px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(5deg); }
          }
        }
        
        /* Small devices (phones, 400px and up) */
        @media (min-width: 400px) and (max-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(5deg); }
          }
        }
        
        /* Medium devices (tablets, 640px and up) */
        @media (min-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
        }
        
        /* Large devices (desktops, 1024px and up) */
        @media (min-width: 1024px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(5deg); }
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;