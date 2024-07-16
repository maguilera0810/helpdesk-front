import { Box, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../components/layouts/Layout';

const Settings: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          Configuraciones
        </Typography>
      </Box>
    </Layout>
  );
};

export default Settings;
