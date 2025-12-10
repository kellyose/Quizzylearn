import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import { topicAPI } from '../services/api';
import toast from 'react-hot-toast';

const Topics = () => {
  const [searchParams] = useSearchParams();
  const selectedTopic = searchParams.get('topic');
  
  const [topics, setTopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState(selectedTopic);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTopic) {
      fetchQuizzesByTopic(activeTopic);
    }
  }, [activeTopic]);

  const fetchData = async () => {
    try {
      const topicsResponse = await topicAPI.getTopics();
      setTopics(topicsResponse.data);
      
      if (!activeTopic && topicsResponse.data.length > 0) {
        setActiveTopic(topicsResponse.data[0]);
      }
    } catch (error) {
      toast.error('Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizzesByTopic = async (topic) => {
    setLoading(true);
    try {
      const response = await topicAPI.getQuizzesByTopic(topic);
      setQuizzes(response.data);
    } catch (error) {
      toast.error('Failed to load quizzes');
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
      <h1 className="text-3xl font-bold mb-2">Browse Topics</h1>
      <p className="text-gray-600 mb-8">Select a topic to explore quizzes</p>

      {/* Topic Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTopic === topic
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Quizzes Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {activeTopic} Quizzes
          <span className="text-gray-600 text-lg ml-2">
            ({quizzes.length} {quizzes.length === 1 ? 'quiz' : 'quizzes'})
          </span>
        </h2>
        
        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-700">No quizzes in this topic yet</h3>
            <p className="text-gray-600 mt-2">Check back later or try another topic!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;