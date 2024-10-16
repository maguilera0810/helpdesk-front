import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import RoleTable from '../../../components/tables/RoleTable';

const RoleList: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Roles
        </Typography>
        <RoleTable/>
      </Box>
    </Layout>
  );
};

export default RoleList;
