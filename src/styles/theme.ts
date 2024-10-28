import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';


const getSystemMode = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? 'dark' : 'light';
  }
  return 'light';
};


export const getTheme = (mode?: 'light' | 'dark' | 'system') => {

  const finalMode = mode === 'system' || mode === undefined ? getSystemMode() : mode;

  return createTheme({
    palette: {
      mode: finalMode,
      ...(finalMode === 'light'
        ? {
          primary: {
            main: colors.primary["10"].hex,
          },
          secondary: {
            main: colors.secondary["10"].hex,
          },
          background: {
            default: colors.background.Primary.hex,
            paper: colors.background.Helper.hex,
          },
          text: {
            primary: colors.text.Dark.hex,
            secondary: colors.text.Light.hex,
          },
        }
        : {
          primary: {
            main: colors.primary["60"].hex,
          },
          secondary: {
            main: colors.secondary["60"].hex,
          },
          background: {
            default: colors.neutral["40"].hex,
            paper: colors.neutral["80"].hex,
          },
          text: {
            primary: colors.text.Light2.hex,
            secondary: colors.text.Medium.hex,
          },
        }),
    },
    typography: typography,
  });
};


const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[40].hex,
      light: colors.primary[10].hex,
      dark: colors.primary[60].hex,
    },
    secondary: {
      main: colors.secondary[40].hex,
      light: colors.secondary[10].hex,
      dark: colors.secondary[60].hex,
    },
    background: {
      default: colors.background.Primary.hex,
      paper: colors.background.Helper.hex,
    },
    text: {
      primary: colors.text.Dark.hex,
      secondary: colors.text.Light.hex,
    },
    error: {
      main: colors.feedback.Dark.hex,
    },
    success: {
      main: colors.feedback.DarkGreen.hex,
    },
    warning: {
      main: colors.feedback.DarkYellow.hex,
    },
    info: {
      main: colors.feedback.DarkAlt.hex,
    },
  },
  typography: typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
