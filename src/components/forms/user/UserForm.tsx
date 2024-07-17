import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { User } from '../../../interfaces/AuthInterfaces';

interface UserFormProps {
  initialUser?: Partial<User>;
  onSubmit: (user: Partial<User>) => void;
  submitText: string;
  error?: string;
}

const UserForm: React.FC<UserFormProps> = ({ initialUser = {}, onSubmit, submitText, error }) => {
  const [username, setUsername] = useState(initialUser.username || '');
  const [email, setEmail] = useState(initialUser.email || '');
  const [firstName, setFirstName] = useState(initialUser.firstName || '');
  const [lastName, setLastName] = useState(initialUser.lastName || '');

  useEffect(() => {
    setUsername(initialUser.username || '');
    setEmail(initialUser.email || '');
    setFirstName(initialUser.firstName || '');
    setLastName(initialUser.lastName || '');
  }, [initialUser]);

  const handleSubmit = () => {
    onSubmit({ username, email, firstName, lastName });
  };

  return (
    <Box>
      <Typography variant="h5">{submitText} User</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
      <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleSubmit}>{submitText}</Button>
    </Box>
  );
};

export default UserForm;
