// --- client/src/components/ItemCard.js ---
import React from 'react';

// A simple component to display an item
function ItemCard({ item }) {
  // Simple styling for the card
  const cardStyle = {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    margin: 0,
    color: '#333',
  };

  const categoryStyle = {
    background: '#007bff',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{item.title}</h3>
        <span style={categoryStyle}>{item.category}</span>
      </div>
      <p><strong>Owner:</strong> {item.owner.username}</p>
      <p>{item.description}</p>
      <button style={{ 
        backgroundColor: item.isAvailable ? '#28a745' : '#ccc', 
        color: 'white', 
        border: 'none', 
        padding: '0.5rem 1rem', 
        borderRadius: '4px' 
      }}>
        {item.isAvailable ? 'Request to Borrow' : 'Unavailable'}
      </button>
    </div>
  );
}

export default ItemCard;