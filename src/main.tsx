import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n';

import App from './App';
import theme from './styles/theme';

// import './index.css';

{/* <I18nextProvider i18n={i18n}>
</I18nextProvider> */}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
)
