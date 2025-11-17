// --- client/src/pages/Dashboard.js ---

import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ItemForm from '../components/ItemForm';
import ItemCard from '../components/ItemCard';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  // This function will run once when the component loads
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Our AuthContext provides the token header automatically
        const response = await axios.get('/api/items');
        setItems(response.data); // Store the items in state
        setLoading(false);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items. Please try again later.');
        setLoading(false);
      }
    };
    
  if (token) {
    fetchItems();
  } else {
    // If there's no token (e.g., user is logged out), don't try to fetch
    setLoading(false);
  }

}, [token]); // The empty array [] means this runs only once

  // This function is passed to the ItemForm
  const handleItemCreated = (newItem) => {
    // Add the new item to the top of our items list
    setItems([newItem, ...items]);
  };

  // Helper for rendering content
  const renderContent = () => {
    if (loading) {
      return <p>Loading items...</p>;
    }
    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }
    if (items.length === 0) {
      return <p>No items found in your community yet. Be the first to add one!</p>;
    }
    return items.map(item => (
      <ItemCard key={item._id} item={item} />
    ));
  };
  
  // Container styling
  const dashboardStyle = {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 1rem',
  };

  return (
    <div style={dashboardStyle}>
      <h2>Community Dashboard</h2>
      
      {/* 1. The form to create new items */}
      <ItemForm onItemCreated={handleItemCreated} />
      
      {/* 2. The list of existing items */}
      <h3>Available Items</h3>
      {renderContent()}
    </div>
  );
}

export default Dashboard;