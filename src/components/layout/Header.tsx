import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AppBar, Box, IconButton, Toolbar, Typography, Avatar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import useUIStore from '../../stores/useUIStore';

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
  const toggleDrawer = useUIStore((state) => state.toggleDrawer);

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
              {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()}
            </Avatar>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
