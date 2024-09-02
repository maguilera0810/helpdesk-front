import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs, { Dayjs } from 'dayjs';

import { useCategory } from '../../../../hooks/useCategory';
import { useTask } from '../../../../hooks/useTask';
import { useUser } from '../../../../hooks/useUser';
import { Task } from '../../../../interfaces/ModelInterfaces';
import { MultipleSelectField, SelectField } from '../../fields';
import TextAreaField from '../../fields/TextAreaField';

const gridItemProps = {
  xs: 12,
  sm: 6,
  md: 4,
  xl: 3,
};

const fieldProps = {
  fullWidth: true,
};

const typeOptions = [
  { value: 'preventive', label: 'Preventive' },
  { value: 'emergency', label: 'Emergency' },
];

const priorityOptions = [
  { value: 'lowest', label: 'Lowest' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'highest', label: 'Highest' },
];

const statusOptions = [
  { value: 'to_do', label: 'To do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'to_validate', label: 'To Validate' },
  { value: 'completed', label: 'Completed' },
];



const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategory();
  const { task, error: errorTask, loading: loadingTask, success: successTask, fetchTask, createTask, updateTask } = useTask();
  const { users, fetchUsers } = useUser();

  const [formData, setFormData] = useState<Partial<Task>>({});
  const [tabValue, setTabValue] = useState('0');

  const isUpdate = id && id !== 'addNew';

  useEffect(() => {
    fetchUsers({ "groups__id__in": [1, 2, 3] });
    fetchCategories({ "type": "skill" });
  }, []);

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


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
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
      {errorTask && <Typography color="error" sx={{ mb: 2 }}>{errorTask}</Typography>}
      {successTask && <Typography color="primary" sx={{ mb: 2 }}>Task {isUpdate ? 'updated' : 'created'} successfully!</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingTask} sx={{ mt: 3, mb: 2 }}>
        {loadingTask ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update Task' : 'Create Task')}
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
                <TextAreaField
                  label="Description"
                  name="description"
                  required={true}
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
              <Grid item {...gridItemProps} key={"responsible"}>
                <SelectField
                  label="Responsible"
                  name="responsible"
                  value={formData.responsible?.toString() ?? ''}
                  options={users.map(user => ({ value: user.id.toString(), label: `${user.firstName} ${user.lastName}` }))}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                  height="56px"
                />
              </Grid>
              <Grid item {...gridItemProps} key={"team"}>
                <MultipleSelectField
                  label="Team"
                  name="team"
                  value={formData.team?.map(e => e.toString()) ?? []}
                  options={users.map(user => ({ value: user.id.toString(), label: `${user.firstName} ${user.lastName}` }))}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                  height="auto"
                />
              </Grid>
              <Grid item {...gridItemProps} key={"categories"}>
                <MultipleSelectField
                  label="Categories"
                  name="categories"
                  value={formData.categories?.map(e => e.toString()) ?? []}
                  options={categories.map(category => ({
                    value: category.id.toString(),
                    label: category.title,
                    color: category.color,
                  }))}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
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