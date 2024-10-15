import { ChangeEvent, FC } from 'react';

import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Swipper from '../../layouts/Swipper';


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
interface IOption {
  value: any;
  label: string;
  color?: string;
}

interface IMultipleSelectFieldProps {
  label: string;
  name: string;
  value: any[];
  options: IOption[];
  onChange: (e: SelectChangeEvent<string[]> | ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  height?: string | number;
  disabled?: boolean;
}

type MenuItemStyles = (
  option: IOption,
  selectedValues: readonly any[],
  theme: Theme
) => SxProps<Theme>;

const getMenuItemStyles: MenuItemStyles = (option, selectedValues, theme) => {
  return {
    fontWeight:
      selectedValues.indexOf(option.value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
    height: '1.4rem',
  };
};

const MultipleSelectField: FC<IMultipleSelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  fullWidth = true,
  height = '56px',
  disabled = false }) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        multiple
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2, maxHeight: height, overflow: 'hidden' }}>
            {selected.map((value) => (
              <Chip key={value} label={options.find(e => e.value === value)?.label} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={{ height: height }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={getMenuItemStyles(option, value, theme)}
            disabled={disabled}
          >
            <Checkbox
              checked={value.indexOf(option.value) > -1}
              sx={{ padding: 0 }} />
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectField;
