import { useState } from 'react';

function EducationForm({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(true);
  const [educationList, setEducationList] = useState(data || []);

  // Handle changes for a specific item in the array
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...educationList];
    updatedList[index] = { ...updatedList[index], [name]: value };
    setEducationList(updatedList);
  };

  // Add a new blank education entry
  const handleAddIndividual = () => {
    setEducationList([...educationList, { schoolName: '', titleOfStudy: '', dateOfStudy: '' }]);
    setIsEditing(true);
  };

  // Delete an entry completely
  const handleDeleteIndividual = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
    onSave(updatedList); // Push updates to App immediately
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    onSave(educationList); // Sync with master state in App.jsx
  };

  if (!isEditing && educationList.length > 0) {
    return (
      <div className="form-section-saved">
        <h3>Education Experience</h3>
        {educationList.map((edu, index) => (
          <div key={index} className="saved-item-preview">
            <p><strong>School:</strong> {edu.schoolName}</p>
            <p><strong>Degree/Field:</strong> {edu.titleOfStudy}</p>
            <p><strong>Date:</strong> {edu.dateOfStudy}</p>
            <hr />
          </div>
        ))}
        <div className="button-group">
          <button type="button" onClick={() => setIsEditing(true)}>Edit Section</button>
          <button type="button" onClick={handleAddIndividual}>Add More</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <h3>Education Experience</h3>
      
      {educationList.map((edu, index) => (
        <div key={index} className="form-entry-block">
          <h4>Entry #{index + 1}</h4>
          
          <label>School Name:</label>
          <input 
            type="text" 
            name="schoolName" 
            value={edu.schoolName} 
            onChange={(e) => handleChange(index, e)} 
            required 
          />

          <label>Title of Study:</label>
          <input 
            type="text" 
            name="titleOfStudy" 
            value={edu.titleOfStudy} 
            onChange={(e) => handleChange(index, e)} 
            required 
          />

          <label>Date of Study:</label>
          <input 
            type="text" 
            name="dateOfStudy" 
            placeholder="e.g., 2022 - 2026"
            value={edu.dateOfStudy} 
            onChange={(e) => handleChange(index, e)} 
            required 
          />

          {educationList.length > 1 && (
            <button type="button" className="delete-btn" onClick={() => handleDeleteIndividual(index)}>
              Remove Entry
            </button>
          )}
          <hr />
        </div>
      ))}

      <div className="button-group">
        <button type="button" onClick={handleAddIndividual}>Add Another School</button>
        <button type="submit">Submit Section</button>
      </div>
    </form>
  );
}

export default EducationForm;