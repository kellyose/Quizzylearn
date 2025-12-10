// src/pages/Leaderboard.jsx
const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Leaderboard
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-600">
            Leaderboard page content will be displayed here.
          </p>
          {/* Add your leaderboard table/component here */}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;