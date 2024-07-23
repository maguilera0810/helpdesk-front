import { Box, Container } from '@mui/material';
import React from 'react';
import backgroundImage from '../../assets/bg_auth.jpg';
import LoginForm from '../../components/forms/auth/LoginForm';



const Login: React.FC = () => {

  return (
    <Box
      id="box-1"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <Container
        id="container-1"
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          height: 'auto',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <LoginForm />
      </Container>
    </Box>
  );
}

export default Login;
