// src/routes.tsx
import React from 'react';
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Users from './pages/admin/Users';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/management/Reports';
import Settings from './pages/management/Settings';
import Tickets from './pages/management/Tickets';
import useAuthStore from './stores/useAuthStore';
// import TicketDetails from './pages/management/TicketDetails';
// import UserProfile from './pages/management/UserProfile';
// import FAQs from './pages/management/FAQs';


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
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/tickets" element={<Tickets />} />
        <Route path="/dashboard/reports" element={<Reports />} />
        <Route path="/profile/settings" element={<Settings />} />
        {/* <Route path="/tickets/:ticketId" element={<TicketDetails />} /> */}
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        {/* <Route path="/faqs" element={<FAQs />} /> */}
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
