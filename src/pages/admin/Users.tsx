import { Box, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../components/layout/Layout';

const Users: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          Usuarios ss
        </Typography>
      </Box>
    </Layout>
  );
};

export default Users;
