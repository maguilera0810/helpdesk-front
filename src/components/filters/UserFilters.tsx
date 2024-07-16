import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const UserFilters: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField label="First Name" variant="outlined" />
      <TextField label="Last Name" variant="outlined" />
      <TextField label="Email" variant="outlined" />
      <TextField label="Username" variant="outlined" />
      <Button variant="contained" color="primary">Apply Filters</Button>
    </Box>
  );
};

export default UserFilters;
