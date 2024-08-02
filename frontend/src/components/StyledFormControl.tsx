import { FormControl, FormControlProps, InputLabel, Select, FormHelperText } from "@mui/material";
import React from "react";
import './sharedStyles.css';

interface StyledFormControlProps extends FormControlProps {
    label: string;
    value: any;
    onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
    error: string | null;
}

export const StyledFormControl: React.FC<StyledFormControlProps> = ({ label, value, onChange, error, children }) => {
    return (
        <FormControl variant="outlined" className="fullWidth" error={!!error}>
            <InputLabel className="inputLabel">{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={label}
                classes={{ root: 'inputRoot', select: 'inputProps' }}
            >
                {children}
            </Select>
            {error && <FormHelperText className="inputLabel">{error}</FormHelperText>}
        </FormControl>
    );
};
