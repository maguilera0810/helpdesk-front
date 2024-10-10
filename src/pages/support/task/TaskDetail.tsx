import { FC } from 'react';

import TaskForm from '../../../components/forms/support/tasks/TaskForm.tsx';
import Layout from '../../../components/layouts/Layout.tsx';

const TaskDetail: FC = () => {
  return (
    <Layout>
      <TaskForm />
    </Layout>
  );
};


export default TaskDetail;
