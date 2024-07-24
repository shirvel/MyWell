import React, { useState } from 'react';
import { Typography, Card, CardContent } from "@mui/material";
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

    const handleCardClick = (value: string) => {
        const newSelectedGoals = selectedGoals.includes(value)
            ? selectedGoals.filter(goal => goal !== value)
            : [...selectedGoals, value];

        setSelectedGoals(newSelectedGoals);
        handleChange('mainGoal', newSelectedGoals.join(' & '));
    };

    return (
        <div className="space-y-4 p-4">
            {goalOptions.map(option => (
                <Card
                    key={option.label}
                    variant="outlined"
                    style={{
                        marginBottom: '10px',
                        cursor: 'pointer',
                        border: selectedGoals.includes(option.label) ? '2px solid #1976d2' : '1px solid #ccc',
                        transition: 'border-color 0.3s',
                    }}
                    onClick={() => handleCardClick(option.label)}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            style={{ fontWeight: selectedGoals.includes(option.label) ? 'bold' : 'normal' }}
                        >
                            {option.emoji} {option.label}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {errors.mainGoal && <Typography color="error">{errors.mainGoal}</Typography>}
        </div>
    );
};
