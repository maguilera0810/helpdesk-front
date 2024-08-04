import { FC } from 'react';

import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'code', headerName: 'Codigo', width: 130 },
  { field: 'title', headerName: 'Titulo', width: 130 },
  { field: 'status', headerName: 'Estado', width: 130 },
  { field: 'priority', headerName: 'Prioridad', width: 130 },
  { field: 'createdBy', headerName: 'Creado por', width: 130 },
  { field: 'responsible', headerName: 'Responsable', width: 130 },
  { field: 'createdAt', headerName: 'Fecha Creación', width: 130 },
  { field: 'updatedAt', headerName: 'Fecha Actualización', width: 130 },
];

const TaskTable: FC = () => {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" href="/admin/users/create">
          Crear Tarea
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

export default TaskTable;