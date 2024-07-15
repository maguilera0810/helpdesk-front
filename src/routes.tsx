// src/routes.tsx
import React from 'react';
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard';
import Login from './pages/auth/Login';

import useAuthStore from './stores/useAuthStore';


const PublicRoute: React.FC = () => {
  const token = useAuthStore((state) => state.token);

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};




const ProtectedRoute: React.FC = () => {
  const token = useAuthStore((state) => state.token);

  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};




const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<App />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
