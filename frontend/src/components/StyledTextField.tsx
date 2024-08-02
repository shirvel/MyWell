import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import './sharedStyles.css';

export const StyledTextField: React.FC<TextFieldProps> = (props) => {
    return (
        <TextField
            className="fullWidth"
            InputProps={{ classes: { root: 'inputRoot', input: 'inputProps' } }}
            InputLabelProps={{ className: 'inputLabel' }}
            {...props}
        />
    );
};
