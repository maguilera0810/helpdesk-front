import React from 'react';

import { Box, CssBaseline } from '@mui/material';
import UserForm from '../../../components/forms/auth/UserForm.tsx';
import Layout from '../../../components/layouts/Layout.tsx';

const UserDetail: React.FC = () => {
  return (
    <Layout>
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CssBaseline />
        <UserForm />
      </Box>
    </Layout>
  );
};


export default UserDetail;
