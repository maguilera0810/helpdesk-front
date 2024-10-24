// theme.ts
import { createTheme } from '@mui/material/styles';

import colors from './colors';
import typography from './typography';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[0].hex,
      light: colors.primary[1].hex,
      dark: colors.primary[4].hex,
    },
    secondary: {
      main: colors.secondary[0].hex,
      light: colors.secondary[1].hex,
      dark: colors.secondary[4].hex,
    },
    background: {
      default: colors.background[1].hex, // Primary
      paper: colors.background[0].hex,   // Helper
    },
    text: {
      primary: colors.neutral[6].hex,  // Dark
      secondary: colors.neutral[4].hex, // Light
    },
    error: {
      main: colors.feedback[0].hex,  // Dark (Feedback red)
    },
    success: {
      main: colors.feedback[6].hex,  // Dark (Green feedback)
    },
    warning: {
      main: colors.feedback[9].hex,  // Dark (Yellow feedback)
    },
    info: {
      main: colors.feedback[3].hex,  // Dark (Blue feedback)
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
