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
        padding:0,
      }}
    >
      <Container
        id="container-1"
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 1,
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



// import React from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';

// const Signup: React.FC = () => {
//   return (
//     <Container component="main" maxWidth="xs">
//       <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <Box component="form" sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             autoComplete="current-password"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign Up
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

// export default Signup;
