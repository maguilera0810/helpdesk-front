import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Dayjs } from 'dayjs';

import { useCategory } from '../../../../hooks/useCategory';
import { Category } from '../../../../interfaces/ModelInterfaces';
import DraggableContainer from '../../drags/DraggableContainer';
import { SelectField } from '../../fields';
import ColorPickerField from '../../fields/ColorPickerField';
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
const fieldStyles = {
  // height: '56px',
  '&:focus': {
    outline: 'none',
  }
};
const categoryTypeOptions = [ // TODO get options from backend server
  { value: 'skill', label: 'Skill' },
  { value: 'issue', label: 'Issue' },
];


const CategoryForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { category, error: errorCategory, loading: loadingCategory, success: successCategory, fetchCategory, createCategory, updateCategory } = useCategory();
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
    // navigate('/admin/users');
  };
  const showField = () => {
    return "block";
    isUpdate ? "block" : "none"
  }

  const handleTabLisChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

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
    }
  }, [category]);
  // useEffect(() => {
  //   success && setFormData({});
  // }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{isUpdate ? 'Update Category' : 'Create Category'}</Typography>
      {errorCategory && <Typography color="error" sx={{ mb: 2 }}>{errorCategory}</Typography>}
      {successCategory && <Typography color="primary" sx={{ mb: 2 }}>Category {isUpdate ? 'updated' : 'created'} successfully!</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loadingCategory} sx={{ mt: 3, mb: 2 }}>
        {loadingCategory ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update Category' : 'Create Category')}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="category form tabs">
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
                  value={formData.type ?? categoryTypeOptions[0].value}
                  options={categoryTypeOptions}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                  height="56px"
                />
              </Grid>
              <Grid item {...gridItemProps} key={"color"}>
                <ColorPickerField
                  label="Color"
                  name="Color"
                  value={formData.color ?? ""}
                  onChange={(e) => handleInputValueChange("color", e)}
                />
              </Grid>
              <Grid item >
                <DraggableContainer />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default CategoryForm;