import MenuIcon from '@mui/icons-material/Menu';
import { Box, CssBaseline, IconButton, Toolbar } from '@mui/material';
import { motion } from 'framer-motion';
import { FC, ReactNode, useState } from 'react';
import useUIStore from '../../stores/useUIStore';
import Header from './Header';
import Navbar from './Navbar';

const drawerWidth = 240;
interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
  const toggleDrawer = useUIStore((state) => state.toggleDrawer);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: isDrawerOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerOpen={isDrawerOpen} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: 8,
          transition: 'width 0.3s', // Transición suave para el cambio de ancho
          ml: isDrawerOpen ? 0 : -drawerWidth,
        }}
      >
        <Toolbar />
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Layout;