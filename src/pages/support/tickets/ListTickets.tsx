import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import TicketTable from '../../../components/tables/TicketTable';

const ListTickets: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          ListTickets
        </Typography>
        <TicketTable/>
      </Box>
    </Layout>
  );
};

export default ListTickets;
