import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import PriorityTable from '../../../components/tables/PriorityTable';

const LocationList: FC = () => {
  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Locaciones
      </Typography>
      <PriorityTable />
    </Layout>
  );
};

export default LocationList;
