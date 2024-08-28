import React, { ChangeEvent, useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl, IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';

interface ITextAreaFieldProps extends Omit<TextFieldProps, 'onChange' | 'label'> {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  maxRows?: number;
  minRows?: number;
}

const TextAreaField: React.FC<ITextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  fullWidth = true,
  minRows = 1,
  maxRows = 6,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <FormControl fullWidth={fullWidth} sx={{ position: 'relative' }}>
      <TextField
        label={label}
        name={name}
        value={value}
        minRows={isExpanded ? maxRows : minRows}
        maxRows={maxRows}
        onChange={onChange}
        multiline
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ position: 'absolute', top: 14, right: 14 }}>
              <IconButton
                sx={{
                  padding: 0,
                  backdropFilter: 'blur(4px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  '&:focus': {
                    outline: 'none',
                  }
                }}
                edge="end"
                onClick={toggleExpand}
              >
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </InputAdornment>
          ),
          ...props.InputProps,
        }}
      />
    </FormControl>
  );
};

export default TextAreaField;
