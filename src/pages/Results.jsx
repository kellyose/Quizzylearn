import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import { progressAPI, leaderboardAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FaTrophy, FaRedo, FaHome, FaShare, FaChartLine } from 'react-icons/fa';

const Results = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  
  const [attempt, setAttempt] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [attemptId]);

  const fetchResults = async () => {
    try {
      // In a real app, you'd have an endpoint to get attempt by ID
      // For now, we'll get all attempts and find the right one
      const attemptsResponse = await progressAPI.getAttempts();
      const foundAttempt = attemptsResponse.data.find(a => a._id === attemptId);
      
      if (foundAttempt) {
        setAttempt(foundAttempt);
        
        // Get leaderboard
        const leaderboardResponse = await leaderboardAPI.getLeaderboard();
        setLeaderboard(leaderboardResponse.data);
        
        // Find user rank
        const userIndex = leaderboardResponse.data.findIndex(
          user => user._id === foundAttempt.userId?._id
        );
        setUserRank(userIndex + 1);
      }
    } catch (error) {
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Quiz Results',
        text: `I scored ${attempt?.score}% on QuizzyLearn!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `I scored ${attempt?.score}% on QuizzyLearn! Check it out!`
      );
      toast.success('Results copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading results...</p>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Results not found</h2>
        <button 
          onClick={() => navigate('/home')}
          className="btn btn-primary mt-4"
        >
          Go Home
        </button>
      </div>
    );
  }

  const scoreColor = attempt.score >= 80 ? 'text-green-600' : 
                    attempt.score >= 60 ? 'text-yellow-600' : 
                    'text-red-600';

  const scoreMessage = attempt.score === 100 ? 'Perfect! 🎉' :
                      attempt.score >= 80 ? 'Excellent! 👍' :
                      attempt.score >= 60 ? 'Good job! 😊' :
                      'Keep practicing! 📚';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Score Card */}
      <div className="card text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <FaTrophy className="text-4xl text-white" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
        <p className="text-gray-600 mb-8">{scoreMessage}</p>
        
        <div className={`text-6xl font-bold mb-8 ${scoreColor}`}>
          {attempt.score}%
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{attempt.correctAnswers || 0}</div>
            <div className="text-gray-600">Correct</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {attempt.totalQuestions || 0}
            </div>
            <div className="text-gray-600">Total</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100) || 0}%
            </div>
            <div className="text-gray-600">Accuracy</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => navigate(`/quiz/${attempt.quizId?._id}`)}
            className="btn btn-primary flex items-center"
          >
            <FaRedo className="mr-2" />
            Try Again
          </button>
          
          <button 
            onClick={() => navigate('/home')}
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center"
          >
            <FaHome className="mr-2" />
            Back Home
          </button>
          
          <button 
            onClick={shareResults}
            className="btn bg-green-500 text-white hover:bg-green-600 flex items-center"
          >
            <FaShare className="mr-2" />
            Share Results
          </button>
        </div>
      </div>

      {/* Leaderboard Preview */}
      {leaderboard.length > 0 && (
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <FaChartLine className="text-2xl text-primary mr-3" />
            <h2 className="text-2xl font-bold">Leaderboard</h2>
          </div>
          
          <div className="space-y-3">
            {leaderboard.slice(0, 5).map((user, index) => (
              <div 
                key={user._id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  user._id === attempt.userId?._id ? 'bg-blue-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-4">
                    {index === 0 ? '🥇' : 
                     index === 1 ? '🥈' : 
                     index === 2 ? '🥉' : 
                     `${index + 1}.`}
                  </span>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-gray-600">Level {user.level}</div>
                  </div>
                </div>
                <div className="text-lg font-bold">{user.score} pts</div>
              </div>
            ))}
          </div>
          
          {userRank > 5 && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
              <p className="font-medium">
                Your rank: <span className="text-primary font-bold">#{userRank}</span> out of {leaderboard.length} players
              </p>
            </div>
          )}
        </div>
      )}

      {/* Performance Tips */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">How to Improve</h2>
        
        {attempt.score < 60 ? (
          <div className="space-y-3">
            <p className="text-gray-700">🔍 <strong>Review the basics:</strong> Focus on fundamental concepts in this topic.</p>
            <p className="text-gray-700">📚 <strong>Practice regularly:</strong> Take more quizzes to reinforce learning.</p>
            <p className="text-gray-700">⏱️ <strong>Take your time:</strong> Read questions carefully before answering.</p>
          </div>
        ) : attempt.score < 80 ? (
          <div className="space-y-3">
            <p className="text-gray-700">🎯 <strong>Focus on weak areas:</strong> Identify topics where you lost points.</p>
            <p className="text-gray-700">⚡ <strong>Improve speed:</strong> Try to answer questions faster while maintaining accuracy.</p>
            <p className="text-gray-700">📈 <strong>Challenge yourself:</strong> Try more difficult quizzes in this topic.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-700">🏆 <strong>Excellent work!</strong> You've mastered this topic.</p>
            <p className="text-gray-700">🚀 <strong>Try advanced topics:</strong> Challenge yourself with harder material.</p>
            <p className="text-gray-700">👑 <strong>Help others:</strong> Share your knowledge with fellow learners.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;