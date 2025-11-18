// --- client/src/components/ItemCard.js ---
import React from 'react';
import axios from 'axios'; // <-- IMPORT AXIOS
import toast from 'react-hot-toast'; // <-- IMPORT TOAST

function ItemCard({ item, currentUser, onDelete }) {
  // Check if the logged-in user is the owner
  // We safely check for currentUser to avoid crashes if data is loading
  const isOwner = currentUser && item.owner && item.owner._id === currentUser.id;

  const handleRequest = async () => {
    try {
      // This calls the new API route we just built
      await axios.post(`/api/requests/${item._id}`);
      toast.success('Request sent successfully!');
    } catch (error) {
      console.error(error);
      // Show the specific error from the backend (e.g., "You already requested this")
      toast.error(error.response?.data?.message || 'Failed to send request');
    }
  };

  // --- Styles ---
  const cardStyle = {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'relative',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  };

  const categoryStyle = {
    background: '#007bff',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
  };

  const btnStyle = {
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.2s',
  };

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{item.title}</h3>
        <span style={categoryStyle}>{item.category}</span>
      </div>

      {/* Details */}
      <p style={{ margin: '0.5rem 0' }}>
        <strong>Owner:</strong> {item.owner ? item.owner.username : 'Unknown'}
      </p>
      <p style={{ color: '#555' }}>{item.description}</p>

      {/* Actions Area */}
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        
        {/* 1. DELETE BUTTON (Visible only to Owner) */}
        {isOwner && (
          <button
            onClick={() => onDelete(item._id)}
            style={{ ...btnStyle, backgroundColor: '#dc3545', color: 'white' }}
          >
            Delete
          </button>
        )}

        {/* 2. REQUEST BUTTON (Visible only to Non-Owners) */}
        {!isOwner && (
          <button
            onClick={handleRequest}
            disabled={!item.isAvailable}
            style={{
              ...btnStyle,
              backgroundColor: item.isAvailable ? '#28a745' : '#ccc',
              color: 'white',
              cursor: item.isAvailable ? 'pointer' : 'not-allowed',
            }}
          >
            {item.isAvailable ? 'Request to Borrow' : 'Unavailable'}
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;