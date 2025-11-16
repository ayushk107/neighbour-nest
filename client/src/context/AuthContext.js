// --- client/src/context/AuthContext.js ---

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider (the component that "provides" the context)
function AuthProvider({ children }) {
  // 3. Set up State
  // We check localStorage to see if the user is already logged in
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // 4. Set axios default header
  // This useEffect runs when the 'token' changes.
  // It sets a global header for all future axios requests.
  // This is how our backend will know we're logged in.
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  // 5. Login Function
  const login = async (formData) => {
    try {
      const response = await axios.post('/api/auth/login', formData);
      const { token, user } = response.data;
      
      setToken(token);
      setUser(user);
      
      return response; // Return the response so the Login page can react
    } catch (error) {
      // Re-throw the error so the Login page can catch it
      throw error;
    }
  };

  // 6. Logout Function
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // 7. The "value" we pass down to all children components
  const contextValue = {
    user,
    token,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };