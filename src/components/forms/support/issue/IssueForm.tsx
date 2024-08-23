import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs, { Dayjs } from 'dayjs';

import { useIssue } from '../../../../hooks/useIssue';
import { Issue } from '../../../../interfaces/ModelInterfaces';
import { MultipleSelectField, SelectField } from '../../fields';


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
  { value: 'to_do', label: 'To do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'to_validate', label: 'To Validate' },
  { value: 'completed', label: 'Completed' },
];



const IssueForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { issue, error: errorIssue, loading: loadingIssue, success: successIssue,
    fetchIssue, createIssue, updateIssue } = useIssue();


  const [formData, setFormData] = useState<Partial<Issue>>({});
  const [tabValue, setTabValue] = useState('0');

  const isUpdate = id && id !== 'addNew';

  useEffect(() => {

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

  // useEffect(() => {
  //   success && setFormData({});
  // }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{isUpdate ? 'Update Issue' : 'Create Issue'}</Typography>
      {errorIssue && <Typography color="error" sx={{ mb: 2 }}>{errorIssue}</Typography>}
      {successIssue && <Typography color="primary" sx={{ mb: 2 }}>Issue {isUpdate ? 'updated' : 'created'} successfully!</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingIssue} sx={{ mt: 3, mb: 2 }}>
        {loadingIssue ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update Issue' : 'Create Issue')}
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
                <TextField
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
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default IssueForm;