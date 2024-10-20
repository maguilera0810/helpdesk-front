import { FC, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { usePriority } from '../../hooks/settings/usePriority';
import { renderChipCell } from './renders';

const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Título', width: 130 },
  { field: 'order', headerName: 'Orden', width: 130 },
  {
    field: 'color',
    headerName: 'Color',
    width: 130,
    renderCell: (params) => renderChipCell({ color: params.value }),
  },
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
    navigate('/configuraciones/prioridad/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/configuraciones/prioridad/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Prioridad
        </Button>
      </Box>
      <div style={{ minHeight: 400, width: '100%' }}>
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
