import { FC } from 'react';

import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 130 },
  { field: 'code', headerName: 'Código', width: 130 },
];

const FacultiesTable: FC = () => {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" href="/admin/users/create">
          Crear Facultad
        </Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={[]}
          columns={columns}
          loading={false}
          pageSizeOptions={[5, 10, 50, 100]}
          checkboxSelection
          onRowClick={(params) => console.log(params.id as number)}
        />
      </div>
    </>
  );
};

export default FacultiesTable;
