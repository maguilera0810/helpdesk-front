import { FC, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useLocationInfo } from '../../hooks/settings/useLocationInfo';

const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Título', width: 200 },
  { field: 'address', headerName: 'Direccion', width: 250 },
  { field: 'lat', headerName: 'Latitud', width: 250 },
  { field: 'lng', headerName: 'Longitud', width: 250 },
];
Object.freeze(COLUMNS);

const LocationTable: FC = () => {
  const navigate = useNavigate();
  const { locations, fetchLocations, loading } = useLocationInfo();

  useEffect(() => {
    if (!loading) {
      fetchLocations();
    }
  }, []);

  const handleCreate = () => {
    navigate('/configuraciones/locacion/addNew/');
  };

  const handleUpdate = (id: number) => {
    navigate(`/configuraciones/locacion/${id}/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear
        </Button>
      </Box>
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid
          rows={locations}
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

export default LocationTable;
