import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  // 1. We use useState to hold the form data in an object
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    communityCode: ''
  });

  // 2. A simple 'onChange' handler to update our state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. An 'onSubmit' handler to send the data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    try {
      // Because of our "proxy" in package.json, we can just use this URL:
      const response = await axios.post('/api/auth/register', formData);
      
      console.log('User registered!', response.data);
     alert('Registration successful! Please log in.');
  navigate('/login');
      // Later, we will redirect the user to the login page
      
    } catch (error) {
      console.error('Registration error:', error.response.data);
      alert(`Error: ${error.response.data.message}`);
    }
  };

  // 4. This is the HTML-like JSX that makes up the component
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="communityCode"
          placeholder="Community Code"
          value={formData.communityCode}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;