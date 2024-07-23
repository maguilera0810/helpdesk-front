import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/layouts/Layout';

const Projects: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          Projects
        </Typography>
      </Box>
    </Layout>
  );
};

export default Projects;
