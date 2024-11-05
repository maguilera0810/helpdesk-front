import { FC, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../hooks/settings/useCategory';
import filterStore from '../../stores/filterStore';
import { renderChipCell } from './renders';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'title', headerName: 'Título', width: 130 },
  { field: 'type', headerName: 'Tipo', width: 130 },
  { field: 'code', headerName: 'Código', width: 130 },
  {
    field: 'color',
    headerName: 'Color',
    width: 130,
    renderCell: (params) => renderChipCell({ color: params.value }),
  },
];

const IssueTable: FC = () => {
  const navigate = useNavigate();
  const { categories, loading, error, fetchCategories, deleteCategory } = useCategory();
  const { filters, clearFilters } = filterStore();

  useEffect(() => {
    if (!loading) {
      fetchCategories();
    }
  }, [filters]);

  const handleCreate = () => {
    navigate('/configuraciones/categoria/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/configuraciones/categoria/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Categoria
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid
          rows={categories}
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

export default IssueTable;
