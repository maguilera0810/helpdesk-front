import React, { ChangeEvent, useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';

interface ITextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  minRows?: number;
  maxRows?: number;
}

const TextAreaField: React.FC<ITextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  fullWidth = true,
  minRows = 1,
  maxRows = 6,
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
        multiline
        value={value}
        minRows={isExpanded ? maxRows : minRows}
        maxRows={maxRows}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ position: 'absolute', top: 14, right: 14 }}>
              <IconButton
                sx={{
                  padding: 0,
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
        }}
      />
    </FormControl>
  );
};

export default TextAreaField;
