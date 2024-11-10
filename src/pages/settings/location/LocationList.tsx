import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import LocationTable from '../../../components/tables/LocationTable';

const LocationList: FC = () => {
  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Ubicaciones
      </Typography>
      <LocationTable />
    </Layout>
  );
};

export default LocationList;
