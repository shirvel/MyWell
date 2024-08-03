import React, { useState } from 'react';
import { Typography } from "@mui/material";
import { FormData, Errors } from "../types";
import { CustomCard } from '../../components/CustomCard';
import { CustomTypography } from '../../components/CustomTypography';

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
            <CustomTypography variant='h5'>
                What is your diet?
            </CustomTypography>
            {dietOptions.map(option => (
                <CustomCard
                    key={option.label}
                    label={option.label}
                    description={option.description}
                    selected={selectedDiet === option.label}
                    onClick={() => handleCardClick(option.label)}
                />
            ))}
            {errors.specialDiets && (
                <Typography color="error" style={{ fontFamily: 'Product Sans' }}>
                    {errors.specialDiets}
                </Typography>
            )}        
      </div>
    );
};
