import { TextField } from "@mui/material";

export const FifthStage = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4 p-4">
            <TextField
                className="w-full"
                label="Email"
                variant="outlined"
                value={formData.Email}
                onChange={(e) => handleChange('email', e.target.value)}
            />
            <TextField
                className="w-full"
                label="Password"
                variant="outlined"
                value={formData.Password}
                onChange={(e) => handleChange('password', e.target.value)}
            />
        </div>
    );
};