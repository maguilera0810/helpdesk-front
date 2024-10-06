import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { IOption } from '../../../interfaces/GlobalInterfaces';

interface ISelectFieldProps {
  label: string;
  name: string;
  value: any;
  options: IOption[];
  onChange: (e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  height?: string;
  readOnly?: boolean;
}

const SelectField: React.FC<ISelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  fullWidth = true,
  readOnly = false,
  height = '56px' }) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        sx={{ height }}
        inputProps={{
          readOnly: readOnly,
        }}
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
