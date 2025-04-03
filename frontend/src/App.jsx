import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import MemberManagement from './components/MemberManagement';
import PlanManagement from './components/PlanManagement';
import ActiveUsersChart from './components/ActiveUsersChart';
import PlanReminder from './components/PlanReminder';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();  // Get the current route path

  return (
    <>
      {/* Hide Header only on Admin Login Page */}
      {location.pathname !== '/' && <Header />}

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<MemberManagement />} />
          <Route path="/plans" element={<PlanManagement />} />
          <Route path="/active-users" element={<ActiveUsersChart />} />
          <Route path="/plan-reminder" element={<PlanReminder />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
