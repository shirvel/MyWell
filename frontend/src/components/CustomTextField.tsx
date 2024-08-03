import React from 'react';
import TextField from '@mui/material/TextField';

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  helperText?: string;
  type?: string;
  required?: boolean
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, value, onChange, multiline = false, rows = 1, error = false, helperText = '', type = 'text', required = false }) => (
  <TextField
    fullWidth
    label={label}
    variant="outlined"
    value={value}
    onChange={onChange}
    multiline={multiline}
    rows={rows}
    required={required}
    error={error}
    helperText={helperText}
    type={type}
    InputProps={{
      style: {
        fontFamily: 'Product Sans',
        fontWeight: '500',
        padding: '10px'
      }
    }}
    InputLabelProps={{
      style: {
        fontFamily: 'Product Sans'
      }
    }}
    FormHelperTextProps={{
      style: {
        fontFamily: 'Product Sans'
      }
    }}
    sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '25px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
        },
        '& .MuiFormHelperText-root': {
          fontFamily: 'Product Sans'
        }
      }}      
  />
);
