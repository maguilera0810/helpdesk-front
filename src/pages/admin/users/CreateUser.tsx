import React from 'react';

import { Box, CssBaseline, Typography } from '@mui/material';
import UserCreateForm from '../../../components/forms/auth/UserCreateForm.tsx';
import Layout from '../../../components/layouts/Layout';

const CreateUser: React.FC = () => {
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
        <UserCreateForm />
      </Box>
    </Layout>
  );
};


export default CreateUser;
