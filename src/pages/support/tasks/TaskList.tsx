import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import TaskTable from '../../../components/tables/TaskTable';

const TaskList: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Tareas
        </Typography>
        <TaskTable/>
      </Box>
    </Layout>
  );
};

export default TaskList;
