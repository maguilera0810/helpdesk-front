import { FC } from 'react';

import { CssBaseline, ThemeProvider, useColorScheme } from '@mui/material';
import { ParentComponentProps } from '../interfaces/ComponentInterfaces';
import { getTheme } from './theme'; // Importamos la función getTheme que creamos

const ThemeProviderWrapper: FC<ParentComponentProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();

  // Cambiar entre light y dark mode
  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;



// const ThemeProviderWrapper: FC<ParentComponentProps> = ({ children }) => {
//   // Recupera el tema desde el localStorage o usa 'light' por defecto
//   const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
//   const [mode, setMode] = useState<'light' | 'dark'>(storedMode || 'light');

//   // Almacenar el tema en localStorage cuando el modo cambie
//   useEffect(() => {
//     localStorage.setItem('themeMode', mode);
//   }, [mode]);

//   // Cambiar entre light y dark mode
//   const toggleTheme = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   // Crear el tema basado en el modo actual
//   const theme = useMemo(() => getTheme(mode), [mode]);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {/* Aquí puedes pasar la función toggleTheme a los hijos si lo necesitas */}
//       {children}
//     </ThemeProvider>
//   );
// };

// export default ThemeProviderWrapper;
