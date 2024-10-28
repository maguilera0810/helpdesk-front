// import { FC } from 'react';

// import { Brightness4, Brightness7 } from '@mui/icons-material';
// import { IconButton } from '@mui/material';
// import uiStore from '../../../stores/uiStore';

// const ToggleThemeButton: FC = () => {
//   const { mode, toggleMode } = uiStore();

//   return (
//     <IconButton color="inherit" onClick={toggleMode} aria-label="toggle theme">
//       {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
//     </IconButton>
//   );
// };

// export default ToggleThemeButton;


import { FC } from 'react';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import uiStore from '../../../stores/uiStore';

const ToggleThemeButton: FC = () => {
  const { mode, toggleMode } = uiStore();

  return (
    <IconButton color="inherit" onClick={toggleMode} aria-label="toggle theme">
      {mode === 'light' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ToggleThemeButton;
