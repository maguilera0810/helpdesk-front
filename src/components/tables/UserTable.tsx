import { FC, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useUsers } from '../../hooks/useUsers';
import UserFilters from '../filters/UserFilters';
import useFilterStore from '../../stores/useFilterStore';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'username', headerName: 'Username', width: 130 },
];

const UserTable: FC = () => {
  const { users, loading, error, fetchUsers, deleteUser } = useUsers();
  const { filters } = useFilterStore();

  useEffect(() => {
    console.log("---1", users);
    if (!loading) {
      console.log("---2");
      fetchUsers();
    }
  }, [filters]);

  const handleDelete = (id: number) => {
    // deleteUser(id);
    console.log(id);


  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>

        <Button variant="contained" color="primary" href="/admin/users/create">
          Crear Usuario
        </Button>
      </Box>
      <UserFilters />
      {error && <Typography color="error">{error}</Typography>}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 50, 100]}
          checkboxSelection
          onRowClick={(params) => handleDelete(params.id as number)}
        />
      </div>
    </>
  );
};

export default UserTable;
