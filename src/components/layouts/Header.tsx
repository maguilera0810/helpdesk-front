import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AppBar, Box, IconButton, Toolbar, Typography, Avatar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from '../../stores/auth/authStore';
import uiStore from '../../stores/uiStore';

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = authStore((state) => state.user);
  const logout = authStore((state) => state.logout);
  const isDrawerOpen = uiStore((state) => state.isDrawerOpen);
  const toggleDrawer = uiStore((state) => state.toggleDrawer);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          {isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          UTMACH HelpDesk
        </Typography>
        {user && (
          <Box display="flex" alignItems="center">
            <Typography variant="h6" noWrap component="div" marginRight={1}>
              {user.email}
            </Typography>
            <Avatar sx={{ bgcolor: "blue", marginRight: 2 }} onClick={handleLogout}>
              {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()}
            </Avatar>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
