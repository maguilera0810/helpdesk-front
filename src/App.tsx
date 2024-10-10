import { FC, useEffect } from 'react';

import useGlobalData from './hooks/useGlobalData';

import AppRoutes from './routes';

const App: FC = () => {
  const { setReload } = useGlobalData();

  useEffect(() => {
    setReload(true);
  }, [])


  return (
    <AppRoutes />
  )
}

export default App
