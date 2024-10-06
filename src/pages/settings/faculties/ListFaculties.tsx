import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import FacultiesTable from '../../../components/tables/FacultiesTable';

const ListFaculties: FC = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Listado de Facultades
      </Typography>
      <FacultiesTable />

    </Layout>
  );
};

export default ListFaculties;
