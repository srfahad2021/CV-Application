import { useState } from 'react';

function GeneralInfoForm({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState(data);

  // Handle live input updates locally
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit button handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    onSave(formData); // Push the updated data back up to App.jsx
  };

  // Edit button handler
  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!isEditing) {
    // If NOT editing, display information as static text with an Edit button
    return (
      <div className="form-section-saved">
        <h3>General Information</h3>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <button type="button" onClick={handleEdit}>Edit Section</button>
      </div>
    );
  }

  // If editing, display the actual form fields
  return (
    <form onSubmit={handleSubmit} className="form-section">
      <h3>General Information</h3>
      
      <label>Name:</label>
      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        required 
      />

      <label>Email:</label>
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />

      <label>Phone:</label>
      <input 
        type="tel" 
        name="phone" 
        value={formData.phone} 
        onChange={handleChange} 
        required 
      />

      <button type="submit">Submit Section</button>
    </form>
  );
}

export default GeneralInfoForm;