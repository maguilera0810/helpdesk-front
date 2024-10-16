import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Paper, Tab, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';

import { useCategoryType } from '../../../../hooks/settings/useCategoryType';

import { CategoryType } from '../../../../interfaces/ModelInterfaces';


import { CategoryTypeFormProps } from '../../../../interfaces/ComponentInterfaces';
import TextAreaField from '../../fields/TextAreaField';

const gridSizes = {
  xs: 12,
  // sm: 6,
  // md: 4,
  // xl: 3,
};
const fieldProps = {
  fullWidth: true,
};


const CategoryTypeForm: React.FC<CategoryTypeFormProps> = ({ categoryTypeInput, onSave, onCancel, isDialog = false }) => {
  const { categoryTypeId } = useParams<{ categoryTypeId: string }>();
  const navigate = useNavigate();

  const { categoryType, success, loading, method, error,
    fetchCategoryType, createCategoryType, updateCategoryType } = useCategoryType();

  const [formData, setFormData] = useState<Partial<CategoryType>>({});
  const [tabValue, setTabValue] = useState('0');
  const isUpdate = categoryTypeId && categoryTypeId !== 'addNew';



  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      const id = parseInt(categoryTypeId);
      if (!isNaN(id)) {
        await updateCategoryType(id, formData);
      }
    } else {
      await createCategoryType(formData);
    }
  };

  const handleTabLisChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (isUpdate) {
      const id = parseInt(categoryTypeId);
      if (!isNaN(id)) {
        fetchCategoryType(id);
      }
    }
  }, [categoryTypeId]);


  useEffect(() => {
    if (categoryType) {
      setFormData({ ...categoryType });
    }
  }, [categoryType]);


  useEffect(() => {
    if (!success || (!categoryType || !(method === 'createCategoryType' || method === 'updateCategoryType'))) {
      return;
    }
    if (!isDialog) {
      navigate(`/configuraciones/categorias-type/${categoryType.id}/`);
    }
  }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Tipo de Categoria</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
        {loading ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Actualizar' : 'Crear')}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="category form tabs">
            <Tab label="Base Info" value="0" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid size={gridSizes} key={"title"}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid size={gridSizes} key={"description"}>
                <TextAreaField
                  label="Descrición"
                  name="description"
                  value={formData.description ?? ''}
                  onChange={(e) => handleInputChange(e)}
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

export default CategoryTypeForm;