import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import GroupTable from '../../../components/tables/GroupTable'

const ListGroups: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Lisdato de Grupos
        </Typography>
        <GroupTable />
      </Box>
    </Layout>
  );
};

export default ListGroups;
