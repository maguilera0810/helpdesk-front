import { Box, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../../components/layouts/Layout';
import FacultiesTable from '../../../components/tables/FacultiesTable';

const ListFaculties: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Listado de Facultades
        </Typography>
        <FacultiesTable />
      </Box>
    </Layout>
  );
};

export default ListFaculties;
