import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Paper, Tab, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import { Dayjs } from 'dayjs';

import { useCategory } from '../../../../hooks/useCategory';
import { useCategoryType } from '../../../../hooks/useCategoryType';

import { Category } from '../../../../interfaces/ModelInterfaces';

import useCategoryStore from '../../../../stores/useCategoryStore';

import { SelectField } from '../../fields';
import ColorPickerField from '../../fields/ColorPickerField';
import TextAreaField from '../../fields/TextAreaField';

import CategoryRelations from './CategoryRelations';

const gridSizes = {
  xs: 12,
  sm: 6,
  md: 4,
  xl: 3,
};
const fieldProps = {
  fullWidth: true,
};

const CategoryForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { categoryTypes, fetchCategoryTypes } = useCategoryType();
  const [categoryTypeOptions, setCategoryTypeOptions] = useState<any[]>([]);

  const setCategory = useCategoryStore((state) => state.setCategory);
  const { category, error: errorCategory, loading: loadingCategory, success, method,
    fetchCategory, createCategory, updateCategory } = useCategory();
  const [formData, setFormData] = useState<Partial<Category>>({});
  const [tabValue, setTabValue] = useState('0');
  const isUpdate = id && id !== 'addNew';



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
  const handleDateChange = (name: keyof Category) => (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date?.toDate() || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      const categoryId = parseInt(id);
      if (!isNaN(categoryId)) {
        await updateCategory(categoryId, formData);
      }
    } else {
      await createCategory(formData);
    }
  };

  const showField = () => {
    return isUpdate ? "block" : "none"
  }

  const handleTabLisChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    fetchCategoryTypes();
  }, []);

  useEffect(() => {
    setCategoryTypeOptions(categoryTypes.map((e) => ({ value: e.id, label: e.title })))
  }, [categoryTypes])

  useEffect(() => {
    if (isUpdate) {
      const categoryId = parseInt(id);
      if (!isNaN(categoryId)) {
        fetchCategory(categoryId);
      }
    }
  }, [id]);


  useEffect(() => {
    if (category) {
      setFormData({ ...category });
      setCategory(category)
    }
  }, [category]);


  useEffect(() => {
    if (success && category && (method === 'createCategory' || method === 'updateCategory')) {
      navigate(`/admin/category/${category.id}/`);
    }
  }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Categoria</Typography>
      {errorCategory && <Typography color="error" sx={{ mb: 2 }}>{errorCategory}</Typography>}
      {/* {successCategory && <Typography color="primary" sx={{ mb: 2 }}>Category {isUpdate ? 'updated' : 'created'} successfully!</Typography>} */}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingCategory} sx={{ mt: 3, mb: 2 }}>
        {loadingCategory ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Actualizar' : 'Crear')}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="category form tabs">
            <Tab label="Base Info" value="0" />
            <Tab label="Relations" value="1" />
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
                  label="Description"
                  name="description"
                  value={formData.description ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid size={gridSizes} key={"code"} display={showField()}>
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
              <Grid size={gridSizes} key={"type"}>
                <SelectField
                  label="Type"
                  name="type"
                  value={formData.type ?? ''}
                  options={categoryTypeOptions}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                  height="56px"
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
        <TabPanel value="1">
          <CategoryRelations />
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default CategoryForm;