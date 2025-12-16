// src/layouts/MainLayout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Home, Compass, Users, Award, User, LogOut } from 'lucide-react';

export default function MainLayout({ children }) {
  const [user, setUser] = React.useState({ 
    name: 'Alex Johnson', 
    xp: 2450,
    level: 12 
  });

  const location = useLocation();
  
  const navLinks = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Users, label: 'Leaderboard', path: '/leaderboard' },
    { icon: Award, label: 'Achievements', path: '/achievements' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  QuizzyLearn
                </h1>
              </div>
            </Link>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AJ</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.xp.toLocaleString()} XP</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Sidebar Navigation (Mobile/Tablet) */}
        <div className="md:hidden mb-6">
          <div className="flex justify-around bg-white rounded-xl p-2 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center p-3 rounded-lg transition ${
                  isActive(link.path) 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'hover:bg-purple-50 text-gray-600'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-xs mt-1">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block w-64 mr-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-sm text-gray-500">Level {user.level} Explorer</p>
                  </div>
                </div>
                
                {/* XP Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>XP Progress</span>
                    <span className="font-semibold">2,450/3,000</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-400"
                      style={{ width: '82%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition ${
                      isActive(link.path)
                        ? 'bg-purple-50 text-purple-600'
                        : 'hover:bg-purple-50 text-gray-700 hover:text-purple-600'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Streak */}
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Streak</p>
                    <p className="text-2xl font-bold">🔥 14 days</p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>
          </aside>

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}