import { FC, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Paper, Tab, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useIssueStatus } from '../../../../hooks/settings/useIssueStatus';
import { IssueStatus } from '../../../../interfaces/ModelInterfaces';
import { BaseChangeMethod } from '../../../../types/methodTypes';
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

const IssueStatusForm: FC = () => {
  const navigate = useNavigate();
  const { issueStatusID } = useParams<{ issueStatusID: string }>();
  const { issueStatus, error: errorIssueStatus, loading: loadingIssueStatus, success, method,
    fetchIssueStatus, createIssueStatus, updateIssueStatus } = useIssueStatus();
  const [formData, setFormData] = useState<Partial<IssueStatus>>({});

  const [tabValue, setTabValue] = useState('0');
  const isUpdate = Boolean(issueStatusID && issueStatusID !== 'addNew');


  const handleInputChange: BaseChangeMethod<any> = (e) => {
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
    if (issueStatus) {
      updateIssueStatus(issueStatus.id, formData);
    } else {
      createIssueStatus(formData);
    }
  };

  const handleTabLisChange = (e: SyntheticEvent, newValue: string) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  useEffect(() => {
    if (isUpdate && issueStatusID) {
      const id = parseInt(issueStatusID);
      !isNaN(id) && fetchIssueStatus(id);
    }
  }, []);

  useEffect(() => {
    issueStatus && setFormData({ ...issueStatus });
  }, [issueStatus]);

  useEffect(() => {
    if (success && issueStatus && (method === 'createIssueStatus' || method === 'updateIssueStatus')) {
      navigate(`/configuraciones/estado-problema/${issueStatus.id}/`);
    }
  }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Estado Problema
      </Typography>
      {errorIssueStatus && <Typography color="error" sx={{ mb: 2 }}>{errorIssueStatus}</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingIssueStatus} sx={{ mt: 3, mb: 2 }}>
        {getSubmitMsg(loadingIssueStatus, isUpdate)}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange}>
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

export default IssueStatusForm;