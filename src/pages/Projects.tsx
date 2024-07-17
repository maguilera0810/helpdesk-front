import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import Layout from '../components/layouts/Layout';


const Projects: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <Layout>

      <Box
        sx={{
          padding: 2,
          backgroundColor: '#fafafa',
        }}
      >
        <Typography variant="h1" gutterBottom>
          Proyectos
        </Typography>
        {user ? (
          <Box>
            <Typography variant="body1">Welcome, {user.firstName} {user.lastName}!</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="body1">Please log in to see your dashboard.</Typography>
        )}
      </Box>
    </Layout>
  );
};

export default Projects;
