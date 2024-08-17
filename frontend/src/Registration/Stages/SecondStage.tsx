import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { FormData, Errors } from '../types';
import { CustomCard } from '../../components/CustomCard';
import { CustomTypography } from '../../components/CustomTypography';

const goalOptions = [
    { label: "Reduce Stress", emoji: "😅" },
    { label: "Eat Healthy", emoji: "🍔" },
    { label: "Improve Sleep", emoji: "😴" }
];

const textColor = '#5A8BAF'; // The same color as the "Login" text

interface SecondStageProps {
  formData: FormData;
  handleChange: (field: string, value: any) => void;
  errors: Errors;
}

export const SecondStage: React.FC<SecondStageProps> = ({ formData, handleChange, errors }) => {
  const [selectedGoals, setSelectedGoals] = useState(
    formData.mainGoal ? formData.mainGoal.split(' & ') : []
  );

  const handleCardClick = (value: string) => {
    const newSelectedGoals = selectedGoals.includes(value)
      ? selectedGoals.filter((goal) => goal !== value)
      : [...selectedGoals, value];

    setSelectedGoals(newSelectedGoals);
    handleChange('mainGoal', newSelectedGoals.join(' & '));
  };

  return (
    <div className="space-y-4 p-4">
        <CustomTypography
          variant='h5'
          style={{
            color: textColor, // Apply the same color as the "Login" text
            fontFamily: "'Lora', serif", // Ensure the font family matches as well
          }}
        >
            What are your main goals?
        </CustomTypography>
      {goalOptions.map((option) => (
        <CustomCard
          key={option.label}
          label={option.label}
          emoji={option.emoji}
          selected={selectedGoals.includes(option.label)}
          onClick={() => handleCardClick(option.label)}
        />
      ))}
      {errors.mainGoal && (
        <Typography color="error" style={{ fontFamily: 'Product Sans' }}>
          {errors.mainGoal}
        </Typography>
      )}
    </div>
  );
};
