import { FC, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/admin/useUser';
import useFilterStore from '../../stores/useFilterStore';
import UserFilters from '../filters/UserFilters';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastName', headerName: 'Apellido', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'username', headerName: 'Username', width: 130 },
];

const UserTable: FC = () => {
  const navigate = useNavigate();
  const { users, loading, error, fetchUsers, deleteUser } = useUser();
  const { filters, clearFilters } = useFilterStore();

  useEffect(() => {
    if (!loading) {
      fetchUsers();
    }
  }, [filters]);

  const handleCreate = () => {
    navigate('/administracion/usuario/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/administracion/usuario/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Usuario
        </Button>
      </Box>
      <UserFilters />
      {error && <Typography color="error">{error}</Typography>}
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 50, 100]}
          checkboxSelection
          onRowClick={(params) => handleUpdate(params.id as number)}
        />
      </div>
    </>
  );
};

export default UserTable;
