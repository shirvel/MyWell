import { TextField } from "@mui/material";

export const FirstStage = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4 p-4">
            <TextField
                className="w-full"
                label="User Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
                className="w-full"
                label="Birthday"
                variant="outlined"
                value={formData.birthday}
                onChange={(e) => handleChange('birthday', e.target.value)}
            />
            <TextField
                className="w-full"
                label="Gender"
                variant="outlined"
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
            />
        </div>
    );
};