import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
const HomePage = () => {
  
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/login'); // Redirect to login page
  };
  return (
    <div>
      <div className='h1'>
         <h1>Welcome to the Issue Tracker</h1>
      </div>
      <div className='nav'>
        <nav>
          <ul>
            <li className='border'><Link to="/login" className='link'>Login</Link></li>
            <li className='border'><Link to="/register" className='link'>Register</Link></li>
            <li className='border'><Link to="/report-issue" className='link'>Report an Issue</Link></li>
            <li className='border'><Link to="/issues" className='link'>View Issues</Link></li>
            <li ><button onClick={handleLogout} className='btn'>Logout</button></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
