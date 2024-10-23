import { FC, useEffect, useMemo } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import { taskStatuses } from '../../constants/states';
import { useTask } from '../../hooks/support/useTask';
import useGlobalData from '../../hooks/useGlobalData';
import useFilterStore from '../../stores/useFilterStore';
import { renderChipCell, renderUserCell } from './renders';

const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'code', headerName: 'Código', width: 130 },
  { field: 'title', headerName: 'Titulo', width: 130 },
  {
    field: 'status',
    headerName: 'Estado',
    width: 130,
    renderCell: (params) => renderChipCell(params.value)
  },
  {
    field: 'priority',
    headerName: 'Prioridad',
    width: 130,
    renderCell: (params) => renderChipCell(params.value)
  },
  {
    field: 'createdBy',
    headerName: 'Creado por',
    width: 130,
    renderCell: (params) => renderUserCell(params.value, 'blue')
  },
  {
    field: 'responsible',
    headerName: 'Responsable',
    width: 130,
    renderCell: (params) => renderUserCell(params.value, 'blue')
  },
  { field: 'createdAt', headerName: 'Creado el', width: 130 },
  { field: 'updatedAt', headerName: 'Actualizado el', width: 130 },
];
Object.freeze(COLUMNS);


const TaskTable: FC = () => {
  const navigate = useNavigate();
  const { tasks, loading, error, fetchTasks } = useTask();
  const { filters, clearFilters } = useFilterStore();
  const { lightUsers, priorities } = useGlobalData();

  const getUserNameById = (userId: number) => {
    return lightUsers.find(user => user.id === userId);
  };
  const getPriorityById = (id: number) => {
    return priorities.find(user => user.id === id);
  };
  const getStatusById = (code: string) => {
    return taskStatuses.find(e => e.value === code);
  };

  const rows = useMemo(() => {
    return tasks.map(task => ({
      ...task,
      createdBy: getUserNameById(task.createdBy),
      responsible: getUserNameById(task.responsible),
      priority: getPriorityById(task.priority),
      status: getStatusById(task.status),
    }));
  }, [tasks, lightUsers, priorities, taskStatuses]);

  useEffect(() => {
    return () => clearFilters();
  }, [])

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
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={COLUMNS}
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
