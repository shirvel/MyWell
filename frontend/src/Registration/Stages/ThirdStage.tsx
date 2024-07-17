import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, Card, CardContent, Typography } from "@mui/material";

const dietOptions = [
    { label: "No specific diet", description: "I don't have any dietary restrictions" },
    { label: "Vegetarian", description: "I abstain from meat, fish, and poultry products" },
    { label: "Gluten-free", description: "I avoid wheat, barley, rye or other grains" },
    { label: "Vegan", description: "I avoid all animal-based products" }
];

export const ThirdStage = ({ formData, handleChange }) => {
    const [selectedDiet, setSelectedDiet] = useState(formData.specialDiets);

    const handleDietChange = (event) => {
        setSelectedDiet(event.target.value);
        handleChange('specialDiets', event.target.value);
    };

    return (
        <div className="space-y-4 p-4">
            <div>
                <RadioGroup name="diets" value={selectedDiet} onChange={handleDietChange}>
                    {dietOptions.map(option => (
                        <Card key={option.label} variant="outlined" style={{ marginBottom: '10px' }}>
                            <CardContent>
                                <FormControlLabel
                                    value={option.label}
                                    control={<Radio />}
                                    label={
                                        <div>
                                            <Typography variant="h6">{option.label}</Typography>
                                            <Typography variant="body2" color="textSecondary">{option.description}</Typography>
                                        </div>
                                    }
                                />
                            </CardContent>
                        </Card>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
};