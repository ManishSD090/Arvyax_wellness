import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import MySessions from './Pages/MySessions';
import Account_Signing from './Pages/Account_Signing';
import Layout from './components/Layout';
import Schedule from './Pages/Schedule';
import Profile from './Pages/Profile';
import CreateSession from './Pages/CreateSession';
import SessionDetail from './Pages/SessionDetail';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/MySessions" element={<MySessions />} />
      <Route path="/Account_Signing" element={<Account_Signing />} />
      <Route path="/Schedule" element={<Schedule />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/create-session" element={<CreateSession />} />
      <Route path="/session/:id" element={<SessionDetail />} />
    </Routes>
  );
}

export default App;
