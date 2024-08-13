import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useUser } from '../../../../hooks/useUser';
import { User } from '../../../../interfaces/ModelInterfaces';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { PasswordField, SelectField } from '../../fields';


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
const documentTypeOptions = [ // TODO get options from backend server
  { value: 'dni', label: 'Cédula' },
  { value: 'passport', label: 'Pasaporte' },
];

const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, error, loading, success, fetchUser, createUser, updateUser } = useUser();
  const [formData, setFormData] = useState<Partial<User>>({});
  const [tabValue, setTabValue] = useState('0');

  const isUpdate = id && id !== 'addNew';

  useEffect(() => {
    if (isUpdate) {
      const userId = parseInt(id);
      if (!isNaN(userId)) {
        fetchUser(userId);
      }
    }
  }, [id]);

  useEffect(() => {
    user && setFormData(user);
  }, [user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    isProfile: boolean = false
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        ...(isProfile ? {
          profile: {
            ...prev.profile,
            [name]: value,
          },
        } : {
          [name]: value,
        }),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      const userId = parseInt(id);
      if (!isNaN(userId)) {
        await updateUser(userId, formData);
      }
    } else {
      await createUser(formData);
    }
    // navigate('/admin/users');
  };


  const handleTabLisChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // useEffect(() => {
  //   success && setFormData({});
  // }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{isUpdate ? 'Update User' : 'Create User'}</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {success && <Typography color="primary" sx={{ mb: 2 }}>User {isUpdate ? 'updated' : 'created'} successfully!</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
        {loading ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update User' : 'Create User')}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="user form tabs">
            <Tab label="Base Info" value="0" />
            <Tab label="Permissions" value="1" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid item {...gridItemProps} key={"First Name"}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"Last Name"}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"Username"}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  required
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"Email"}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  required
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"Password"}>
                <PasswordField
                  name="password"
                  value={formData.password ?? ''}
                  onChange={handleInputChange}
                  fieldProps={fieldProps}
                  fieldStyles={fieldStyles}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"documentType"}>
                <SelectField
                  label="Document Type"
                  name="documentType"
                  value={formData.profile?.documentType ?? ''}
                  options={documentTypeOptions}
                  onChange={(e) => handleInputChange(e, true)}
                  fullWidth
                  height="56px"
                />
              </Grid>
              <Grid item {...gridItemProps} key={"Document"}>
                <TextField
                  label="Document"
                  name="document"
                  value={formData.profile?.document ?? ''}
                  onChange={(e) => handleInputChange(e, true)}
                  {...fieldProps}
                />
              </Grid>

              <Grid item {...gridItemProps} key={"Phone"}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.profile?.phone ?? ''}
                  onChange={(e) => handleInputChange(e, true)}
                  {...fieldProps}
                />
              </Grid>
              <Grid item {...gridItemProps} key={"Address"}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.profile?.address ?? ''}
                  onChange={(e) => handleInputChange(e, true)}
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

export default UserForm;