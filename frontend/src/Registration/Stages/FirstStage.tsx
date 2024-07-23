import { TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { FormData, Errors } from "../types";

interface FirstStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
    errors: Errors;
}

export const FirstStage: React.FC<FirstStageProps> = ({ formData, handleChange, errors }) => {
    return (
        <div className="space-y-4 p-4">
            <TextField
                className="w-full"
                label="User Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
            />
            <FormControl variant="outlined" className="w-full" error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    label="Gender"
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                <FormHelperText>{errors.gender}</FormHelperText>
            </FormControl>
            <TextField
                className="w-full"
                label="Birthday"
                variant="outlined"
                type="date"
                value={formData.birthday}
                onChange={(e) => handleChange('birthday', e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                error={!!errors.birthday}
                helperText={errors.birthday}
            />
        </div>
    );
};
