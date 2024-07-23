import { TextField } from "@mui/material";
import { FormData, Errors } from "../types";

interface FifthStageProps {
  formData: FormData;
  handleChange: (field: string, value: any) => void;
  errors: Errors;
}

export const FifthStage: React.FC<FifthStageProps> = ({ formData, handleChange, errors }) => {
    return (
        <div className="space-y-4 p-4">
            <TextField
                className="w-full"
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                className="w-full"
                label="Password"
                variant="outlined"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
            />
        </div>
    );
};
