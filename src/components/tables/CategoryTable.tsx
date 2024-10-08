import { FC, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import useFilterStore from '../../stores/useFilterStore';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'code', headerName: 'Codigo', width: 130 },
  { field: 'color', headerName: 'Color', width: 130 },
];

const IssueTable: FC = () => {
  const navigate = useNavigate();
  const { categories, loading, error, fetchCategories, deleteCategory } = useCategory();
  const { filters, clearFilters } = useFilterStore();

  useEffect(() => {
    if (!loading) {
      fetchCategories();
    }
  }, [filters]);

  const handleCreate = () => {
    navigate('/configuraciones/categorias/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/configuraciones/categorias/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Categoria
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <div style={{ height: 400, width: '100%' }}>
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
