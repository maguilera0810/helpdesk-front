import React from 'react';
import ReactDOM from 'react-dom/client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import './index.css';
import AppRoutes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRoutes />
    </LocalizationProvider>
  </React.StrictMode>,
)
