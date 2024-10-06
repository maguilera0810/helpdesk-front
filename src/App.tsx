
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import AppRoutes from './routes';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRoutes />
      </LocalizationProvider>
    </I18nextProvider>
  )
}

export default App
