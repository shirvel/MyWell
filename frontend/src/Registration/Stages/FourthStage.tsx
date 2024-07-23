import { TextField } from "@mui/material";
import { FormData, Errors } from "../types";

interface FourthStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
}

export const FourthStage: React.FC<FourthStageProps> = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4 p-4">
            <TextField
                className="w-full"
                label="Any health conditions?"
                variant="outlined"
                multiline
                rows={4}
                value={formData.healthConditions}
                onChange={(e) => handleChange('healthConditions', e.target.value)}
            />
            <TextField
                className="w-full"
                label="Something else to mention?"
                variant="outlined"
                multiline
                rows={4}
                value={formData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
            />
        </div>
    );
};