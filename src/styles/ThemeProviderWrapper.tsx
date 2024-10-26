import { FC, useMemo } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ParentComponentProps } from '../interfaces/ComponentInterfaces';
import uiStore from '../stores/uiStore';
import { getTheme } from './theme'; // Importamos la función getTheme que creamos

const ThemeProviderWrapper: FC<ParentComponentProps> = ({ children }) => {

  const { mode } = uiStore();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;

