import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import IssueStatusTable from '../../../components/tables/IssueStatusTable';

const IssueStatusList: FC = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Estados de Problemas
      </Typography>
      <IssueStatusTable />
    </Layout>
  );
};

export default IssueStatusList;
