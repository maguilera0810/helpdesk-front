import React from 'react';

import { AdminPanelSettings, RequestQuote } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
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
        <NavItem text="Admin" icon={<AdminPanelSettings />}>
          <NavItem text="Usuarios" icon={<PeopleIcon />} path="/admin/users" />
        </NavItem>
        <NavItem text="Dashboard" icon={<DashboardIcon />} >
          <NavItem text="Proyectos" icon={<DashboardIcon />} path="/dashboard/proyects" />
          <NavItem text="Tickets" icon={<AssignmentIcon />} path="/dashboard/tickets" />
          <NavItem text="Solicitudes" icon={<RequestQuote />} path="/dashboard/requests" />
          <NavItem text="Informes" icon={<BarChartIcon />} path="/dashboard/reports" />
        </NavItem>
        <NavItem text="Configuraciones" icon={<SettingsIcon />} path="/profile/settings" />
        {/* <NavItem text="Perfil de Usuario" icon={<PersonIcon />} path="/profile" /> */}
        {/* <NavItem text="FAQs" icon={<QuestionAnswerIcon />} path="/faqs" /> */}
        {/* <NavItem text="Crear Ticket" icon={<AddCircleIcon />} path="/create-ticket" /> */}
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
        variant="temporary"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
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