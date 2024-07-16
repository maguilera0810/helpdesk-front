import { Box, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';

const TicketDetails: React.FC = () => {
  const { ticketId } = useParams();

  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          Detalles del Ticket
        </Typography>
        <Typography variant="body1">
          ID del Ticket: {ticketId}
        </Typography>
      </Box>
    </Layout>
  );
};

export default TicketDetails;
