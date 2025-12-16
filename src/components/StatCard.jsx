// src/components/StatCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  color = 'purple',
  trend = 'up' 
}) {
  
  // Color configuration
  const colorConfig = {
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      text: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600'
    },
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      text: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      text: 'text-green-600',
      gradient: 'from-green-500 to-green-600'
    },
    orange: {
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      text: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-600'
    },
    pink: {
      bg: 'bg-pink-50',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      text: 'text-pink-600',
      gradient: 'from-pink-500 to-pink-600'
    }
  };

  const colors = colorConfig[color] || colorConfig.purple;

  // Determine trend icon and color
  const getTrendInfo = () => {
    if (change === '🔥' || change === '⭐') {
      return {
        icon: change,
        color: 'text-orange-500',
        bg: 'bg-orange-50'
      };
    }
    
    if (trend === 'up') {
      return {
        icon: <TrendingUp className="w-4 h-4" />,
        color: 'text-green-600',
        bg: 'bg-green-50'
      };
    } else if (trend === 'down') {
      return {
        icon: <TrendingDown className="w-4 h-4" />,
        color: 'text-red-600',
        bg: 'bg-red-50'
      };
    } else {
      return {
        icon: <Minus className="w-4 h-4" />,
        color: 'text-gray-600',
        bg: 'bg-gray-50'
      };
    }
  };

  const trendInfo = getTrendInfo();

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`${colors.bg} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
        
        {/* Change indicator */}
        <div className={`${trendInfo.bg} ${trendInfo.color} px-3 py-1 rounded-full flex items-center space-x-1`}>
          {typeof trendInfo.icon === 'string' ? (
            <span>{trendInfo.icon}</span>
          ) : (
            trendInfo.icon
          )}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>

      <div>
        <p className="text-2xl md:text-3xl font-bold mb-2">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>

      {/* Progress bar (optional) */}
      <div className="mt-4">
        <div className="h-1 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full bg-gradient-to-r ${colors.gradient}`}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Alternative simpler version
export function SimpleStatCard({ icon: Icon, label, value, subtext, color = 'purple' }) {
  const colorConfig = {
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' }
  };

  const colors = colorConfig[color] || colorConfig.purple;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-gray-600">{label}</p>
          {subtext && (
            <p className="text-sm text-gray-500 mt-1">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Dashboard specific stat card
export function DashboardStatCard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  changeLabel,
  color = 'purple' 
}) {
  const colorConfig = {
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-gradient-to-r from-purple-500 to-purple-600',
      text: 'text-purple-700',
      gradient: 'from-purple-400 to-purple-500'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      text: 'text-blue-700',
      gradient: 'from-blue-400 to-blue-500'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-gradient-to-r from-green-500 to-green-600',
      text: 'text-green-700',
      gradient: 'from-green-400 to-green-500'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconBg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      text: 'text-orange-700',
      gradient: 'from-orange-400 to-orange-500'
    }
  };

  const colors = colorConfig[color] || colorConfig.purple;

  return (
    <div className={`${colors.bg} rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {change && (
          <div className={`px-3 py-1 rounded-full ${colors.text} bg-white/50 text-sm font-medium`}>
            {change}
          </div>
        )}
      </div>

      <div>
        <p className="text-3xl font-bold mb-2">{value}</p>
        <p className="text-gray-600 mb-1">{label}</p>
        {changeLabel && (
          <p className="text-sm text-gray-500">{changeLabel}</p>
        )}
      </div>

      {/* Animated progress indicator */}
      <div className="mt-4">
        <div className="h-1 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-full bg-gradient-to-r ${colors.gradient}`}
          />
        </div>
      </div>
    </div>
  );
}

// Achievement stat card
export function AchievementStatCard({ 
  title, 
  description, 
  progress, 
  icon: Icon,
  color = 'purple' 
}) {
  const colorConfig = {
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-gradient-to-r from-purple-500 to-purple-600',
      text: 'text-purple-700'
    },
    gold: {
      bg: 'bg-yellow-50',
      iconBg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      text: 'text-yellow-700'
    },
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      text: 'text-blue-700'
    }
  };

  const colors = colorConfig[color] || colorConfig.purple;

  return (
    <div className={`${colors.bg} rounded-2xl p-6`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full ${colors.iconBg} rounded-full`}
          />
        </div>
      </div>
    </div>
  );
}