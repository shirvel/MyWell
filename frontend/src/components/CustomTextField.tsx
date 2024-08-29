import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type CustomTextFieldProps = TextFieldProps & {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  multiline = false,
  rows = 1,
  error = false,
  helperText = '',
  type = 'text',
  required = false,
  InputProps,
  InputLabelProps,
  FormHelperTextProps,
  sx,
  ...rest
}) => (
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
        padding: '10px',
        backgroundColor: 'transparent', // Set to transparent to remove any unwanted color
        border: '1px solid #ddd', // Add a border to ensure the input is visible
        borderRadius: '20px', // Optional: Keep the rounded corners
        color: '#000', // Ensure the text inside is black
      },
      disableUnderline: true, // Disable the underline to prevent any blue color from appearing
      ...InputProps, // Spread additional InputProps passed as props
    }}
    InputLabelProps={{
      style: {
        fontFamily: 'Product Sans',
        ...InputLabelProps?.style, // Spread additional InputLabelProps styles
      },
      ...InputLabelProps, // Spread additional InputLabelProps passed as props
    }}
    FormHelperTextProps={{
      style: {
        fontFamily: 'Product Sans',
        ...FormHelperTextProps?.style, // Spread additional FormHelperTextProps styles
      },
      ...FormHelperTextProps, // Spread additional FormHelperTextProps passed as props
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '25px',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
      },
      '& .MuiFormHelperText-root': {
        fontFamily: 'Product Sans',
      },
      ...sx, // Spread additional sx styles passed as props
    }}
    {...rest} // Spread any additional props passed to the component
  />
);
