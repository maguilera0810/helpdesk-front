import { FC } from 'react';


import { Button } from '@mui/material';
import uiStore from '../../../stores/uiStore';

const ToggleThemeButton: FC = () => {
  const { mode, toggleMode } = uiStore();

  return (
    <Button variant="contained" onClick={toggleMode}>
      {mode === 'light' ? 'Modo Claro' : 'Modo Oscuro'}
    </Button>
  );
};

export default ToggleThemeButton;
