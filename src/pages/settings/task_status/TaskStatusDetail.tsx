import { FC } from 'react';

import TaskStatusForm from "../../../components/forms/settings/task_status/TaskStatusForm";
import Layout from '../../../components/layouts/Layout';

const TaskStatusDetail: FC = () => {
  return (
    <Layout>
      <TaskStatusForm />
    </Layout>
  );
};

export default TaskStatusDetail;
