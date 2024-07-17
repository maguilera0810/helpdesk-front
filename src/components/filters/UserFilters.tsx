import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import useFilterStore from '../../stores/useFilterStore';

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
    setFilters(localFilters);
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
        label="First Name"
        name="firstName__icontains"
        value={localFilters.firstName__icontains || ''}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Last Name"
        name="lastName__icontains"
        value={localFilters.lastName__icontains || ''}
        onChange={handleChange}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default UserFilters;
