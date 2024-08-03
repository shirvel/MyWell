import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  error?: boolean;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, error = false, helperText = '', options }) => (
  <FormControl
    variant="outlined"
    fullWidth
    error={error}
    sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '25px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
        },
        '& .MuiFormHelperText-root': {
          fontFamily: 'Product Sans'
        }
      }}
  >
    <InputLabel style={{fontFamily: 'Product Sans'}}>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      label={label}
      sx={{
        fontFamily: 'Product Sans',
        fontWeight: '500',
        height: '80px',
        width: '100%',
        textAlign: 'left'
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);
