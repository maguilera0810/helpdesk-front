import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import FacultiesTable from '../../../components/tables/FacultiesTable';

const ListFaculties: FC = () => {
  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Facultades
      </Typography>
      <FacultiesTable />

    </Layout>
  );
};

export default ListFaculties;
