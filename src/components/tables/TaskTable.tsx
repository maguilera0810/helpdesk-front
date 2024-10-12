import { FC, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../hooks/support/useTask';
import useFilterStore from '../../stores/useFilterStore';

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
  const navigate = useNavigate();
  const { tasks, loading, error, fetchTasks, deleteTask } = useTask();
  const { filters, clearFilters } = useFilterStore();

  useEffect(() => {
    if (!loading) {
      fetchTasks();
    }
  }, [filters]);

  const handleCreate = () => {
    navigate('/soporte/tareas/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/soporte/tareas/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Tarea
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tasks}
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

export default TaskTable;
