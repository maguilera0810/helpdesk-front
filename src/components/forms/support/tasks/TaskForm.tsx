import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Paper, Tab, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { latLng } from 'leaflet';
import { useUser } from '../../../../hooks/admin/useUser';
import { useCategory } from '../../../../hooks/settings/useCategory';
import { useLocationInfo } from '../../../../hooks/settings/useLocationInfo';
import { useTask } from '../../../../hooks/support/useTask';
import { useTaskComment } from '../../../../hooks/support/useTaskComment';
import useUserStore from '../../../../stores/admin/useUserStore';
import categoryStore from '../../../../stores/settings/categoryStore';
import taskCommentStore from '../../../../stores/support/taskCommentStore';
import taskStore from '../../../../stores/support/taskStore';
import { BaseChangeMethod } from '../../../../types/methodTypes';
import { getSubmitMsg } from '../../../../utils/messageUtils';
import CommentList from '../../../comments/CommentList';
import MapComponent from '../../../maps/MapComponent';
import { SelectField } from '../../fields';
import TaskBaseInfo from './TaskBaseInfo';
import TaskSchedule from './TaskSchedule';

const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id && id !== 'addNew');
  const { loading, updateTask } = useTask();
  const { users, fetchUsers } = useUser();
  const { categories, fetchCategories } = useCategory();
  const { task, error, success, method, fetchTask } = useTask();
  const { locations, location, setLocation, setPosition } = useLocationInfo();

  const { setTask, clearState } = taskStore()
  const { setUsers } = useUserStore();
  const { setCategories } = categoryStore();
  const { taskComments, fetchTaskComments } = useTaskComment();
  const { setTask: setTaskComentStore, setTaskComments, clearState: clearStateComment } = taskCommentStore();


  const [tabValue, setTabValue] = useState('0');

  useEffect(() => {
    fetchCategories({ "type__title": "habilidad" });
    fetchUsers({ "groups__id__in": [1, 2, 3] });
    return () => {
      clearState?.();
      clearStateComment?.();
    }
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
    if (!task) return;
    setTask(task);
    setTaskComentStore(task);
    handdleFetchComments();
    setLocation(locations.find(e => e.id === task.location));
  }, [task]);

  useEffect(() => {
    taskComments.length && setTaskComments(taskComments);
  }, [taskComments])

  useEffect(() => {
    if (task && success && (method === 'createTask' || method === 'updateTask')) {
      navigate(`/soporte/tareas/${task.id}/`);
    }
  }, [success]);

  const handleSuccess = (taskId: number) => {
    navigate(`/soporte/tareas/${taskId}/`);

  }

  const handleTabLisChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const handdleFetchComments = () => {
    if (!task) { return; }
    fetchTaskComments({ "task__id": task.id, "order_by": "-created_at" });
  }

  const handleLocationChange: BaseChangeMethod<any> = (e) => {
    const { name, value } = e.target;
    if (name === 'location' && typeof value === 'number') {
      setLocation(locations.find(e => e.id === value));
    }
  };
  const handleSubmitLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      const taskId = parseInt(id as string);
      if (!isNaN(taskId)) {
        updateTask(taskId, { location: location?.id });
      }
    }
  };


  useEffect(() => {
    location && setPosition(latLng(location.lat, location.lng));
  }, [location]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{isUpdate ? 'Actualizar Tarea' : 'Crear Tarea'}</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {/* {successTask && <Typography color="primary" sx={{ mb: 2 }}>Task {isUpdate ? 'updated' : 'created'} successfully!</Typography>} */}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="task form tabs">
            <Tab label="Información" value="0" />
            <Tab label="Agenda" value="1" disabled={!isUpdate} />
            <Tab label="Ubicación" value="2" disabled={!isUpdate} />
          </TabList>
        </Box>
        <TabPanel value="0">
          <TaskBaseInfo
            onSuccess={handleSuccess} />
        </TabPanel>
        <TabPanel value="1">
          <TaskSchedule />
        </TabPanel>
        <TabPanel value="2">
          <Box component="form" sx={{ mt: 0 }}>
            <Button onClick={handleSubmitLocation} variant="contained" color="primary" disabled={loading} sx={{ mb: 2 }}>
              {getSubmitMsg(loading, isUpdate)}
            </Button>
            <Grid container spacing={{ xs: 1 }} key={"location"} >
              <SelectField
                label='Ubicación'
                name='location'
                options={locations.map(e => ({ label: e.title, value: e.id }))}
                value={location?.id ?? ''}
                onChange={handleLocationChange}
              />
              {location && <MapComponent />}
            </Grid>
          </Box>
        </TabPanel>
        {task && <CommentList type='task' onSave={handdleFetchComments} />}
      </TabContext>
    </Paper>
  );
};

export default TaskForm;