import { Box, Button, Popover, TextField, Typography } from '@mui/material';
import {
  amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey,
  indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow
} from '@mui/material/colors';
import React, { useEffect, useState } from 'react';

interface ColorPickerFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (color: string) => void;
}
const COLORS = [
  amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey,
  indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow,
];
const COLOR_VARIANTS: Array<keyof typeof red> = [900, 700, 500, 300, 'A100', 'A200', 'A400'];
const COLOR_PALLETS = COLOR_VARIANTS.map(variant => COLORS.map(color => color[variant].toUpperCase()));

const ColorPickerField: React.FC<ColorPickerFieldProps> = ({ label, name, value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color: string) => {
    onChange(color);
    setSelectedColorIndex(COLOR_PALLETS.flat().indexOf(color as any));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value.toUpperCase();
    if (!newColor || /^#[0-9A-F]{0,6}$/i.test(newColor)) {
      onChange(newColor);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const maxIndex = COLOR_PALLETS.flat().length - 1;
    if (event.key === 'ArrowRight') {
      setSelectedColorIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    } else if (event.key === 'ArrowLeft') {
      setSelectedColorIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    } else if (event.key === 'ArrowDown') {
      setSelectedColorIndex((prev) => (prev + COLORS.length) <= maxIndex ? prev + COLORS.length : prev);
    } else if (event.key === 'ArrowUp') {
      setSelectedColorIndex((prev) => (prev - COLORS.length) >= 0 ? prev - COLORS.length : prev);
    } else if (event.key === 'Enter') {
      handleClose();
    }
  };

  useEffect(() => {
    handleColorChange(COLOR_PALLETS.flat()[selectedColorIndex]);
  }, [selectedColorIndex])

  const open = Boolean(anchorEl);
  const id = open ? 'color-popover' : undefined;

  return (
    <Box>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: value,
                borderRadius: 2,
                minWidth: 32,
                cursor: 'pointer',
              }}
              onClick={handleClick}
            />
          ),
        }}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Selecciona un color
          </Typography>
          {COLOR_PALLETS.map((palette, rowIndex) => (
            <Box sx={{ display: 'flex', gap: 0.05, flexWrap: 'wrap', margin: 0.05 }} key={`color-${rowIndex}`}>
              {palette.map((color) => (
                <Button
                  key={color}
                  onClick={() => { handleColorChange(color); }}
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: color,
                    minWidth: 'unset',
                    border: value === color ? '3px solid black' : '2px solid transparent',
                    boxShadow: value === color ? '0px 0px 15px 5px rgba(0, 0, 0, 1)' : 'none',
                    borderRadius: 2,
                    p: 0,
                    position: 'relative',
                    zIndex: value === color ? 1 : 0,
                    transform: value === color ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.5)',
                      zIndex: 2,
                      border: '3px solid black',
                      boxShadow: '0px 0px 15px 10px rgba(0, 0, 0, 1)',
                      backgroundColor: color,
                      borderStyle: 'solid',
                    },
                    '&:focus': {
                      outline: 'none',
                    }
                  }}
                />
              ))}
            </Box>))}
        </Box>
      </Popover>
    </Box>
  );
};

export default ColorPickerField;
