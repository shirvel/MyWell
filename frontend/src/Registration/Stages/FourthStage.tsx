import React from 'react';
import { FormData } from '../types';
import { CustomTextField } from '../../components/CustomTextField';
import { CustomTypography } from '../../components/CustomTypography';

interface FourthStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
}

export const FourthStage: React.FC<FourthStageProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4 p-4">
        <CustomTypography variant='h5'>
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
