import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavItemProps {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, icon, path }) => {
  const navigate = useNavigate();

  return (
    <ListItem button onClick={() => navigate(path)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default NavItem;
