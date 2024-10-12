import { Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth/AuthService';
import authStore from '../../../stores/authStore';


const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const setToken = authStore((state) => state.setToken);
  const setUser = authStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = await AuthService.getToken({ email, password });
    if (token?.access) {
      setToken(token);
      const fetchedUser = await AuthService.fetchUser();
      if (fetchedUser) {
        console.log(fetchedUser);
        setUser(fetchedUser);
        navigate('/admin/users/');
      } else {
        alert('Error al obtener el usuario');
      }
    } else {
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      style={{ width: '100%' }}
    >

      <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2, color: 'rgb(50,50,50,0.85)' }}>
          Sign in
        </Typography>
        <TextField
          id="email"
          label="Email Address"
          name="email"
          margin="normal"
          autoComplete="email"
          required
          fullWidth
          autoFocus
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </motion.div>
  );
};

export default LoginForm;
