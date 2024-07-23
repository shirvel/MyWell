import React, { useState } from 'react';
import { Typography, Checkbox, FormControlLabel, FormGroup, Card, CardContent } from "@mui/material";
import { FormData, Errors } from "../types";

const goalOptions = [
    { label: "Reduce Stress", emoji: "😅" },
    { label: "Eat Healthy", emoji: "🍔" },
    { label: "Improve Sleep", emoji: "😴" }
];

interface SecondStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
    errors: Errors;
}
  
export const SecondStage: React.FC<SecondStageProps> = ({ formData, handleChange, errors }) => {
    const [selectedGoals, setSelectedGoals] = useState(formData.mainGoal.split(' & '));

    const handleGoalChange = (event) => {
        const value = event.target.name;
        const newSelectedGoals = selectedGoals.includes(value)
            ? selectedGoals.filter(goal => goal !== value)
            : [...selectedGoals, value];

        setSelectedGoals(newSelectedGoals);
        handleChange('mainGoal', newSelectedGoals.join(' & '));
    };

    return (
        <div className="space-y-4 p-4">
            <FormGroup>
                {goalOptions.map(option => (
                    <Card key={option.label} variant="outlined" style={{ marginBottom: '10px' }}>
                        <CardContent>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedGoals.includes(option.label)}
                                        onChange={handleGoalChange}
                                        name={option.label}
                                    />
                                }
                                label={
                                    <div>
                                        <Typography variant="h6">{option.emoji} {option.label}</Typography>
                                    </div>
                                }
                            />
                        </CardContent>
                    </Card>
                ))}
            </FormGroup>
            {errors.mainGoal && <Typography color="error">{errors.mainGoal}</Typography>}
        </div>
    );
};
