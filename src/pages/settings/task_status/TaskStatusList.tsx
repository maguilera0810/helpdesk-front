import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import TaskStatusTable from '../../../components/tables/TaskStatusTable';

const PriorityList: FC = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Estados de Tareas
      </Typography>
      <TaskStatusTable />
    </Layout>
  );
};

export default PriorityList;
