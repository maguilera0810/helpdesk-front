import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Theme, useTheme } from '@mui/material/styles';
import React, { ChangeEvent } from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';



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
    console.log(options.filter(op => op.value === item.value).length, item);

    return {
      fontWeight:
        options.filter(op => op.value === item.value).length
          ? theme.typography.fontWeightBold
          : theme.typography.fontWeightLight,
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
          // style={getStyles(option, options, theme)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectField;
