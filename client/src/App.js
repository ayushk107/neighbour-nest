// --- client/src/App.js ---
import { Toaster } from 'react-hot-toast';
import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import { AuthContext } from './context/AuthContext'; // <-- IMPORT CONTEXT
import axios from 'axios';

// Import our pages
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // <-- IMPORT DASHBOARD
import Requests from './pages/Requests';
// Our Navbar is now "auth-aware"
function Navbar() {
  const { user, logout } = useContext(AuthContext); // <-- USE CONTEXT

  return (
    <nav style={{ background: '#333', padding: '1rem', textAlign: 'center' }}>
      <h1 style={{ color: 'white', margin: 0, padding: 0, display: 'inline' }}>NeighborNest</h1>
      {user ? (
        // If user is logged in
        <>
          <span style={{ color: 'white', margin: '0 1rem' }}>Hi, {user.username}!</span>
          <Link to="/requests" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none', fontWeight: 'bold' }}>
             My Requests
          </Link>
          <button onClick={logout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Logout
          </button>
        </>
      ) : (
        // If user is logged out
        <>
          <Link to="/login" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Register</Link>
        </>
      )}
    </nav>
  );
}

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://YOUR-BACKEND-NAME.onrender.com';
axios.defaults.withCredentials = true;
function App() {
  const { token, loading } = useContext(AuthContext); // <-- Get token
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="App">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        {/* If user is logged in, main page (/) is Dashboard. Otherwise, it's Login. */}
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/requests" element={token ? <Requests /> : <Navigate to="/login" />} />
        {/* /login and /register only show if user is NOT logged in */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;