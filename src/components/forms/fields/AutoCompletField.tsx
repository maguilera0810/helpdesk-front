import { FormControl, TextField } from '@mui/material';
import Autocomplete, { AutocompleteRenderInputParams, createFilterOptions } from '@mui/material/Autocomplete';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { IAutocompleteOption } from '../../../interfaces/GlobalInterfaces';


const filter = createFilterOptions<IAutocompleteOption>();

interface ISelectFieldProps {
  label: string;
  name: string;
  value: any;
  options: IAutocompleteOption[];
  onChange: (selectedValue: IAutocompleteOption | string | number | null) => void;
  onCreate?: (newValue: string) => void;
  fullWidth?: boolean;
  height?: string;
  readOnly?: boolean;
  canAdd?: boolean;
}

const AutoCompletField: React.FC<ISelectFieldProps> = ({
  label,
  value,
  name,
  options,
  onChange,
  onCreate,
  fullWidth = true,
  readOnly = false,
  canAdd = false,
  height = '56px' }) => {
  const [localValue, setLocalValue] = useState<IAutocompleteOption | null>(null);

  useEffect(() => {
    setLocalValue(options.find((e) => e.value === value) ?? null);
  }, [value, options])

  const handleInputChange = (e: SyntheticEvent, newValue: string | IAutocompleteOption | null, reason: string) => {
    e.preventDefault();
    if (typeof newValue === 'string') {
      canAdd && onCreate?.(newValue)
      setLocalValue({ label: newValue });
    } else if (newValue && newValue.inputValue) {
      canAdd && onCreate?.(newValue.inputValue)
      onChange({ label: newValue.inputValue })
      setLocalValue({ label: newValue.inputValue });
    } else if (newValue) {
      onChange(newValue)
      setLocalValue(newValue);

    }
  }

  return (
    <FormControl fullWidth={fullWidth}>
      <Autocomplete
        value={localValue}
        onChange={handleInputChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option.label);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              label: `Agregar "${inputValue}"`,
            });
          }
          return filtered;
        }}
        options={options}
        selectOnFocus
        clearOnEscape
        handleHomeEndKeys
        id={name}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.label}
            </li>
          );
        }}
        sx={{ height }}
        freeSolo
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField {...params} label={label} />
        )}
        fullWidth={fullWidth}
        readOnly={readOnly}
      />
    </FormControl>
  );
};

export default AutoCompletField;
