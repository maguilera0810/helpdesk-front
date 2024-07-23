import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/layouts/Layout';

const Categories: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          Categories
        </Typography>
      </Box>
    </Layout>
  );
};

export default Categories;
