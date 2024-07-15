import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
interface NavItemProps {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, icon, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isActive = location.pathname === path;

  return (
    <ListItem
      button
      onClick={() => navigate(path)}
      sx={{
        backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: isActive ? theme.palette.primary.main : 'inherit',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={text}
        sx={{
          color: isActive ? theme.palette.primary.main : 'inherit',
        }}
      />
    </ListItem>
  );
};

export default NavItem;
