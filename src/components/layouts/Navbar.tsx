import React from 'react';

import { AdminPanelSettings } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/Error';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkIcon from '@mui/icons-material/Work';


import { Box, Drawer, List, Toolbar } from '@mui/material';
import uiStore from '../../stores/uiStore';

import NavItem from './NavItem';

const drawerWidth = 240;


const Navbar: React.FC = () => {
  const isDrawerOpen = uiStore((state) => state.isDrawerOpen);
  const toggleDrawer = uiStore((state) => state.toggleDrawer);

  const drawer = (
    <>
      <Toolbar />
      <List>
        <NavItem text="Soporte" icon={<SupportAgentIcon />}>
          <NavItem text="Tablero" icon={<DashboardIcon />} path="/soporte/tablero/" />
          <NavItem text="Seguimiento" icon={<TimelineIcon />} path="/soporte/seguimiento-tareas/" />
          <NavItem text="Tareas" icon={<AssignmentIcon />} path="/soporte/tareas/" />
          <NavItem text="Problemas" icon={<ErrorIcon />} path="/soporte/issue/" />
          <NavItem text="Planificación" icon={<EventIcon />} path="/soporte/planning/" />
          <NavItem text="Proyectos" icon={<WorkIcon />} path="/soporte/proyects/" />
          <NavItem text="Estadísticas" icon={<BarChartIcon />} path="/soporte/statistics/" />
          <NavItem text="Reportes" icon={<InsertChartIcon />} path="/soporte/reports/" />
        </NavItem>
        <NavItem text="Administración" icon={<AdminPanelSettings />}>
          <NavItem text="Usuarios" icon={<PersonIcon />} path="/admin/users/" />
          <NavItem text="Grupos" icon={<GroupIcon />} path="/admin/groups/" />
          <NavItem text="Roles" icon={<AssignmentIndIcon />} path="/admin/roles/" />
        </NavItem>
        <NavItem text="Configuraciones" icon={<SettingsIcon />} >
          <NavItem text="Perfil" icon={<PersonIcon />} path="/configuraciones/perfil/" />
          <NavItem text="Categorias" icon={<CategoryIcon />} path="/configuraciones/categorias/" />
          <NavItem text="Prioridad" icon={<PriorityHighIcon />} path="/configuraciones/prioridad/" />
          <NavItem text="Campus" icon={<LocationCityIcon />} path="/configuraciones/campus/" />
          <NavItem text="Facultades" icon={<SchoolIcon />} path="/configuraciones/facultades/" />
        </NavItem>
        <NavItem text="FAQs" icon={<QuestionAnswerIcon />} path="/faqs/" />
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: isDrawerOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"// mobile
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="persistent" // desktop
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isDrawerOpen ? drawerWidth : 0,
            transition: 'width 0.3s',
          },
        }}
        onClose={toggleDrawer}
        open={isDrawerOpen}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;