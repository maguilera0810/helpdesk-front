import React from 'react';

import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { Drawer, List, Toolbar } from '@mui/material';

import NavItem from './NavItem';

const drawerWidth = 240;

interface NavbarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ mobileOpen, handleDrawerToggle, drawerOpen }) => {

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <NavItem text="Usuarios" icon={<PeopleIcon />} path="/admin/users" />
        <NavItem text="Dashboard" icon={<DashboardIcon />} path="/dashboard" />
        <NavItem text="Tickets" icon={<AssignmentIcon />} path="/dashboard/tickets" />
        <NavItem text="Informes" icon={<BarChartIcon />} path="/dashboard/reports" />
        <NavItem text="Configuraciones" icon={<SettingsIcon />} path="/profile/settings" />
        {/* <NavItem text="Perfil de Usuario" icon={<PersonIcon />} path="/profile" /> */}
        {/* <NavItem text="FAQs" icon={<QuestionAnswerIcon />} path="/faqs" /> */}
        {/* <NavItem text="Crear Ticket" icon={<AddCircleIcon />} path="/create-ticket" /> */}
      </List>
    </div>
  );

  return (
    <nav aria-label="mailbox folders">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
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
            width: drawerOpen ? drawerWidth : 0,
            transition: 'width 0.3s',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default Navbar;