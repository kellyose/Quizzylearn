// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    // FIX: Check if storedUser is valid JSON (not "undefined" string)
    if (token && storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        } else {
          // Invalid user data, clear it
          console.warn('Invalid user data stored, clearing...');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      // Clear invalid/undefined user data
      if (storedUser === 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
    
    // Listen for storage events (for cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        const newToken = localStorage.getItem('token');
        const newUser = localStorage.getItem('user');
        
        if (newToken && newUser && newUser !== 'undefined') {
          try {
            setUser(JSON.parse(newUser));
          } catch (err) {
            console.error('Failed to parse user:', err);
          }
        } else {
          setUser(null);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData, token) => {
    // FIX: Ensure userData is not undefined
    if (!userData) {
      console.error('login called with undefined userData');
      return;
    }
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const register = (userData, token) => {
    // FIX: Ensure userData is not undefined
    if (!userData) {
      console.error('register called with undefined userData');
      return;
    }
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
