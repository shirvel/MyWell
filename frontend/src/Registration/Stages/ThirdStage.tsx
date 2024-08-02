import React, { useState } from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { FormData, Errors } from "../types";

const dietOptions = [
    { label: "No specific diet", description: "I don't have any dietary restrictions" },
    { label: "Vegetarian", description: "I abstain from meat, fish, and poultry products" },
    { label: "Gluten-free", description: "I avoid wheat, barley, rye or other grains" }
];

interface ThirdStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
    errors: Errors;
}

export const ThirdStage: React.FC<ThirdStageProps> = ({ formData, handleChange, errors }) => {
    const [selectedDiet, setSelectedDiet] = useState(formData.specialDiets);

    const handleCardClick = (diet: string) => {
        setSelectedDiet(diet);
        handleChange('specialDiets', diet);
    };

    return (
        <div className="space-y-4 p-4">
            <Typography 
                variant="h5" 
                gutterBottom
                style={{ fontWeight: 'bold', marginTop: '10px', fontFamily: 'Product Sans', fontSize: '30px' }}
            >
                What is your diet?
            </Typography>
            {dietOptions.map(option => (
                <Card
                    key={option.label}
                    variant="outlined"
                    style={{
                        marginBottom: '10px',
                        cursor: 'pointer',
                        backgroundColor: selectedDiet === option.label ? '#1976d2' : 'white', // Primary color for selected card
                        borderRadius: '25px', // More circular borders
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
                        transition: 'background-color 0.3s, border-color 0.3s', // Smooth transition
                    }}
                    onClick={() => handleCardClick(option.label)}
                >
                    <CardContent style={{ textAlign: 'center' }}>
                        <Typography
                            variant="h6"
                            style={{ 
                                fontFamily: 'Product Sans',
                                color: selectedDiet === option.label ? 'white' : 'black', // White text for selected card
                            }}
                        >
                            {option.label}
                        </Typography>
                        <Typography variant="body2" style={{ fontFamily: 'Product Sans', color: selectedDiet === option.label ? 'white' : 'black' }}>
                            {option.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {errors.specialDiets && <Typography color="error" className="MuiFormHelperText-root">{errors.specialDiets}</Typography>}
        </div>
    );
};
