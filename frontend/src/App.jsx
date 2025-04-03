import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      <Header />
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
    </Router>
  );
}

export default App;