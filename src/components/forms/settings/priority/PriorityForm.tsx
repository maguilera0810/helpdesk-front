import React, { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Paper, Tab, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';

import { usePriority } from '../../../../hooks/usePriority';
import { Priority } from '../../../../interfaces/ModelInterfaces';
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

const PriorityForm: FC = () => {
  const navigate = useNavigate();
  const { priorityId } = useParams<{ priorityId: string }>();
  
  const { priority, error: errorPriority, loading: loadingPriority, success, method,
    fetchPriority, createPriority, updatePriority } = usePriority();
  const [formData, setFormData] = useState<Partial<Priority>>({});
  const [tabValue, setTabValue] = useState('0');
  const isUpdate = priorityId && priorityId !== 'addNew';


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleInputValueChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      const id = parseInt(priorityId);
      if (!isNaN(id)) {
        await updatePriority(id, formData);
      }
    } else {
      await createPriority(formData);
    }
  };

  const handleTabLisChange = (e: SyntheticEvent, newValue: string) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (isUpdate) {
      const id = parseInt(priorityId);
      if (!isNaN(id)) {
        fetchPriority(id);
      }
    }
  }, [priorityId]);

  useEffect(() => {
    if (priority) {
      setFormData({ ...priority });
    }
  }, [priority]);

  useEffect(() => {
    if (success && priority && (method === 'createPriority' || method === 'updatePriority')) {
      navigate(`/configuraciones/prioridad/${priority.id}/`);
    }
  }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Prioridad</Typography>
      {errorPriority && <Typography color="error" sx={{ mb: 2 }}>{errorPriority}</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingPriority} sx={{ mt: 3, mb: 2 }}>
        {loadingPriority ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Actualizar' : 'Crear')}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="priority form tabs">
            <Tab label="Base Info" value="0" />
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
              <Grid size={gridSizes} key={"value"}>
                <TextField
                  label="Valor"
                  name="value"
                  type='number'
                  value={formData.value ?? 0}
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

export default PriorityForm;