import { Box, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../../components/layouts/Layout';
import UserTable from '../../../components/tables/UserTable';

const UserList: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">
          Usuarios
        </Typography>
        <UserTable />
      </Box>
    </Layout>
  );
};

export default UserList;
