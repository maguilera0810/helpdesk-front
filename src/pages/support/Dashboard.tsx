import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../components/layouts/Layout';

const Dashboard: FC = () => {
  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Dashboard
      </Typography>
    </Layout>
  );
};

export default Dashboard;
