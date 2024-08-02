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
    const [selectedGoals, setSelectedGoals] = useState(formData.mainGoal ? formData.mainGoal.split(' & ') : []);

    const handleCardClick = (value: string) => {
        const newSelectedGoals = selectedGoals.includes(value)
            ? selectedGoals.filter(goal => goal !== value)
            : [...selectedGoals, value];

        setSelectedGoals(newSelectedGoals);
        handleChange('mainGoal', newSelectedGoals.join(' & '));
    };

    return (
        <div className="space-y-4 p-4">
            <Typography 
                variant="h5" 
                gutterBottom
                style={{ fontWeight: 'bold', marginTop: '10px', fontFamily: 'Product Sans', fontSize: '30px' }}
            >
                What are your main goals?
            </Typography>
            {goalOptions.map(option => (
                <Card
                    key={option.label}
                    variant="outlined"
                    style={{
                        marginBottom: '10px',
                        cursor: 'pointer',
                        border: selectedGoals.includes(option.label) ? '0px solid #1976d2' : '0px solid #ccc',
                        transition: 'border-color 0.3s',
                        borderRadius: '25px', // Circular borders
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
                        backgroundColor: selectedGoals.includes(option.label) ? '#1976d2' : 'white', // Primary color for selected card
                    }}
                    onClick={() => handleCardClick(option.label)}
                >
                <CardContent style={{ textAlign: 'center' }}>
                    <Typography
                            variant="h6"
                            style={{ 
                                fontFamily: 'Product Sans',
                                color: selectedGoals.includes(option.label) ? 'white' : 'black', // White text for selected card
                                padding: '8px',
                            }}
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
