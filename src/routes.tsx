// src/routes.tsx
import React from 'react';
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ListUsers from './pages/admin/ListUsers';
import Login from './pages/auth/Login';
import Projects from './pages/Projects';
import Reports from './pages/management/Reports';
import Settings from './pages/management/Settings';
import Tickets from './pages/management/Tickets';
import Requests from './pages/management/Requests';
import useAuthStore from './stores/useAuthStore';
// import TicketDetails from './pages/management/TicketDetails';
// import UserProfile from './pages/management/UserProfile';
// import FAQs from './pages/management/FAQs';


const PublicRoute: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Navigate to="/dashboard/proyects" /> : <Outlet />;
};




const ProtectedRoute: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};




const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Projects />} />
        <Route path="/admin/users" element={<ListUsers />} />
        <Route path="/dashboard/proyects" element={<Projects />} />
        <Route path="/dashboard/tickets" element={<Tickets />} />
        <Route path="/dashboard/reports" element={<Reports />} />
        <Route path="/dashboard/requests" element={<Requests />} />
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
