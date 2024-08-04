import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import RolesTable from '../../../components/tables/RolesTable';

const ListRoles: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Listado de Roles
        </Typography>
        <RolesTable/>
      </Box>
    </Layout>
  );
};

export default ListRoles;
