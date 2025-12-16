// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import Leaderboard from "./pages/Leaderboard";
import Achievements from "./pages/Achievements";
import QuizSession from "./pages/QuizSession";
import CreateQuiz from "./pages/CreateQuiz";
import LandingPage from "./pages/LandingPage";
import DemoQuiz from "./pages/DemoQuiz";
import Chatbot from "./components/Chatbot";
import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  const hideChatbot = location.pathname.startsWith("/quiz/");

  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo-quiz" element={<DemoQuiz />} />

        {/* Auth */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/discover"
            element={
              <MainLayout>
                <Discover />
              </MainLayout>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <MainLayout>
                <Leaderboard />
              </MainLayout>
            }
          />
          <Route
            path="/achievements"
            element={
              <MainLayout>
                <Achievements />
              </MainLayout>
            }
          />
          <Route
            path="/create-quiz"
            element={
              <MainLayout>
                <CreateQuiz />
              </MainLayout>
            }
          />
          <Route path="/quiz/:id" element={<QuizSession />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideChatbot && <Chatbot />}
    </>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("hasSeenSplash")) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem("hasSeenSplash", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <AppContent />;
}
