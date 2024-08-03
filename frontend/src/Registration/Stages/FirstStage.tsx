import React from 'react';
import { CustomTextField } from '../../components/CustomTextField';
import { CustomSelect } from '../../components/CustomSelect';
import { CustomTypography } from '../../components/CustomTypography';
import { FormData, Errors } from '../types';

interface FirstStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
    errors: Errors;
}

export const FirstStage: React.FC<FirstStageProps> = ({ formData, handleChange, errors }) => (
  <div className="space-y-4 p-4">
    <CustomTypography variant='h5'>
      Getting to know you!
    </CustomTypography>

    <CustomTextField
      label="User Name"
      value={formData.name}
      onChange={(e) => handleChange('name', e.target.value)}
      error={!!errors.name}
      helperText={errors.name}
    />

    <CustomSelect
      label="Gender"
      value={formData.gender}
      onChange={(e) => handleChange('gender', e.target.value)}
      error={!!errors.gender}
      helperText={errors.gender}
      options={[
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ]}
    />

    <CustomTextField
      label="Birthday"
      type="date"
      value={formData.birthday}
      onChange={(e) => handleChange('birthday', e.target.value)}
      error={!!errors.birthday}
      helperText={errors.birthday}
    />
  </div>
);
