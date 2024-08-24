import React from 'react';
import ReactDOM from 'react-dom/client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './index.css';
import AppRoutes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DndProvider backend={HTML5Backend}>
        <AppRoutes />
      </DndProvider>
    </LocalizationProvider>
  </React.StrictMode>,
)
