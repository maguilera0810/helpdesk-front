import { FC } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import TaskTable from '../../../components/tables/TaskTable';

const TaskList: FC = () => {
  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Tareas
      </Typography>
      <TaskTable />
    </Layout>
  );
};

export default TaskList;
