import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import CategoryTable from '../../../components/tables/CategoryTable';

const CategoryList: FC = () => {
  return (
    <Layout>
      <Typography variant="h1">
        Categorias
      </Typography>
      <CategoryTable />
    </Layout>
  );
};

export default CategoryList;
