// src/pages/Leaderboard.jsx
import React from 'react';
import { Trophy, Crown, TrendingUp, Users, Award, Star } from 'lucide-react';

export default function Leaderboard() {
  const users = [
    { rank: 1, name: 'Alex Johnson', xp: 12500, level: 25, streak: 42 },
    { rank: 2, name: 'Sarah Miller', xp: 11800, level: 24, streak: 38 },
    { rank: 3, name: 'Mike Chen', xp: 11200, level: 23, streak: 35 },
    { rank: 4, name: 'Emma Wilson', xp: 10500, level: 22, streak: 29 },
    { rank: 5, name: 'David Brown', xp: 9800, level: 20, streak: 24 },
    { rank: 6, name: 'Lisa Taylor', xp: 9200, level: 19, streak: 31 },
    { rank: 7, name: 'James Lee', xp: 8700, level: 18, streak: 18 },
    { rank: 8, name: 'Maria Garcia', xp: 8100, level: 17, streak: 22 },
    { rank: 9, name: 'Tom Smith', xp: 7600, level: 16, streak: 15 },
    { rank: 10, name: 'Anna Davis', xp: 7200, level: 15, streak: 12 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
            <p className="opacity-90">Compete with learners worldwide</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold mb-2">#8</div>
            <p className="opacity-90">Your Rank</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Learners</p>
              <p className="text-2xl font-bold">50,234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Top XP</p>
              <p className="text-2xl font-bold">12.5k</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Level</p>
              <p className="text-2xl font-bold">12.4</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Best Streak</p>
              <p className="text-2xl font-bold">142 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Top Learners</h2>
          <p className="text-gray-600">Weekly rankings based on XP earned</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Rank</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Learner</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">XP</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Level</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Streak</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.rank} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center">
                      {user.rank <= 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          user.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                          user.rank === 2 ? 'bg-gray-100 text-gray-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {user.rank === 1 && <Crown className="w-4 h-4" />}
                          {user.rank === 2 && <span>🥈</span>}
                          {user.rank === 3 && <span>🥉</span>}
                        </div>
                      ) : (
                        <span className="w-8 h-8 flex items-center justify-center text-gray-600">
                          {user.rank}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold text-purple-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.name.toLowerCase().replace(' ', '')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold">{user.xp.toLocaleString()} XP</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Level {user.level}</span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="h-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                          style={{ width: `${Math.min(100, (user.streak / 50) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{user.streak} days</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}