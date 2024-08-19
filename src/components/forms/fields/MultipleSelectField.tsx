import React, { ChangeEvent } from 'react';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Theme, useTheme } from '@mui/material/styles';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


interface IMultipleSelectFieldProps {
  label: string;
  name: string;
  value: any[];
  options: Array<{ value: any; label: string }>;
  onChange: (e: SelectChangeEvent<string[]> | ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  height?: string;
}

const MultipleSelectField: React.FC<IMultipleSelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  fullWidth = true,
  height = '56px' }) => {
  const theme = useTheme();

  const getStyles = (item: any, options: readonly any[], theme: Theme) => {
    return {
      fontWeight:
        options.indexOf(item.value) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightBold,
    };
  }

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        // sx={{ height }}
        multiple
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
            {selected.map((value) => (
              <Chip key={value} label={options.find(e => e.value === value)?.label} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={{
          height,
        }}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={getStyles(option, value, theme)}
          >
            <Checkbox checked={value.indexOf(option.value) > -1} />
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectField;
