import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import IssueTable from '../../../components/tables/IssueTable';

const IssueList: FC = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Problemas
      </Typography>
      <IssueTable />
    </Layout>
  );
};

export default IssueList;
