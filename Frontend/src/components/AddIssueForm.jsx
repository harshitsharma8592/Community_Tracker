import React, { useState } from 'react';
import '../styles/ReportIssueForm.css'; // Import CSS file
import Map from './Map';

const ReportIssueForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Open');
  const [mapCenter, setMapCenter] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse location to lat/lng
    const [lat, lng] = location.split(',').map(Number);

    if (isNaN(lat) || isNaN(lng)) {
      setError('Invalid location format. Please use "lat,lng".');
      return;
    }

    setMapCenter({ lat, lng });

    try {
      const response = await fetch('http://localhost:8000/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, location: { lat, lng }, status }),
      });

      if (response.ok) {
        // Handle successful issue report (e.g., show a success message or redirect)
      } else {
        const errorData = await response.json();
        console.error('Error reporting issue:', errorData);
      }
    } catch (error) {
      console.error('Error reporting issue:', error);
    }
  };

  return (
    <div className="report-issue-form-container">
      <form className="report-issue-form" onSubmit={handleSubmit}>
        <h2>Report an Issue</h2>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location (lat,lng):</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button type="submit">Report Issue</button>
      </form>
      {mapCenter && (
        <div className="map-container">
          <Map center={mapCenter} markers={[mapCenter]} />
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ReportIssueForm;
