import { TextField, Typography } from "@mui/material";
import { FormData } from "../types";

interface FourthStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
}

export const FourthStage: React.FC<FourthStageProps> = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4 p-4">
            <Typography 
                variant="h5" 
                gutterBottom
                style={{ fontWeight: 'bold', marginTop: '10px', fontFamily: 'Product Sans', fontSize: '30px' }}
            >
                More about you!
            </Typography>
            <TextField
                className="w-full"
                label="Any health conditions?"
                variant="outlined"
                multiline
                rows={5}
                value={formData.healthConditions}
                onChange={(e) => handleChange('healthConditions', e.target.value)}
                InputProps={{
                    style: {
                        fontFamily: 'Product Sans',
                        fontWeight: '500', // Thicker text
                        borderRadius: '25px', // More circular borders
                        padding: '12px', // Increased padding
                    }
                }}
                InputLabelProps={{
                    style: {
                        fontFamily: 'Product Sans',
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '25px', // More circular borders
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
                        '& fieldset': {
                            borderWidth: '2px', // Thicker border
                        }
                    },
                }}
            />
            <TextField
                className="w-full"
                label="Something else to mention?"
                variant="outlined"
                multiline
                rows={5}
                value={formData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                InputProps={{
                    style: {
                        fontFamily: 'Product Sans',
                        fontWeight: '500', // Thicker text
                        borderRadius: '25px', // More circular borders
                        padding: '12px', // Increased padding
                    }
                }}
                InputLabelProps={{
                    style: {
                        fontFamily: 'Product Sans',
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '25px', // More circular borders
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
                        '& fieldset': {
                            borderWidth: '2px', // Thicker border
                        }
                    },
                }}
            />
        </div>
    );
};
