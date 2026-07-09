import { useState } from 'react';

function ExperienceForm({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(true);
  const [experienceList, setExperienceList] = useState(data || []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index] = { ...updatedList[index], [name]: value };
    setExperienceList(updatedList);
  };

  const handleAddIndividual = () => {
    setExperienceList([
      ...experienceList, 
      { companyName: '', positionTitle: '', responsibilities: '', dateFrom: '', dateUntil: '' }
    ]);
    setIsEditing(true);
  };

  const handleDeleteIndividual = (index) => {
    const updatedList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedList);
    onSave(updatedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    onSave(experienceList);
  };

  if (!isEditing && experienceList.length > 0) {
    return (
      <div className="form-section-saved">
        <h3>Practical Experience</h3>
        {experienceList.map((exp, index) => (
          <div key={index} className="saved-item-preview">
            <p><strong>Company:</strong> {exp.companyName}</p>
            <p><strong>Position:</strong> {exp.positionTitle}</p>
            <p><strong>Duration:</strong> {exp.dateFrom} - {exp.dateUntil}</p>
            <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>
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
      <h3>Practical Experience</h3>

      {experienceList.map((exp, index) => (
        <div key={index} className="form-entry-block">
          <h4>Job #{index + 1}</h4>

          <label>Company Name:</label>
          <input 
            type="text" 
            name="companyName" 
            value={exp.companyName} 
            onChange={(e) => handleChange(index, e)} 
            required 
          />

          <label>Position Title:</label>
          <input 
            type="text" 
            name="positionTitle" 
            value={exp.positionTitle} 
            onChange={(e) => handleChange(index, e)} 
            required 
          />

          <label>Main Responsibilities:</label>
          <textarea 
            name="responsibilities" 
            rows="3"
            value={exp.responsibilities} 
            onChange={(e) => handleChange(index, e)} 
            required 
          />

          <div className="date-range-grid">
            <div>
              <label>From:</label>
              <input 
                type="text" 
                name="dateFrom" 
                placeholder="MM/YYYY"
                value={exp.dateFrom} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
            <div>
              <label>Until:</label>
              <input 
                type="text" 
                name="dateUntil" 
                placeholder="MM/YYYY or Present"
                value={exp.dateUntil} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
          </div>

          {experienceList.length > 1 && (
            <button type="button" className="delete-btn" onClick={() => handleDeleteIndividual(index)}>
              Remove Job
            </button>
          )}
          <hr />
        </div>
      ))}

      <div className="button-group">
        <button type="button" onClick={handleAddIndividual}>Add Another Job</button>
        <button type="submit">Submit Section</button>
      </div>
    </form>
  );
}

export default ExperienceForm;