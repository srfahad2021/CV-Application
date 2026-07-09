import { useState } from 'react';
import GeneralInfoForm from './Components/GeneralInfoForm';
import EducationForm from './Components/EducationForm';
import ExperienceForm from './Components/ExperienceForm';
import CvPreview from './Components/CvPreview';

import './styles/App.css';
import './styles/Form.css';
import './styles/Preview.css';

function App() {
  // 1. Core State Definition for the whole CV
  const [generalInfo, setGeneralInfo] = useState({
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '+1 234 567 890'
  });

  const [education, setEducation] = useState([
    {
      schoolName: 'University of Engineering',
      titleOfStudy: 'Bachelor of Computer Science',
      dateOfStudy: '2022 - Present'
    }
  ]);

  const [experience, setExperience] = useState([
    {
      companyName: 'Tech Solutions Inc.',
      positionTitle: 'Junior Developer Intern',
      responsibilities: 'Assisted in building responsive layouts.\nCollaborated with cross-functional software teams.',
      dateFrom: '05/2025',
      dateUntil: 'Present'
    }
  ]);

  // 2. State Updaters (passed down as callbacks to child components)
  const handleGeneralInfoSave = (newData) => {
    setGeneralInfo(newData);
  };

  const handleEducationSave = (newEducationList) => {
    setEducation(newEducationList);
  };

  const handleExperienceSave = (newExperienceList) => {
    setExperience(newExperienceList);
  };

  return (
    <div className="app-container">
      {/* LEFT COLUMN: The data input workspace */}
      <div className="form-container">
        <h2> FahadsCV Editor</h2>
        
        <GeneralInfoForm 
          data={generalInfo} 
          onSave={handleGeneralInfoSave} 
        />
        
        <EducationForm 
          data={education} 
          onSave={handleEducationSave} 
        />
        
        <ExperienceForm 
          data={experience} 
          onSave={handleExperienceSave} 
        />
      </div>

      {/* RIGHT COLUMN: The live auto-updating sheet */}
      <div className="preview-container">
        <CvPreview 
          generalInfo={generalInfo} 
          education={education} 
          experience={experience} 
        />
      </div>
    </div>
  );
}

export default App;