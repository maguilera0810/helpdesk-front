import React, { useState } from 'react';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import { generateRandomString } from '../../../utils/cryptoUtil';

interface PasswordFieldProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldStyles?: any; // Puedes ajustar esto según tus necesidades de estilo
  fieldProps?: any; // Puedes ajustar esto según tus necesidades de estilo
}


const PasswordField: React.FC<PasswordFieldProps> = ({ label, name, value, onChange, fieldStyles, fieldProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const generatePassword = () => {
    const newPassword = generateRandomString({ length: 12, useLowercase: true, useUppercase: true, useNumbers: true, useSpecialChars: true });
    const event = {
      target: { name, value: newPassword }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <TextField
      label={label ?? 'Password'}
      name={name}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      {...fieldProps}
      sx={fieldStyles}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              edge='end'
              sx={{ ...fieldStyles, padding: 0, marginX: 1 }}
              onClick={toggleShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton
              aria-label='new password'
              color='default'
              sx={{ ...fieldStyles, padding: 0, marginX: 0.1 }}
              onClick={generatePassword}
            >
              <AutorenewIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
