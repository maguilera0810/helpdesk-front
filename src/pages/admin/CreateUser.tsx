import React, { useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { useUsers } from '../../hooks/useUsers';

const CreateUser: React.FC = () => {
  const { createUser } = useUsers();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    try {
      await createUser({ username, email, firstName: firstName, lastName: lastName });
      // Redireccionar o mostrar un mensaje de éxito
    } catch (err) {
      setError('Error creating user');
    }
  };

  return (
    <Box>
      <Typography variant="h5">Create User</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
      <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleCreate}>Create</Button>
    </Box>
  );
};

export default CreateUser;
