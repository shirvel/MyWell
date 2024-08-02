import { TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText, Typography } from "@mui/material";
import { FormData, Errors } from "../types";

interface FirstStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
    errors: Errors;
}

export const FirstStage: React.FC<FirstStageProps> = ({ formData, handleChange, errors }) => {
    return (
        <div className="space-y-4 p-4">
            <Typography 
                variant="h5" 
                gutterBottom
                style={{ fontWeight: 'bold', marginTop: '10px', fontFamily: 'Product Sans', fontSize: '30px' }}
            >
                Getting to know you!
            </Typography>
            
            <TextField
                className="w-full"
                label="User Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                    style: {
                        fontFamily: 'Product Sans',
                        fontWeight: '500', // Thicker text
                        padding: '16px', // Increase padding
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
                        '& fieldset': {
                            borderWidth: '2px', // Thicker border
                        },
                        height: '80px', // Increase height
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Add shadow
                    },
                }}
            />
            
            <FormControl 
                variant="outlined" 
                className="w-full" 
                error={!!errors.gender}
                sx={{
                    '& .MuiInputLabel-root': {
                        fontFamily: 'Product Sans',
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '25px', // More circular borders
                        '& fieldset': {
                            borderWidth: '2px', // Thicker border
                        },
                        height: '80px', // Increase height
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Add shadow
                    },
                }}
            >
                <InputLabel>Gender</InputLabel>
                <Select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    label="Gender"
                    sx={{
                        fontFamily: 'Product Sans',
                        fontWeight: '500', // Thicker text
                        height: '80px', // Increase height
                    }}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                <FormHelperText sx={{ fontFamily: 'Product Sans' }}>{errors.gender}</FormHelperText>
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
                    style: { fontFamily: 'Product Sans' }
                }}
                error={!!errors.birthday}
                helperText={errors.birthday}
                InputProps={{
                    style: {
                        fontFamily: 'Product Sans',
                        fontWeight: '500', // Thicker text
                        padding: '16px', // Increase padding
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '25px', // More circular borders
                        '& fieldset': {
                            borderWidth: '2px', // Thicker border
                        },
                        height: '80px', // Increase height
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Add shadow
                    },
                }}
            />
        </div>
    );
};
