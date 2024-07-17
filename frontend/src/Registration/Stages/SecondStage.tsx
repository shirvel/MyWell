import React, { useState } from 'react';
import { Typography, Checkbox, FormControlLabel, FormGroup, Card, CardContent } from "@mui/material";

const goalOptions = [
    { label: "Reduce Stress", emoji: "😅" },
    { label: "Eat Healthy", emoji: "🍔" },
    { label: "Improve Sleep", emoji: "😴" }
];

export const SecondStage = ({ formData, handleChange }) => {
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
        </div>
    );
};
