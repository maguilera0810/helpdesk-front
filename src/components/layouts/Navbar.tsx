import { FC } from 'react';

import { AdminPanelSettings } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/Error';
import PersonIcon from '@mui/icons-material/Person';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Box, Drawer, List, Toolbar, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import uiStore from '../../stores/uiStore';
import NavItem from './NavItem';

const drawerWidth = 240;


const Navbar: FC = () => {

  const theme = useTheme();
  const { isDrawerOpen, toggleDrawer } = uiStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menu = (
    <>
      <Toolbar />
      <List>
        <NavItem text="Soporte" icon={<SupportAgentIcon />}>
          <NavItem text="Tablero" icon={<DashboardIcon />} path="/soporte/tablero/" />
          <NavItem text="Seguimiento" icon={<TimelineIcon />} path="/soporte/seguimiento-tareas/" />
          <NavItem text="Tareas" icon={<AssignmentIcon />} path="/soporte/tareas/" />
          <NavItem text="Problemas" icon={<ErrorIcon />} path="/soporte/problema/" />
        </NavItem>
        <NavItem text="Administración" icon={<AdminPanelSettings />}>
          <NavItem text="Usuarios" icon={<PersonIcon />} path="/administracion/usuario/" />
          <NavItem text="Roles" icon={<AssignmentIndIcon />} path="/admin/role/" />
        </NavItem>
        <NavItem text="Configuraciones" icon={<SettingsIcon />} >
          <NavItem text="Perfil" icon={<PersonIcon />} path="/configuraciones/perfil/" />
          <NavItem text="Categorias" icon={<CategoryIcon />} path="/configuraciones/categoria/" />
          <NavItem text="Prioridades" icon={<PriorityHighIcon />} path="/configuraciones/prioridad/" />
        </NavItem>
        <NavItem text="FAQs" icon={<QuestionAnswerIcon />} path="/faqs/" />
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
        variant={isMobile ? "temporary" : "persistent"} // desktop
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isDrawerOpen ? drawerWidth : 0,
            transition: 'width 4s',
          },
        }}
      >
        {menu}
      </Drawer>
    </Box>
  );
};

export default Navbar;