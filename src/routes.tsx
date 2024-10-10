// src/routes.tsx
import { FC } from 'react';

import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Campus from './pages/admin/Campus';
import ListGroups from './pages/admin/groups/ListGroups';
import ListRoles from './pages/admin/roles/ListRoles';
import UserDetail from './pages/admin/users/UserDetail';
import UserList from './pages/admin/users/UserList';
import Login from './pages/auth/Login';
import FAQs from './pages/FAQ';
import CategoryDetail from './pages/settings/category/CategoryDetail';
import CategoryList from './pages/settings/category/CategoryList';
import ListFaculties from './pages/settings/faculties/ListFaculties';
import PriorityDetail from './pages/settings/priority/PriorityDetail';
import PriorityList from './pages/settings/priority/PriorityList';
import Dashboard from './pages/support/Dashboard';
import IssueDetail from './pages/support/issues/IssueDetail';
import IssueList from './pages/support/issues/IssueList';
import Planning from './pages/support/Planning';
import Projects from './pages/support/Projects';
import Reports from './pages/support/Reports';
import Settings from './pages/support/Settings';
import Statistics from './pages/support/Statistics';
import TaskTracking from './pages/support/task-tracking/TaskTracking';
import TaskDetail from './pages/support/tasks/TaskDetail';
import TaskList from './pages/support/tasks/TaskList';
import useAuthStore from './stores/useAuthStore';


const PublicRoute: FC = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Navigate to="/soporte/proyects" /> : <Outlet />;
};

const ProtectedRoute: FC = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

const AppRoutes: FC = () => (
  <Router>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/users/" element={<UserList />} />
        <Route path="/admin/users/:id/" element={<UserDetail />} />
        <Route path="/admin/groups/" element={<ListGroups />} />
        <Route path="/admin/roles/" element={<ListRoles />} />

        <Route path="/soporte/tablero/" element={<Dashboard />} />
        <Route path="/soporte/tareas/" element={<TaskList />} />
        <Route path="/soporte/tareas/:id/" element={<TaskDetail />} />
        <Route path="/soporte/seguimiento-tareas/" element={<TaskTracking />} />
        <Route path="/soporte/proyects/" element={<Projects />} />
        <Route path="/soporte/planning/" element={<Planning />} />
        <Route path="/soporte/reports/" element={<Reports />} />
        <Route path="/soporte/issue/" element={<IssueList />} />
        <Route path="/soporte/issue/:id/" element={<IssueDetail />} />
        <Route path="/soporte/statistics/" element={<Statistics />} />

        <Route path="/configuraciones/categorias/" element={<CategoryList />} />
        <Route path="/configuraciones/categorias/:id/" element={<CategoryDetail />} />
        <Route path="/configuraciones/prioridad/" element={<PriorityList />} />
        <Route path="/configuraciones/prioridad/:priorityID/" element={<PriorityDetail />} />
        <Route path="/configuraciones/facultades/" element={<ListFaculties />} />
        <Route path="/configuraciones/campus/" element={<Campus />} />
        <Route path="/configuraciones/perfil/" element={<Settings />} />

        <Route path="/faqs" element={<FAQs />} />

        {/* <Route path="/tickets/:ticketId" element={<TaskDetails />} /> */}
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
