import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CommunitySection from './pages/CommunitySection';
import CrimeAnalysis from './pages/CrimeAnalysis';
import FIRRegistration from './pages/FIRRegistration';
import CrimeDashboard from './pages/CrimeDashboard';
import LegalChatbot from './pages/LegalChatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community-section" element={<CommunitySection />} />
        <Route path="/crime-analysis" element={<CrimeAnalysis />} />
        <Route path="/fir-registration" element={<FIRRegistration />} />
        <Route path="/crime-dashboard" element={<CrimeDashboard />} />
        <Route path="/legal-chatbot" element={<LegalChatbot />} />
      </Routes>
    </Router>
  );
}

export default App;