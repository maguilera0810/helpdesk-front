import React, { ChangeEvent } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface ISelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  height?: string;
}

const SelectField: React.FC<ISelectFieldProps> = ({ label, name, value, options, onChange, fullWidth = true, height = '56px' }) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        sx={{ height }}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
