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
            {dietOptions.map(option => (
                <Card
                    key={option.label}
                    variant="outlined"
                    style={{
                        marginBottom: '10px',
                        cursor: 'pointer',
                        border: selectedDiet === option.label ? '2px solid #1976d2' : '1px solid #ccc',
                        transition: 'border-color 0.3s',
                    }}
                    onClick={() => handleCardClick(option.label)}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            style={{ fontWeight: selectedDiet === option.label ? 'bold' : 'normal' }}
                        >
                            {option.label}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {option.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {errors.specialDiets && <Typography color="error">{errors.specialDiets}</Typography>}
        </div>
    );
};
