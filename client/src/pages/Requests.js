// --- client/src/pages/Requests.js ---
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Requests() {
  const { token } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]); // Requests I sent
  const [receivedRequests, setReceivedRequests] = useState([]); // Requests I received
  const [loading, setLoading] = useState(true);

  // Fetch data when page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // We make TWO requests at once
        const [sentRes, receivedRes] = await Promise.all([
          axios.get('/api/requests/my-requests'),
          axios.get('/api/requests/received')
        ]);

        setMyRequests(sentRes.data);
        setReceivedRequests(receivedRes.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load requests');
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  // Handle Approve / Reject click
  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await axios.put(`/api/requests/${requestId}`, { status: newStatus });
      toast.success(`Request ${newStatus}!`);
      
      // Update the list instantly without refreshing
      setReceivedRequests(prev => prev.map(req => 
        req._id === requestId ? { ...req, status: newStatus } : req
      ));
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>Manage Requests</h2>

      {/* SECTION 1: Incoming Requests (For Owners) */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>🔻 Requests for MY Items</h3>
        {receivedRequests.length === 0 ? <p style={{ color: '#666' }}>No requests received yet.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {receivedRequests.map(req => (
              <li key={req._id} style={itemStyle}>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>{req.requester.username}</strong> wants to borrow: <br />
                    <span style={{ fontSize: '1.1rem', color: '#007bff' }}>{req.item.title}</span>
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>Status: <strong>{req.status}</strong></p>
                </div>
                
                {/* Only show buttons if status is 'pending' */}
                {req.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => handleStatusUpdate(req._id, 'approved')}
                      style={{ ...btnStyle, background: '#28a745' }}
                    >Approve</button>
                    <button 
                      onClick={() => handleStatusUpdate(req._id, 'rejected')}
                      style={{ ...btnStyle, background: '#dc3545' }}
                    >Reject</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* SECTION 2: Outgoing Requests (For Borrowers) */}
      <div>
        <h3>🔺 Requests I Sent</h3>
        {myRequests.length === 0 ? <p style={{ color: '#666' }}>You haven't requested anything.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {myRequests.map(req => (
              <li key={req._id} style={itemStyle}>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    Requested: <span style={{ fontWeight: 'bold' }}>{req.item.title}</span> <br/>
                    From: {req.owner.username}
                  </p>
                </div>
                <div style={{ 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px', 
                  fontWeight: 'bold',
                  color: 'white',
                  background: req.status === 'approved' ? '#28a745' : req.status === 'rejected' ? '#dc3545' : '#ffc107',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}>
                  {req.status.toUpperCase()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Simple styles for this page
const itemStyle = {
  border: '1px solid #eee', 
  padding: '1rem', 
  marginBottom: '1rem', 
  borderRadius: '8px', 
  background: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
};

const btnStyle = {
  color: 'white', 
  border: 'none', 
  padding: '0.5rem 1rem', 
  borderRadius: '4px', 
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Requests;