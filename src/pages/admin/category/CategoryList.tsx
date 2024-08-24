import { Box, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../../components/layouts/Layout';
import CategoryTable from '../../../components/tables/CategoryTable';

const CategoryList: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">
          Listado de Categorias
        </Typography>
        <CategoryTable />
      </Box>
    </Layout>
  );
};

export default CategoryList;
