import { FC, useEffect } from 'react';

import TaskForm from '../../../components/forms/support/tasks/TaskForm.tsx';
import Layout from '../../../components/layouts/Layout.tsx';
import locationInfoStore from '../../../stores/settings/locationInfoStore.ts';
import taskCommentStore from '../../../stores/support/taskCommentStore.ts';

const TaskDetail: FC = () => {
  const { clearState: clearStateLocation } = locationInfoStore();
  const { clearState: clearStateComment } = taskCommentStore();
  useEffect(() => {
    return () => {
      clearStateLocation?.();
      clearStateComment?.();
    };
  }, [])

  return (
    <Layout>
      <TaskForm />
    </Layout>
  );
};


export default TaskDetail;
