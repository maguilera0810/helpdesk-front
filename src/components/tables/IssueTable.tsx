import { FC, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { useIssue } from '../../hooks/useIssue';
import useFilterStore from '../../stores/useFilterStore';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20 },
  { field: 'code', headerName: 'Codigo', width: 130 },
  { field: 'title', headerName: 'Titulo', width: 130 },
  { field: 'status', headerName: 'Estado', width: 130 },
  { field: 'createdBy', headerName: 'Creado por', width: 130 },
  { field: 'createdAt', headerName: 'Fecha Creación', width: 200 },
];

const IssueTable: FC = () => {
  const navigate = useNavigate();
  const { issues, loading, error, fetchIssues} = useIssue();
  const { filters, clearFilters } = useFilterStore();

  useEffect(() => {
    if (!loading) {
      fetchIssues();
    }
  }, [filters]);

  const handleCreate = () => {
    navigate('/soporte/issue/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/soporte/issue/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create Issue
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={issues}
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
