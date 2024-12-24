import React, { useEffect, useState } from 'react';
import '../styles/IssueList.css'; // Import CSS file
import Map from './Map';

const defaultCenter = {
  lat: 40.712776, // Default center (e.g., New York)
  lng: -74.005974,
};

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filterByLocation, setFilterByLocation] = useState(''); // State for filtering by location
  const [filterByStatus, setFilterByStatus] = useState(''); // State for filtering by issue status

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/api/issues/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setIssues(data);
        } else {
          console.error('Error fetching issues:', await response.json());
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  // Function to handle status update
  const handleStatusUpdate = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/issues/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: currentStatus })
      });
      if (response.ok) {
        const updatedIssue = await response.json();
        setIssues(prevIssues =>
          prevIssues.map(issue => issue._id === id ? updatedIssue : issue)
        );
      } else {
        const errorData = await response.json();
        console.error('Error updating issue status:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  // Function to handle upvote
  const handleUpvote = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/issues/${id}/upvote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const updatedIssue = await response.json();
        setIssues(prevIssues =>
          prevIssues.map(issue => issue._id === id ? updatedIssue : issue)
        );
      } else {
        console.error('Error upvoting issue:', await response.json());
      }
    } catch (error) {
      console.error('Error upvoting issue:', error);
    }
  };

  // Function to handle downvote
  const handleDownvote = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/issues/${id}/downvote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const updatedIssue = await response.json();
        setIssues(prevIssues =>
          prevIssues.map(issue => issue._id === id ? updatedIssue : issue)
        );
      } else {
        console.error('Error downvoting issue:', await response.json());
      }
    } catch (error) {
      console.error('Error downvoting issue:', error);
    }
  };

  // Filter issues based on search, location, and status criteria
  const filteredIssues = issues.filter(issue => {
    const matchesSearchTerm = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              issue.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = filterByLocation ? 
                            (issue.location && `${issue.location.lat},${issue.location.lng}`.includes(filterByLocation)) : 
                            true;

    const matchesStatus = filterByStatus ? issue.status === filterByStatus : true;

    return matchesSearchTerm && matchesLocation && matchesStatus;
  });

  const markers = filteredIssues
    .filter(issue => issue.location && typeof issue.location.lat === 'number' && typeof issue.location.lng === 'number') // Only include issues with valid location
    .map(issue => ({ lat: issue.location.lat, lng: issue.location.lng }));

  const resetFilters = () => {
    setSearchTerm('');
    setFilterByLocation('');
    setFilterByStatus('');
  };

  return (
    <div className="issue-list-container">
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Filter by location (lat,lng)..."
          value={filterByLocation}
          onChange={(e) => setFilterByLocation(e.target.value)}
          className="location-input"
        />
        <select
          value={filterByStatus}
          onChange={(e) => setFilterByStatus(e.target.value)}
          className="status-select"
        >
          <option value="">Filter by status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <button onClick={resetFilters} className="reset-button">
          Reset Filters
        </button>
      </div>
      <div className="issue-list">
        <h2>Issues</h2>
        <ul>
  {filteredIssues.length > 0 ? (
    filteredIssues.map(issue => (
      <li key={issue._id} className="issue-item">
        <h3 className="issue-title">{issue.title}</h3> {/* Added heading for title */}
        <div className="issue-description">{issue.description}</div>
        <div className="issue-location">
          {issue.location ? `Lat: ${issue.location.lat}, Lng: ${issue.location.lng}` : 'No location'}
        </div>
        <div className="issue-status">Status: {issue.status}</div>
        <div className="issue-createdAt">{new Date(issue.createdAt).toLocaleDateString()}</div>

        {/* Voting Buttons */}
        <div className="voting-buttons">
          <button onClick={() => handleUpvote(issue._id)} className="upvote-button">👍 {issue.upvotes}</button>
          <button onClick={() => handleDownvote(issue._id)} className="downvote-button">👎 {issue.downvotes}</button>
        </div>

        {/* Status Update Dropdown and Button */}
        <select
          defaultValue=""
          onChange={(e) => handleStatusUpdate(issue._id, e.target.value)}
          className="status-update-select"
        >
          <option value="">Change status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <button onClick={() => handleStatusUpdate(issue._id, filterByStatus)} className="update-status-button">
          Update Status
        </button>
      </li>
    ))
  ) : (
    <p>No issues found matching your criteria.</p>
  )}
</ul>
      </div>
      {markers.length > 0 && <Map center={defaultCenter} markers={markers} />}
    </div>
  );
};

export default IssueList;
