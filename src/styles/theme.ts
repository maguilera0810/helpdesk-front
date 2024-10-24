// theme.ts
import { createTheme } from '@mui/material/styles';

import colors from './colors';
import typography from './typography';

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
      default: colors.background.Primary.hex, // Primary
      paper: colors.background.Helper.hex,   // Helper
    },
    text: {
      primary: colors.text.Dark.hex,  // Dark
      secondary: colors.text.Light.hex, // Light
    },
    error: {
      main: colors.feedback.Dark.hex,  // Dark (Feedback red)
    },
    success: {
      main: colors.feedback.DarkGreen.hex,  // Dark (Green feedback)
    },
    warning: {
      main: colors.feedback.DarkYellow.hex,  // Dark (Yellow feedback)
    },
    info: {
      main: colors.feedback.DarkAlt.hex,  // Dark (Blue feedback)
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
