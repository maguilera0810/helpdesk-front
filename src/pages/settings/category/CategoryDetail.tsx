import {FC} from 'react';

import { Box, CssBaseline } from '@mui/material';
import CategoryForm from '../../../components/forms/admin/category/CategoryForm';
import Layout from '../../../components/layouts/Layout';

const CategoryDetail: FC = () => {
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
        <CategoryForm />
      </Box>
    </Layout>
  );
};


export default CategoryDetail;
