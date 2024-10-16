import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Paper, Tab, Typography } from '@mui/material';

import { useCategory } from '../../../../hooks/settings/useCategory';
import { useTask } from '../../../../hooks/support/useTask';
import { useUser } from '../../../../hooks/admin/useUser';
import { Task } from '../../../../interfaces/ModelInterfaces';
import categoryStore from '../../../../stores/settings/categoryStore';
import taskStore from '../../../../stores/support/taskStore';
import useUserStore from '../../../../stores/admin/useUserStore';
import TaskBaseInfo from './TaskBaseInfo';
import TaskSchedule from './TaskSchedule';

const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id && id !== 'addNew');

  const { setTask, clearState } = taskStore()
  const { setUsers } = useUserStore();
  const { setCategories } = categoryStore();

  const { users, fetchUsers } = useUser();
  const { categories, fetchCategories } = useCategory();
  const { task, error, success, method, fetchTask } = useTask();
  const [tabValue, setTabValue] = useState('0');


  useEffect(() => {
    fetchCategories({ "type__title": "habilidad" });
    fetchUsers({ "groups__id__in": [1, 2, 3] });
    return () => { clearState?.() }
  }, []);

  useEffect(() => {
    if (!isUpdate) {
      return
    }
    const taskId = parseInt(id as string);
    if (!isNaN(taskId)) {
      fetchTask(taskId);
    }
  }, [id]);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  useEffect(() => {
    if (task) {
      setTask(task);
    }
  }, [task]);

  useEffect(() => {
    if (success === true && task && (method === 'createTask' || method === 'updateTask')) {
      navigate(`/soporte/tareas/${task.id}/`);
    }
  }, [success]);

  const handleSuccess = (taskId: number) => {
    navigate(`/soporte/tareas/${taskId}/`);

  }


  const handleSubmit = (task: Partial<Task>) => {
    console.log(task);

    // if (isUpdate) {
    //   const taskId = parseInt(id as string);
    //   if (!isNaN(taskId)) {
    //     updateTask(taskId, task);
    //   }
    // } else {
    //   createTask(task);
    // }
  };


  const handleTabLisChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };


  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{isUpdate ? 'Actualizar Tarea' : 'Crear Tarea'}</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {/* {successTask && <Typography color="primary" sx={{ mb: 2 }}>Task {isUpdate ? 'updated' : 'created'} successfully!</Typography>} */}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="task form tabs">
            <Tab label="Información" value="0" />
            <Tab label="Agenda" value="1" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <TaskBaseInfo
            onSuccess={handleSuccess}
            onSubmit={handleSubmit} />
        </TabPanel>
        <TabPanel value="1">
          <TaskSchedule />
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default TaskForm;