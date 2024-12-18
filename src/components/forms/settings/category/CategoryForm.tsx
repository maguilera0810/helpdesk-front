import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Paper, Tab, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import { useCategory } from '../../../../hooks/settings/useCategory';
import { useCategoryType } from '../../../../hooks/settings/useCategoryType';

import { Category } from '../../../../interfaces/ModelInterfaces';

import categoryStore from '../../../../stores/settings/categoryStore';

import ColorPickerField from '../../fields/ColorPickerField';
import TextAreaField from '../../fields/TextAreaField';

import { IAutocompleteOption } from '../../../../interfaces/GlobalInterfaces';
import AutoCompletField from '../../fields/AutoCompletField';
import CategoryRelations from './CategoryRelations';
import { getSubmitMsg } from '../../../../utils/messageUtils';

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

  const { categoryTypes, fetchCategoryTypes, createCategoryType } = useCategoryType();
  const [categoryTypeOptions, setCategoryTypeOptions] = useState<any[]>([]);

  const setCategory = categoryStore((state) => state.setCategory);
  const { category, error: errorCategory, loading: loadingCategory, success, method,
    fetchCategory, createCategory, updateCategory } = useCategory();
  const [formData, setFormData] = useState<Partial<Category>>({});
  const [tabValue, setTabValue] = useState('0');
  const isUpdate = Boolean(id && id !== 'addNew');


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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      updateCategory(category.id, formData);
    } else {
      createCategory(formData);
    }
  };

  const showField = () => {
    return isUpdate ? "block" : "none"
  }

  const handleTabLisChange = (e: SyntheticEvent, newValue: string) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  const handleAutoCompleteChange = (selectedValue: IAutocompleteOption | string | number | null) => {
    if (typeof selectedValue === 'object') {
      handleInputValueChange('type', selectedValue?.value)
    }
  }
  const handleAutoCompleteCreate = async (newValue: string) => {
    await createCategoryType({ title: newValue });
    fetchCategoryTypes();
  }

  useEffect(() => {
    fetchCategoryTypes();
  }, []);

  useEffect(() => {
    setCategoryTypeOptions(categoryTypes.map((e) => ({ value: e.id, label: e.title })))
  }, [categoryTypes])

  useEffect(() => {
    if (isUpdate && id) {
      const categoryId = parseInt(id);
      !isNaN(categoryId) && fetchCategory(categoryId);
    }
  }, [id]);

  useEffect(() => {
    if (success && category && (method === 'createCategory' || method === 'updateCategory')) {
      navigate(`/configuraciones/categoria/${category.id}/`);
    }
  }, [success]);

  useEffect(() => {
    if (category) {
      setFormData({ ...category });
      setCategory(category)
    }
  }, [category]);



  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Categoria</Typography>
      {errorCategory && <Typography color="error" sx={{ mb: 2 }}>{errorCategory}</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingCategory} sx={{ mt: 3, mb: 2 }}>
        {getSubmitMsg(loadingCategory, isUpdate)}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="category form tabs">
            <Tab label="Información" value="0" />
            <Tab label="Relations" value="1" />
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
              <Grid size={gridSizes} key={"code"} display={showField()}>
                <TextField
                  label="Código Público"
                  name="code"
                  disabled={true}
                  value={formData.code ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid size={gridSizes} key={"type2"}>
                <AutoCompletField
                  label='Tipo'
                  name='categoryTypeField'
                  options={categoryTypeOptions}
                  value={formData.type ?? null}
                  canAdd={true}
                  key={'categoryType'}
                  onChange={handleAutoCompleteChange}
                  onCreate={handleAutoCompleteCreate}

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
      {/* <Dialog open={true}>
        <DialogTitle>Add a new film</DialogTitle>
        <DialogContent>
          <CategoryTypeForm
            isDialog={true}
          />
        </DialogContent>
      </Dialog> */}
    </Paper>
  );
};

export default CategoryForm;