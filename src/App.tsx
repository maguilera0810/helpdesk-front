// import './App.css'
import { DndContext } from '@dnd-kit/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AppRoutes from './routes';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DndContext>
        <AppRoutes />
      </DndContext>
    </LocalizationProvider>
  )
}

export default App
