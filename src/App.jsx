import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Topics from './pages/Topics';
import Leaderboard from './pages/Leaderboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1f2937',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
            <Route path="/topics" element={<><Navbar /><Topics /></>} />
            <Route path="/quiz/:id" element={<><Navbar /><Quiz /></>} />
            <Route path="/results/:id" element={<><Navbar /><Results /></>} />
            <Route path="/leaderboard" element={<><Navbar /><Leaderboard /></>} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
