import { ChangeEvent, FC, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Paper, Tab, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';

import { useTaskStatus } from '../../../../hooks/settings/useTaskStatus';
import { TaskStatus } from '../../../../interfaces/ModelInterfaces';
import { getSubmitMsg } from '../../../../utils/messageUtils';
import ColorPickerField from '../../fields/ColorPickerField';
import TextAreaField from '../../fields/TextAreaField';

const gridSizes = {
  xs: 12,
  sm: 6,
  md: 4,
  xl: 3,
};
const fieldProps = {
  fullWidth: true,
};

const TaskStatusForm: FC = () => {
  const navigate = useNavigate();
  const { taskStatusID } = useParams<{ taskStatusID: string }>();
  const { taskStatus, error: errorTaskStatus, loading: loadingTaskStatus, success, method,
    fetchTaskStatus, createTaskStatus, updateTaskStatus } = useTaskStatus();
  const [formData, setFormData] = useState<Partial<TaskStatus>>({});

  const [tabValue, setTabValue] = useState('0');
  const isUpdate = Boolean(taskStatusID && taskStatusID !== 'addNew');


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;
    name && handleInputValueChange(name, value);
  };

  const handleInputValueChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskStatus) {
      updateTaskStatus(taskStatus.id, formData);
    } else {
      createTaskStatus(formData);
    }
  };

  const handleTabLisChange = (e: SyntheticEvent, newValue: string) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  useEffect(() => {
    if (isUpdate && taskStatusID) {
      const id = parseInt(taskStatusID);
      !isNaN(id) && fetchTaskStatus(id);
    }
  }, []);

  useEffect(() => {
    taskStatus && setFormData({ ...taskStatus });
  }, [taskStatus]);

  useEffect(() => {
    if (success && taskStatus && (method === 'createTaskStatus' || method === 'updateTaskStatus')) {
      navigate(`/configuraciones/prioridad/${taskStatus.id}/`);
    }
  }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Estado Tarea
      </Typography>
      {errorTaskStatus && <Typography color="error" sx={{ mb: 2 }}>{errorTaskStatus}</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingTaskStatus} sx={{ mt: 3, mb: 2 }}>
        {getSubmitMsg(loadingTaskStatus, isUpdate)}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="taskStatus form tabs">
            <Tab label="Información" value="0" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid size={gridSizes} key={"title"}>
                <TextField
                  label="Título"
                  name="title"
                  value={formData.title ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid size={gridSizes} key={"description"}>
                <TextAreaField
                  label="Descripción"
                  name="description"
                  value={formData.description ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid size={gridSizes} key={"color"}>
                <ColorPickerField
                  label="Color"
                  name="Color"
                  value={formData.color ?? ""}
                  onChange={(e) => handleInputValueChange("color", e)}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default TaskStatusForm;