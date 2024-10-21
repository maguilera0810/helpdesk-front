import React from 'react';

import { AdminPanelSettings } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/Error';
import PersonIcon from '@mui/icons-material/Person';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TimelineIcon from '@mui/icons-material/Timeline';


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
          <NavItem text="Problemas" icon={<ErrorIcon />} path="/soporte/problema/" />
          {/* <NavItem text="Planificación" icon={<EventIcon />} path="/soporte/planning/" /> */}
          {/* <NavItem text="Proyectos" icon={<WorkIcon />} path="/soporte/proyects/" /> */}
          {/* <NavItem text="Estadísticas" icon={<BarChartIcon />} path="/soporte/statistics/" /> */}
          {/* <NavItem text="Reportes" icon={<InsertChartIcon />} path="/soporte/reports/" /> */}
        </NavItem>
        <NavItem text="Administración" icon={<AdminPanelSettings />}>
          <NavItem text="Usuarios" icon={<PersonIcon />} path="/administracion/usuario/" />
          <NavItem text="Roles" icon={<AssignmentIndIcon />} path="/admin/role/" />
        </NavItem>
        <NavItem text="Configuraciones" icon={<SettingsIcon />} >
          <NavItem text="Perfil" icon={<PersonIcon />} path="/configuraciones/perfil/" />
          <NavItem text="Categorias" icon={<CategoryIcon />} path="/configuraciones/categoria/" />
          <NavItem text="Prioridades" icon={<PriorityHighIcon />} path="/configuraciones/prioridad/" />
          <NavItem text="Estado Tarea" icon={<AssignmentTurnedInIcon />} path="/configuraciones/estado-tarea/" />
          <NavItem text="Estado Problema" icon={<AssignmentLateIcon />} path="/configuraciones/estado-problema/" />
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