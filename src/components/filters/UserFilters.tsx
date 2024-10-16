import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import useFilterStore from '../../stores/useFilterStore';


const filterEmptyValues = (filters: { [key: string]: any }) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  );
};

const UserFilters: React.FC = () => {
  const { filters, setFilters } = useFilterStore();
  const [localFilters, setLocalFilters] = useState<{ [key: string]: any }>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleApplyFilters = () => {
    const filteredFilters = filterEmptyValues(localFilters);
    setFilters(filteredFilters);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Username"
        name="username__icontains"
        value={localFilters.username__icontains || ''}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Email"
        name="email__icontains"
        value={localFilters.email__icontains || ''}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Nombre"
        name="firstName__icontains"
        value={localFilters.firstName__icontains || ''}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Apellido"
        name="lastName__icontains"
        value={localFilters.lastName__icontains || ''}
        onChange={handleChange}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Buscar
      </Button>
    </Box>
  );
};

export default UserFilters;
