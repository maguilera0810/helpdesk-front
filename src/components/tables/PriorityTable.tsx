import { FC, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { usePriority } from '../../hooks/usePriority';

const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Titulo', width: 130 },
  { field: 'value', headerName: 'Valor', width: 130 },
  { field: 'icon', headerName: 'Icono', width: 130 },
];
Object.freeze(COLUMNS);

const PriorityTable: FC = () => {
  const navigate = useNavigate();
  const { priorities, loading, fetchPriorities } = usePriority();

  useEffect(() => {
    if (!loading) {
      fetchPriorities();
    }
  }, []);

  const handleCreate = () => {
    navigate('/configuraciones/prioridades/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/configuraciones/prioridades/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Prioridad
        </Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={priorities}
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

export default PriorityTable;
