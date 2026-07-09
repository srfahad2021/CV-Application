import html2pdf from 'html2pdf.js';

function CvPreview({ generalInfo, education, experience }) {
  
  // PDF download handler
  const downloadCV = () => {
    const element = document.getElementById('cv-pdf-target');
    
    // Configurations for exact A4 rendering output
    const options = {
      margin: 0,
      filename: `${generalInfo.name.toLowerCase().replace(/\s+/g, '_')}_cv.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(options).from(element).save();
  };

  return (
    <>
      {/* The Printable A4 Sheet container */}
      <div className="cv-paper" id="cv-pdf-target">
        
        {/* General Info Header */}
        <header className="cv-header">
          <h1>{generalInfo.name || 'Your Name'}</h1>
          <div className="cv-contact-info">
            {generalInfo.email && <span>📧 {generalInfo.email}</span>}
            {generalInfo.phone && <span>📞 {generalInfo.phone}</span>}
          </div>
        </header>

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-title">Education</div>
            {education.map((edu, idx) => (
              <div key={idx} className="cv-item">
                <div className="cv-item-row">
                  <span>{edu.schoolName || 'Institution Name'}</span>
                  <span>{edu.dateOfStudy || 'Dates'}</span>
                </div>
                <div className="cv-item-subrow">
                  <span>{edu.titleOfStudy || 'Degree / Field of Study'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-title">Professional Experience</div>
            {experience.map((exp, idx) => (
              <div key={idx} className="cv-item">
                <div className="cv-item-row">
                  <span>{exp.companyName || 'Company Name'}</span>
                  <span>
                    {exp.dateFrom || 'Start'} — {exp.dateUntil || 'End'}
                  </span>
                </div>
                <div className="cv-item-subrow">
                  <span>{exp.positionTitle || 'Position Title'}</span>
                </div>
                {exp.responsibilities && (
                  <p className="cv-responsibilities">{exp.responsibilities}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Trigger Button pinned outside the sheet context */}
      <button className="download-btn" onClick={downloadCV}>
        Download PDF
      </button>
    </>
  );
}

export default CvPreview;