import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import { quizAPI, topicAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FaSearch, FaTrophy, FaRocket, FaChartLine } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
    checkUser();
  }, []);

  const checkUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  };

  const fetchData = async () => {
    try {
      // Fetch quizzes
      const quizzesResponse = await quizAPI.getAllQuizzes();
      setQuizzes(quizzesResponse.data);
      
      // Fetch topics
      const topicsResponse = await topicAPI.getTopics();
      setTopics(topicsResponse.data);
      
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-8 mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Ready to Test Your Knowledge?
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Challenge yourself with fun quizzes, track your progress, and climb the leaderboard!
        </p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/topics" className="btn btn-primary px-8 py-3 text-lg">
            <FaRocket className="inline mr-2" /> Start Learning
          </Link>
          <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 px-8 py-3 text-lg">
            <FaTrophy className="inline mr-2" /> View Leaderboard
          </button>
        </div>
      </div>

      {/* Topics Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Topic</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topics.map((topic, index) => (
            <Link
              key={index}
              to={`/topics?topic=${topic}`}
              className="card text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">
                {topic === 'Mathematics' && '🧮'}
                {topic === 'Geography' && '🌍'}
                {topic === 'Programming' && '💻'}
                {topic === 'Science' && '🔬'}
                {topic === 'History' && '🏛️'}
                {!['Mathematics', 'Geography', 'Programming', 'Science', 'History'].includes(topic) && '📚'}
              </div>
              <h3 className="font-medium">{topic}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Quizzes */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Quizzes</h2>
          <Link to="/topics" className="text-primary hover:underline">
            View all →
          </Link>
        </div>
        
        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-700">No quizzes available</h3>
            <p className="text-gray-600 mt-2">Check back later for new quizzes!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.slice(0, 6).map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTrophy className="text-2xl text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Compete & Win</h3>
          <p className="text-gray-600">
            Climb the leaderboard and earn rewards for your achievements.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaChartLine className="text-2xl text-purple-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Track Progress</h3>
          <p className="text-gray-600">
            Monitor your improvement with detailed statistics and insights.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaRocket className="text-2xl text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Learn Faster</h3>
          <p className="text-gray-600">
            Gamified learning makes studying more engaging and effective.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;