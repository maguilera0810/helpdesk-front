// src/routes.tsx
import { FC } from 'react';

import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Campus from './pages/admin/Campus';
import RoleDetail from './pages/admin/role/RoleDetail';
import RoleList from './pages/admin/role/RoleList';
import UserDetail from './pages/admin/users/UserDetail';
import UserList from './pages/admin/users/UserList';
import Login from './pages/auth/Login';
import FAQs from './pages/FAQ';
import CategoryDetail from './pages/settings/category/CategoryDetail';
import CategoryList from './pages/settings/category/CategoryList';
import ListFaculties from './pages/settings/faculties/ListFaculties';
import PriorityDetail from './pages/settings/priority/PriorityDetail';
import PriorityList from './pages/settings/priority/PriorityList';
import Dashboard from './pages/support/dashboard/Dashboard';
import IssueDetail from './pages/support/issues/IssueDetail';
import IssueList from './pages/support/issues/IssueList';
import Planning from './pages/support/Planning';
import Projects from './pages/support/Projects';
import Reports from './pages/support/Reports';
import Settings from './pages/support/Settings';
import Statistics from './pages/support/Statistics';
import TaskTracking from './pages/support/task-tracking/TaskTracking';
import TaskDetail from './pages/support/task/TaskDetail';
import TaskList from './pages/support/task/TaskList';
import authStore from './stores/auth/authStore';


const PublicRoute: FC = () => {
  const token = authStore((state) => state.token);
  return token ? <Navigate to="/soporte/proyects" /> : <Outlet />;
};

const ProtectedRoute: FC = () => {
  const token = authStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

const AppRoutes: FC = () => (
  <Router>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/administracion/usuario/" element={<UserList />} />
        <Route path="/administracion/usuario/:id/" element={<UserDetail />} />
        <Route path="/admin/role/" element={<RoleList />} />
        <Route path="/admin/role/:roleId" element={<RoleDetail />} />

        <Route path="/soporte/tablero/" element={<Dashboard />} />
        <Route path="/soporte/tareas/" element={<TaskList />} />
        <Route path="/soporte/tareas/:id/" element={<TaskDetail />} />
        <Route path="/soporte/seguimiento-tareas/" element={<TaskTracking />} />
        <Route path="/soporte/proyects/" element={<Projects />} />
        <Route path="/soporte/planning/" element={<Planning />} />
        <Route path="/soporte/reports/" element={<Reports />} />
        <Route path="/soporte/problema/" element={<IssueList />} />
        <Route path="/soporte/problema/:id/" element={<IssueDetail />} />
        <Route path="/soporte/statistics/" element={<Statistics />} />

        <Route path="/configuraciones/categoria/" element={<CategoryList />} />
        <Route path="/configuraciones/categoria/:id/" element={<CategoryDetail />} />
        <Route path="/configuraciones/prioridad/" element={<PriorityList />} />
        <Route path="/configuraciones/prioridad/:priorityID/" element={<PriorityDetail />} />
        <Route path="/configuraciones/facultades/" element={<ListFaculties />} />
        <Route path="/configuraciones/campus/" element={<Campus />} />
        <Route path="/configuraciones/perfil/" element={<Settings />} />

        <Route path="/faqs" element={<FAQs />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
