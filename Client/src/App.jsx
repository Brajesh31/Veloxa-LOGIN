// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
/*import Weather from './pages/Weather';
import Community from './pages/Community';
import Social from './pages/Social';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound'; */

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={<Dashboard/>}
        //    element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/weather" 
            element={isAuthenticated ? <Weather /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/routes" 
            element={isAuthenticated ? <Routes /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/community" 
            element={isAuthenticated ? <Community /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/social" 
            element={isAuthenticated ? <Social /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/events" 
            element={isAuthenticated ? <Events /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
          />
          
          {/* 404 route */}
    
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;