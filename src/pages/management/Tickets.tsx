import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/layout/Layout';

const Tickets: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          Tickets
        </Typography>
      </Box>
    </Layout>
  );
};

export default Tickets;
