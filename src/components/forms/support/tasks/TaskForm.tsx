import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useTask } from '../../../../hooks/useTask';
import { Task } from '../../../../interfaces/ModelInterfaces';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs, { Dayjs } from 'dayjs';


import { SelectField } from '../../fields';


const gridItemProps = {
  xs: 12,
  sm: 6,
  md: 4,
  xl: 3,
};

const fieldProps = {
  fullWidth: true,
};
const fieldStyles = {
  // height: '56px',
  '&:focus': {
    outline: 'none',
  }
};
const typeOptions = [ // TODO get options from backend server
  { value: 'preventive', label: 'Preventive' },
  { value: 'emergency', label: 'Emergency' },
];

const priorityOptions = [ // TODO get options from backend server
  { value: 'lowest', label: 'Lowest' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'highest', label: 'Highest' },
];

const statusOptions = [ // TODO get options from backend server
  { value: 'to_do', label: 'To do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'to_validate', label: 'To Validate' },
  { value: 'completed', label: 'Completed' },
];



const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { task, error, loading, success, fetchTask, createTask, updateTask } = useTask();
  const [formData, setFormData] = useState<Partial<Task>>({});
  const [tabValue, setTabValue] = useState('0');

  const isUpdate = id && id !== 'addNew';

  useEffect(() => {
    if (isUpdate) {
      const taskId = parseInt(id);
      if (!isNaN(taskId)) {
        fetchTask(taskId);
      }
    }
  }, [id]);

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        createdAt: task.createdAt ? dayjs(task.createdAt).toDate() : undefined,
        updatedAt: task.updatedAt ? dayjs(task.updatedAt).toDate() : undefined,
      });
    }
  }, [task]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (name: keyof Task) => (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date?.toDate() || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      const taskId = parseInt(id);
      if (!isNaN(taskId)) {
        await updateTask(taskId, formData);
      }
    } else {
      await createTask(formData);
    }
    // navigate('/admin/users');
  };
  const showField = () => {
    return "block";
    isUpdate ? "block" : "none"
  }

  const handleTabLisChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // useEffect(() => {
  //   success && setFormData({});
  // }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{isUpdate ? 'Update Task' : 'Create Task'}</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {success && <Typography color="primary" sx={{ mb: 2 }}>Task {isUpdate ? 'updated' : 'created'} successfully!</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
        {loading ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update Task' : 'Create Task')}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="task form tabs">
            <Tab label="Base Info" value="0" />
            <Tab label="Permissions" value="1" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid item {...gridItemProps} key={"title"}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"description"}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"code"} display={showField()}>
                <TextField
                  label="Code"
                  name="code"
                  disabled={true}
                  value={formData.code ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  required
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"type"}>
                <SelectField
                  label="Type"
                  name="type"
                  value={formData.type ?? typeOptions[0].value}
                  options={typeOptions}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                  height="56px"
                />
              </Grid>
              <Grid item {...gridItemProps} key={"status"}>
                <SelectField
                  label="Status"
                  name="status"
                  value={formData.status ?? statusOptions[0].value}
                  options={statusOptions}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                  height="56px"
                />
              </Grid>
              <Grid item {...gridItemProps} key={"priority"}>
                <SelectField
                  label="Priority"
                  name="priority"
                  value={formData.priority ?? priorityOptions[0].value}
                  options={priorityOptions}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                  height="56px"
                />
              </Grid>
              <Grid item {...gridItemProps} key={"createdAt"}>
                <DateTimeField
                  label="Created At"
                  disabled={true}
                  value={dayjs(formData.createdAt)}
                  onChange={handleDateChange('createdAt')}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"updatedAt"}>
                <DateTimeField
                  label="Updated At"
                  disabled={true}
                  value={dayjs(formData.updatedAt)}
                  onChange={handleDateChange('updatedAt')}
                  {...fieldProps}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default TaskForm;