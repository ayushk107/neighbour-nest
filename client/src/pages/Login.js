// --- client/src/pages/Login.js ---
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // <-- IMPORT

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Get the login function from our context
  const { login } = useContext(AuthContext); // <-- USE CONTEXT
  const navigate = useNavigate(); // <-- For redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login function from context
      await login(formData); 

      alert('Login successful!');
      navigate('/'); // <-- Redirect to home page

    } catch (error) {
      console.error('Login error:', error.response.data);
      alert(`Error: ${error.response.data.message}`);
    }
  };

  // ... (the return JSX is the same as before)
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;