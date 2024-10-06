import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../components/layouts/Layout';

const Settings: FC = () => {
  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Configuraciones
      </Typography>
    </Layout>
  );
};

export default Settings;
