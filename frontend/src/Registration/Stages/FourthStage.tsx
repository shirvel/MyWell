import React from 'react';
import { FormData } from '../types';
import { CustomTextField } from '../../components/CustomTextField';
import { CustomTypography } from '../../components/CustomTypography';

const textColor = '#5A8BAF'; // The same color as the "Login" text

interface FourthStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
}

export const FourthStage: React.FC<FourthStageProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4 p-4">
        <CustomTypography
          variant='h5'
          style={{
            color: textColor, // Apply the same color as the "Login" text
            fontFamily: "'Lora', serif", // Ensure the font family matches as well
          }}
        >
            More about you!
        </CustomTypography>
      <CustomTextField
        label="Any health conditions?"
        value={formData.healthConditions}
        multiline={true}
        rows={5}
        onChange={(e) => handleChange('healthConditions', e.target.value)}
      />
      <CustomTextField
        label="Something else to mention?"
        value={formData.comment}
        multiline={true}
        rows={5}
        onChange={(e) => handleChange('comment', e.target.value)}
      />
    </div>
  );
};
