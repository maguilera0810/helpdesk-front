import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';

import useNavbarStore from '../../stores/useNavbarStore';
interface NavItemProps {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ text, icon, path, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toggleItem = useNavbarStore((state) => state.toggleItem);
  const isItemExpanded = useNavbarStore((state) => state.isItemExpanded);
  const theme = useTheme();
  const [expanded, setExpanded] = useState(isItemExpanded(text));


  const handleClick = () => {
    if (path) {
      navigate(path);
    } else {
      toggleItem(text);
      setExpanded(isItemExpanded(text));
    }
  };
  useEffect(() => { }, [isItemExpanded]);

  const isActive = path && location.pathname === path;



  return (
    <>
      <ListItem onClick={handleClick}
        sx={{
          backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
          height: 35,
          cursor: "pointer",
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}>{icon}</ListItemIcon>
        <ListItemText primary={text}
          sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }} />
        {children && (expanded ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {children && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {children}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default NavItem;
