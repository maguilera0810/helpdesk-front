import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </I18nextProvider>
  </StrictMode>,
)
