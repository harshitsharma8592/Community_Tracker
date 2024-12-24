import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReportIssuePage from './pages/ReportIssuePage';
import IssueList from './components/IssueList';
import Footer from './components/Footer';
function App() {
  return (
    <>
    <Router>
     <HomePage/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/report-issue" element={<ReportIssuePage />} />
        <Route path='/issues' element = {<IssueList/>}/>

      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
