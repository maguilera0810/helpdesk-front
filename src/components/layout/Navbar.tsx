import DashboardIcon from '@mui/icons-material/Dashboard';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface NavbarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ mobileOpen, handleDrawerToggle, drawerOpen }) => {
  const navigate = useNavigate();

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* Add more menu items here */}
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