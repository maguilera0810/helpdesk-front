import { FC, useEffect, useMemo } from 'react';

import { Avatar, Box, Button, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import { useTaskStatus } from '../../hooks/settings/useTaskStatus';
import { useTask } from '../../hooks/support/useTask';
import useGlobalData from '../../hooks/useGlobalData';
import { Priority, TaskStatus, User } from '../../interfaces/ModelInterfaces';
import taskStatusStore from '../../stores/settings/taskStatusStore';
import useFilterStore from '../../stores/useFilterStore';

const TaskTable: FC = () => {
  const navigate = useNavigate();
  const { tasks, loading, error, fetchTasks } = useTask();
  const { filters, clearFilters } = useFilterStore();
  const { lightUsers, priorities } = useGlobalData();
  const { taskStatuses: taskStatusesFetched, fetchTaskStatuses } = useTaskStatus();
  const { taskStatuses, setTaskStatuses } = taskStatusStore();


  const getUserNameById = (userId: number) => {
    return lightUsers.find(user => user.id === userId);
  };
  const getPriorityById = (id: number) => {
    return priorities.find(user => user.id === id);
  };
  const getStatusById = (id: number) => {
    return taskStatuses.find(user => user.id === id);
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
    fetchTaskStatuses();
    return () => clearFilters();
  }, [])

  useEffect(() => {
    taskStatusesFetched.length && setTaskStatuses(taskStatusesFetched);
  }, [taskStatusesFetched])

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

  const handleUserProfile = (userId: number) => {
    navigate(`/administracion/usuario/${userId}`);
  };

  // Función que renderiza el avatar y el nombre del usuario
  const renderUserCell = (user?: Partial<User>, color: string = 'blue') => {
    let text: string = '';
    if (user?.firstName && user?.lastName) {
      text = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    const onclick = () => { user?.id && handleUserProfile(user.id); };
    return (
      <Box
        display="flex"
        alignItems="center"
        height="100%"
        justifyContent="center"
        alignContent={"center"}
        sx={{ cursor: user ? 'pointer' : 'auto' }}
        onClick={onclick}
      >
        <Avatar sx={{ bgcolor: color, marginRight: 2, maxWidth: 30, maxHeight: 30, fontSize: 14 }} >
          {text}
        </Avatar>
      </Box>
    );
  };
  const renderChipCell = (elem: Priority | TaskStatus) => {
    let bgcolor: string = 'lightgray'
    let title: string = 'N/A'
    if (elem) {
      bgcolor = elem.color ?? 'lightgray';
      title = elem.title;
    }
    return (
      <Chip
        label={title}
        sx={{
          bgcolor,
          color: '#FFF',
          height: '1.5rem',
          '& .MuiChip-label': {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
    );
  };
  // Columnas con nombres de usuarios como enlaces
  const columns: GridColDef[] = [
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
  Object.freeze(columns);

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
          rows={rows}
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
