import React from 'react';

import { AdminPanelSettings } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkIcon from '@mui/icons-material/Work';



import { Box, Drawer, List, Toolbar } from '@mui/material';
import useUIStore from '../../stores/useUIStore';

import NavItem from './NavItem';

const drawerWidth = 240;


const Navbar: React.FC = () => {
  const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
  const toggleDrawer = useUIStore((state) => state.toggleDrawer);

  const drawer = (
    <>
      <Toolbar />
      <List>
        <NavItem text="Administración" icon={<AdminPanelSettings />}>
          <NavItem text="Usuarios" icon={<PersonIcon />} path="/admin/users/" />
          <NavItem text="Grupos" icon={<GroupIcon />} path="/admin/groups/" />
          <NavItem text="Roles" icon={<AssignmentIndIcon />} path="/admin/roles/" />
          <NavItem text="Campus" icon={<LocationCityIcon />} path="/admin/campus/" />
          <NavItem text="Facultades" icon={<SchoolIcon />} path="/admin/faculties/" />
        </NavItem>
        <NavItem text="Soporte" icon={<SupportAgentIcon />}>
          <NavItem text="Tablero" icon={<DashboardIcon />} path="/soporte/dashboard/" />
          <NavItem text="Tareas" icon={<AssignmentIcon />} path="/soporte/tareas/" />
          <NavItem text="Solicitudes" icon={<RequestQuoteIcon />} path="/soporte/requests/" />
          <NavItem text="Planificación" icon={<EventIcon />} path="/soporte/planning/" />
          <NavItem text="Proyectos" icon={<WorkIcon />} path="/soporte/proyects/" />
          <NavItem text="Estadísticas" icon={<BarChartIcon />} path="/soporte/statistics/" />
          <NavItem text="Reportes" icon={<InsertChartIcon />} path="/soporte/reports/" />
        </NavItem>
        <NavItem text="Configuraciones" icon={<SettingsIcon />} path="/profile/settings/" />
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