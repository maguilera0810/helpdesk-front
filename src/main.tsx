import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ThemeProviderWrapper from './styles/ThemeProviderWrapper';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n';

import App from './App';

import './index.css';

{/* <I18nextProvider i18n={i18n}>
</I18nextProvider> */}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </ThemeProviderWrapper>
  </StrictMode>,
)
