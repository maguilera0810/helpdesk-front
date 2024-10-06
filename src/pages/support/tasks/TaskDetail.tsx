import React from 'react';

import { Box, CssBaseline } from '@mui/material';
import TaskForm from '../../../components/forms/support/tasks/TaskForm.tsx';
import Layout from '../../../components/layouts/Layout.tsx';

const TaskDetail: React.FC = () => {
  return (
    <Layout>
      <TaskForm />
    </Layout>
  );
};


export default TaskDetail;
