import MenuIcon from '@mui/icons-material/Menu';
import { Box, CssBaseline, IconButton, Toolbar } from '@mui/material';
import { motion } from 'framer-motion';
import { FC, ReactNode, useState } from 'react';
import uiStore from '../../stores/uiStore';
import Header from './Header';
import Navbar from './Navbar';

const drawerWidth = 240;
interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const isDrawerOpen = uiStore((state) => state.isDrawerOpen);

  return (
    <Box id="box-layout" sx={{
      display: 'flex',
      minHeight: '100vh',
      minWidth: '100vw',
      // overflow: 'auto',
    }}>
      <CssBaseline />
      <Header />
      <Navbar />
      <Box
        id="main-box"
        component="main"
        sx={{
          // backgroundColor: "#BB0000",
          flexGrow: 1,
          minHeight: '100vh',
          width: { sm: `calc(100vw - ${isDrawerOpen ? drawerWidth : 0}px)` },
          transition: 'margin 0.3s',
          padding:1,
          // position: 'relative'
        }}
      >
        <Toolbar />
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

