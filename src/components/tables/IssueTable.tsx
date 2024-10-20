import { FC, useEffect, useMemo } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { useIssue } from '../../hooks/support/useIssue';
import useGlobalData from '../../hooks/useGlobalData';
import useFilterStore from '../../stores/useFilterStore';
import { renderChipCell, renderUserCell } from './renders';

const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20 },
  { field: 'code', headerName: 'Código', width: 130 },
  { field: 'title', headerName: 'Titulo', width: 130 },
  {
    field: 'status',
    headerName: 'Estado',
    width: 130,
    renderCell: (params) => renderChipCell(params.value)
  },
  {
    field: 'createdBy',
    headerName: 'Creado por',
    width: 130,
    renderCell: (params) => renderUserCell(params.value, 'blue')
  },
  { field: 'createdAt', headerName: 'Fecha Creación', width: 200 },
];
Object.freeze(COLUMNS);

const IssueTable: FC = () => {
  const navigate = useNavigate();
  const { issues, loading, error, fetchIssues } = useIssue();
  const { filters, clearFilters } = useFilterStore();
  const { lightUsers } = useGlobalData();

  const handleCreate = () => {
    navigate('/soporte/problema/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/soporte/problema/${id}/`);
  };
  const getUserNameById = (userId: number) => {
    return lightUsers.find(user => user.id === userId);
  };
  // const getStatusById = (id: number) => {
  //   return taskStatuses.find(user => user.id === id);
  // };

  useEffect(() => {
    return () => clearFilters();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchIssues();
    }
  }, [filters]);

  const rows = useMemo(() => {
    return issues.map(issue => ({
      ...issue,
      createdBy: getUserNameById(issue.createdBy),
      // status: getStatusById(issue.status),
    }));
  }, [issues, lightUsers]);


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create Issue
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

export default IssueTable;
