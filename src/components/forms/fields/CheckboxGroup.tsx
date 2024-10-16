import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { CheckboxGroupProps } from "../../../interfaces/ComponentInterfaces";



const CheckboxGroup: FC<CheckboxGroupProps<number>> = ({ label, options, value, isGroup = false, onChange }) => {

  const [selected, setSelected] = useState<number[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, value: number, isParent: boolean = false) => {
    const isChecked = e.target.checked;
    let updatedSelected: number[] = [];
    if (isParent) {
      updatedSelected = isChecked ? options.map(e => e.value) : [];
    } else {
      updatedSelected = isChecked ? [...selected, value] : selected.filter((item) => item !== value);
    }
    setSelected(updatedSelected);
    onChange?.(updatedSelected);
  };

  const getFather = () => {
    const title = <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{label}</Typography>;
    if (!isGroup) {
      return (
        <FormLabel component="legend">{title}</FormLabel>);
    }
    return <FormControlLabel
      label={title}
      control={
        <Checkbox
          checked={selected.length === options.length}
          indeterminate={selected.length !== 0 && selected.length < options.length}
          onChange={(e) => handleChange(e, -1, true)}
        />
      }
    />
  }

  return (
    <FormControl component="fieldset">
      {label && getFather()}
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            label={option.label}
            control={
              <Checkbox
                checked={selected.includes(option.value)}
                onChange={(e) => handleChange(e, option.value)}
              />
            }
            sx={{ marginLeft: 1, fontSize: 3 }}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroup;
