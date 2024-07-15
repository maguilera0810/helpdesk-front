// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './pages/auth/Login';
import Dashboard from './components/Dashboard';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  </Router>
);

export default AppRoutes;
