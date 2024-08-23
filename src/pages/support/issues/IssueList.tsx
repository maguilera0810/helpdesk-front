import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import IssueTable from '../../../components/tables/IssueTable';

const IssueList: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Issues
        </Typography>
        <IssueTable />
      </Box>
    </Layout>
  );
};

export default IssueList;
