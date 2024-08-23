import React from 'react';

import { Box, CssBaseline } from '@mui/material';
import IssueForm from '../../../components/forms/support/issue/IssueForm';
import Layout from '../../../components/layouts/Layout';

const IssueDetail: React.FC = () => {
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
        <IssueForm />
      </Box>
    </Layout>
  );
};


export default IssueDetail;
