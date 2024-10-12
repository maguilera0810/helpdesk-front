import { FC, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { useRole } from '../../hooks/admin/useRole';

const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Titulo', width: 130 },
  { field: 'code', headerName: 'Code', width: 130 },
];
Object.freeze(COLUMNS);

const RoleTable: FC = () => {
  const navigate = useNavigate();
  const { roles, loading, fetchRoles } = useRole();

  useEffect(() => {
    if (!loading) {
      fetchRoles();
    }
  }, []);

  const handleCreate = () => {
    navigate('/admin/role/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/admin/role/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Rol
        </Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={roles}
          columns={COLUMNS}
          loading={false}
          pageSizeOptions={[5, 10, 50, 100]}
          checkboxSelection
          onRowClick={(params) => handleUpdate(params.id as number)}
        />
      </div>
    </>
  );
};

export default RoleTable;
