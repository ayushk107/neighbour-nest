// --- client/src/components/ItemForm.js ---
import React, { useState } from 'react';
import axios from 'axios';

// We receive a function 'onItemCreated' from the Dashboard
function ItemForm({ onItemCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tool', // Default category
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Our AuthContext already set the token header!
      const response = await axios.post('/api/items', formData);
      
      alert('Item created!');
      onItemCreated(response.data.item); // Send the new item up to the Dashboard
      
      // Clear the form
      setFormData({ title: '', description: '', category: 'Tool' });
      
    } catch (error) {
      console.error('Error creating item:', error.response.data);
      alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div className="form-container" style={{ marginBottom: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <h3>Lend an Item or Skill</h3>
        <input
          type="text"
          name="title"
          placeholder="Item Title (e.g. 'Power Drill', 'Coding Help')"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Tool">Tool</option>
          <option value="Appliance">Appliance</option>
          <option value="Skill">Skill</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItemForm;