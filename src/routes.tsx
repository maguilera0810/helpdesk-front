// src/routes.tsx
import React from 'react';

import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Campus from './pages/admin/Campus';
import Faculties from './pages/admin/Faculties';
import Groups from './pages/admin/Groups';
import Roles from './pages/admin/Roles';
import CreateUser from './pages/admin/users/CreateUser';
import ListUsers from './pages/admin/users/ListUsers';
import Login from './pages/auth/Login';
import FAQs from './pages/FAQ';
import Dashboard from './pages/support/Dashboard';
import Planning from './pages/support/Planning';
import Projects from './pages/support/Projects';
import Reports from './pages/support/Reports';
import Requests from './pages/support/Requests';
import Settings from './pages/support/Settings';
import Statistics from './pages/support/Statistics';
import Tickets from './pages/support/Tickets';


import useAuthStore from './stores/useAuthStore';
// import TicketDetails from './pages/management/TicketDetails';
// import UserProfile from './pages/management/UserProfile';
// import FAQs from './pages/management/FAQs';


const PublicRoute: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Navigate to="/soporte/proyects" /> : <Outlet />;
};

const ProtectedRoute: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route element={<ProtectedRoute />}>
        {/* <Route path="/" element={<Projects />} /> */}
        <Route path="/admin/users" element={<ListUsers />} />
        <Route path="/admin/users/create" element={<CreateUser />} />
        <Route path="/admin/groups" element={<Groups />} />
        <Route path="/admin/roles" element={<Roles />} />
        <Route path="/admin/campus" element={<Campus />} />
        <Route path="/admin/faculties" element={<Faculties />} />
        <Route path="/soporte/dashboard" element={<Dashboard />} />
        <Route path="/soporte/tickets" element={<Tickets />} />
        <Route path="/soporte/proyects" element={<Projects />} />
        <Route path="/soporte/planning" element={<Planning />} />
        <Route path="/soporte/reports" element={<Reports />} />
        <Route path="/soporte/requests" element={<Requests />} />
        <Route path="/soporte/statistics" element={<Statistics />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/faqs" element={<FAQs />} />

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
