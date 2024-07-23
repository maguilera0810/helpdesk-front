import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../components/layouts/Layout';

const FAQ: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          FAQs
        </Typography>
      </Box>
    </Layout>
  );
};

export default FAQ;
