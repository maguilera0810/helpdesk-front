import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs, { Dayjs } from 'dayjs';

import { useCategory } from '../../../../hooks/useCategory';
import { useIssue } from '../../../../hooks/useIssue';
import { Issue } from '../../../../interfaces/ModelInterfaces';
import DialogComponent from '../../../dialogs/DialogComponent';
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
  { value: 'received', label: 'Recibido' },
  { value: 'task_created', label: 'Tarea Creada' },
  { value: 'rejected', label: 'Rechazado' },
  { value: 'to_validate', label: 'Por Validar' },
  { value: 'completed', label: 'Completed' },
];



const IssueForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategory();
  const { issue, createdTask, error: errorIssue, loading: loadingIssue, success: successIssue,
    fetchIssue, createIssue, updateIssue, createTask } = useIssue();

  const [formData, setFormData] = useState<Partial<Issue>>({});
  const [tabValue, setTabValue] = useState('0');
  const [openDialogCreateTask, setOpenDialogCreateTask] = useState<boolean>(false);
  const [openDialogRejectIssue, setOpenDialogRejectIssue] = useState<boolean>(false);

  const isUpdate = id && id !== 'addNew';
  const toogleOpenDialog = () => {
    setOpenDialogCreateTask((e) => !e)
  }

  useEffect(() => {
    fetchCategories({ "type": "skill" });
  }, []);


  useEffect(() => {
    if (isUpdate) {
      const issueId = parseInt(id);
      if (!isNaN(issueId)) {
        fetchIssue(issueId);
      }
    }
  }, [id]);

  useEffect(() => {
    if (issue) {
      setFormData({
        ...issue,
        createdAt: issue.createdAt ? dayjs(issue.createdAt).toDate() : undefined,
        updatedAt: issue.updatedAt ? dayjs(issue.updatedAt).toDate() : undefined,
      });
    }
  }, [issue]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (name: keyof Issue) => (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date?.toDate() || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      const issueId = parseInt(id);
      if (!isNaN(issueId)) {
        await updateIssue(issueId, formData);
      }
    } else {
      await createIssue(formData);
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

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpenDialogCreateTask(true); // Open the confirmation dialog
  };

  const handleConfirmCreateTask = async () => {
    setOpenDialogCreateTask(false); // Close the confirmation dialog
    issue?.id && createTask(issue.id)
    console.log("tarea creada :D");
  }

  useEffect(() => {
    if (createdTask) {
      navigate(`/soporte/tareas/${createdTask}/`);
    }
  }, [createdTask])

  const handleRejectIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpenDialogRejectIssue(true); // Open the confirmation dialog
  };

  const handleConfirmRejectIssue = async () => {
    setOpenDialogRejectIssue(false); // Close the confirmation dialog
    console.log("issue cancelado :'v");
  }

  // useEffect(() => {
  //   success && setFormData({});
  // }, [success]);

  const getDialogs = () => (
    <>
      <DialogComponent
        open={openDialogCreateTask}
        variant={'confirm'}
        title="Estas seguro de crear una tarea"
        onConfirm={handleConfirmCreateTask}
        onCancel={() => setOpenDialogCreateTask(false)} />
      <DialogComponent
        open={openDialogRejectIssue}
        variant={'alert'}
        title="Estas seguro de rechazar"
        onConfirm={handleConfirmRejectIssue}
        onCancel={() => setOpenDialogRejectIssue(false)} />
    </>
  )

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      {getDialogs()}
      <Typography variant="h4" sx={{ mb: 2 }}>{isUpdate ? 'Update Issue' : 'Create Issue'}</Typography>
      {errorIssue && <Typography color="error" sx={{ mb: 2 }}>{errorIssue}</Typography>}
      {successIssue && <Typography color="primary" sx={{ mb: 2 }}>Issue {isUpdate ? 'updated' : 'created'} successfully!</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingIssue} sx={{ mt: 3, mb: 2 }}>
        {loadingIssue ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update Issue' : 'Create Issue')}
      </Button>
      <Button onClick={handleCreateTask} variant="contained" color="secondary" disabled={loadingIssue} sx={{ mt: 3, mb: 2 }}>
        Crear Tarea
      </Button>
      <Button onClick={handleRejectIssue} variant="contained" color="warning" disabled={loadingIssue} sx={{ mt: 3, mb: 2 }}>
        Rechazar
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="issue form tabs">
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
                  required={true}
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
              <Grid item {...gridItemProps} key={"contactEmail"}>
                <TextField
                  label="Email Contacto"
                  name="contactEmail"
                  value={formData.contactEmail ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"contactPhone"}>
                <TextField
                  label="Télefono Contacto"
                  name="contactPhone"
                  value={formData.contactPhone ?? ''}
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

export default IssueForm;