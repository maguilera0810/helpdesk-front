import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import PriorityTable from '../../../components/tables/PriorityTable';

const PriorityList: FC = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Prioridades
      </Typography>
      <PriorityTable />
    </Layout>
  );
};

export default PriorityList;
