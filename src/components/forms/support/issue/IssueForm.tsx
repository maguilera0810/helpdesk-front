import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs, { Dayjs } from 'dayjs';

import { issueStatusOptions } from '../../../../constants';
import { useCategory } from '../../../../hooks/settings/useCategory';
import { useIssue } from '../../../../hooks/support/useIssue';
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

  const isUpdate = Boolean(id && id !== 'addNew');

  const toogleOpenDialog = (dialogCase: 'createTask' | 'refectIssue') => {
    if (dialogCase === 'createTask') {
      setOpenDialogCreateTask((e) => !e)
    } else if (dialogCase === 'refectIssue') {
      setOpenDialogRejectIssue((e) => !e)
    }
  }

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
      const issueId = parseInt(id as string);
      if (!isNaN(issueId)) {
        await updateIssue(issueId, formData);
      }
    } else {
      await createIssue(formData);
    }
    // navigate('/admin/usuario');
  };
  const showField = () => {
    return "block";
    isUpdate ? "block" : "none"
  }

  const handleTabLisChange = (e: React.SyntheticEvent, newValue: string) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    toogleOpenDialog('createTask'); // Open the confirmation dialog
  };

  const handleConfirmCreateTask = async () => {
    toogleOpenDialog('createTask'); // Close the confirmation dialog
    issue?.id && await createTask(issue.id)
  }


  const handleRejectIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    toogleOpenDialog('refectIssue'); // Open the confirmation dialog
  };

  const handleConfirmRejectIssue = async () => {
    toogleOpenDialog('refectIssue'); // Close the confirmation dialog
    issue?.id && await updateIssue(issue.id, { "status": "rejected" })
  }


  useEffect(() => {
    fetchCategories({ "type": 1 });
  }, []);

  useEffect(() => {
    if (!isUpdate) {
      return
    }
    const issueId = parseInt(id as string);
    if (!isNaN(issueId)) {
      fetchIssue(issueId);
    }
  }, [id]);

  useEffect(() => {
    if (!issue) { return; }
    setFormData({
      ...issue,
      createdAt: issue.createdAt ? dayjs(issue.createdAt).toDate() : undefined,
      updatedAt: issue.updatedAt ? dayjs(issue.updatedAt).toDate() : undefined,
    });
  }, [issue]);

  useEffect(() => {
    if (createdTask) {
      navigate(`/soporte/tareas/${createdTask}/`);
    }
  }, [createdTask])

  useEffect(() => {
    if (successIssue && !isUpdate && issue) {
      navigate(`/soporte/issue/${issue.id}/`);
    }
  }, [successIssue, issue])

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

  const displayButtons = () => {
    if (!isUpdate) {
      return (
        <Button onClick={handleSubmit} variant="contained" color="primary"
          disabled={loadingIssue} sx={{ marginInline: 0.2 }}>
          {loadingIssue ? 'Creating...' : 'Create Issue'}
        </Button>);
    } else if (issue?.status === 'received') {
      return <>
        <Button onClick={handleCreateTask} variant="contained" color="secondary"
          disabled={loadingIssue} sx={{ marginInline: 0.2 }}>
          Crear Tarea
        </Button>
        <Button onClick={handleRejectIssue} variant="contained" color="warning"
          disabled={loadingIssue} sx={{ marginInline: 0.2 }}>
          Rechazar
        </Button>
      </>;
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      {getDialogs()}
      <Typography variant="h4" sx={{ mb: 2 }}>Problema</Typography>
      {/* {errorIssue && <Typography color="error" sx={{ mb: 2 }}>{errorIssue}</Typography>} */}
      {/* {successIssue && <Typography color="primary" sx={{ mb: 2 }}>Issue {isUpdate ? 'updated' : 'created'} successfully!</Typography>} */}
      {displayButtons()}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="issue form tabs">
            <Tab label="Información" value="0" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid item {...gridItemProps} key={"title"}>
                <TextField
                  label="Título"
                  name="title"
                  required={true}
                  InputProps={{
                    readOnly: isUpdate,
                  }}
                  value={formData.title ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"description"}>
                <TextAreaField
                  label="Descripción"
                  name="description"
                  required={true}
                  InputProps={{ readOnly: isUpdate, }}
                  value={formData.description ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"contactEmail"}>
                <TextField
                  label="Email Contacto"
                  name="contactEmail"
                  InputProps={{
                    readOnly: isUpdate,
                  }}
                  value={formData.contactEmail ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"contactPhone"}>
                <TextField
                  label="Télefono Contacto"
                  name="contactPhone"
                  InputProps={{
                    readOnly: isUpdate,
                  }}
                  value={formData.contactPhone ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"code"} display={showField()}>
                <TextField
                  label="Código"
                  name="code"
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
                  readOnly={isUpdate}
                  value={formData.status ?? issueStatusOptions[0].value}
                  options={issueStatusOptions}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                  height="56px"
                />
              </Grid>
              <Grid item {...gridItemProps} key={"createdAt"}>
                <DateTimeField
                  label="Creado"
                  disabled={true}
                  value={dayjs(formData.createdAt)}
                  onChange={handleDateChange('createdAt')}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"updatedAt"}>
                <DateTimeField
                  label="Actualizado"
                  disabled={true}
                  value={dayjs(formData.updatedAt)}
                  onChange={handleDateChange('updatedAt')}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"categories"}>
                <MultipleSelectField
                  label="Categorias"
                  name="categories"
                  value={formData.categories ?? []}
                  options={categories.map(category => ({ value: category.id, label: category.title, color: category.color }))}
                  onChange={(e) => handleInputChange(e)}
                  disabled={isUpdate}
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