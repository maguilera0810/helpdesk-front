import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Paper, Tab, Typography } from '@mui/material';

import { useRole } from '../../../../hooks/admin/useRole';
import { Role } from '../../../../interfaces/ModelInterfaces';
import roleStore from '../../../../stores/admin/roleStore';
import { BaseMethod } from '../../../../types/methodTypes';
import RoleBaseInfo from './RoleBaseInfo';
import RolePermissions from './RolePermissions';

const RoleForm: React.FC = () => {
  const navigate = useNavigate();
  const { roleId } = useParams<{ roleId: string }>();
  const isUpdate = Boolean(roleId && roleId !== 'addNew');
  const { role, error, success, method, fetchRole } = useRole();
  const { setRole } = roleStore();
  const [tabValue, setTabValue] = useState('0');

  useEffect(() => {
    if (!isUpdate) {
      return;
    }
    const id = parseInt(roleId as string);
    if (!isNaN(id)) {
      fetchRole(id);
    }
  }, [roleId]);

  useEffect(() => {
    if (role) {
      setRole(role);
    }
  }, [role]);

  useEffect(() => {
    if (success === true && role && (method === 'createRole' || method === 'updateRole')) {
      navigate(`/admin/role/${role.id}/`);
    }
  }, [success]);

  const handleSuccess: BaseMethod<Role> = (id) => {
    typeof id === 'number' && navigate(`/admin/role/${id}/`);
  }

  const handleSubmit: BaseMethod<Role> = (role) => {
    console.log(role);
  };

  const handleTabLisChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setTabValue(newValue);
  };


  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{isUpdate ? 'Actualizar Tarea' : 'Crear Tarea'}</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="role form tabs">
            <Tab label="Información" value="0" />
            <Tab label="Permisos" value="1" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <RoleBaseInfo
            onSuccess={handleSuccess}
            onSubmit={handleSubmit} />
        </TabPanel>
        <TabPanel value="1">
          <RolePermissions />
        </TabPanel>
      </TabContext>
    </Paper>
  );
}

export default RoleForm;
