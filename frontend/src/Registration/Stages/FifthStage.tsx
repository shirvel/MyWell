import { Grid } from '@mui/material';
import { useState } from 'react';
import { Errors, FormData } from '../types';
import { CustomTextField } from '../../components/CustomTextField';
import { CustomButton } from '../../components/CustomButton';
import { CustomAvatar } from '../../components/CustomAvatar';
import { CustomTypography } from '../../components/CustomTypography';

interface FifthStageProps {
	formData: FormData;
	handleChange: (field: string, value: any) => void;
	errors: Errors;
}

export const FifthStage = ({
	formData,
	handleChange,
	errors,
}: FifthStageProps) => {
	const [image, setImage] = useState<string | ArrayBuffer>("");

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImage(e.target && e.target.result ? e.target.result : "");
			};
			handleChange("image", file);
			console.log("the image is", image);
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setImage("");
	};

  return (
    <div className="p-4">
      <CustomTypography variant='h5' style={{marginBottom: "20px"}}>
        Register
      </CustomTypography>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center">
          <input
            accept="image/*"
            type="file"
            id="image-upload"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <CustomAvatar alt="User Image" src={image.toString()} />
          </label>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {image && (
            <CustomButton
              variant="outlined"
              color="error"
              size="small"
              onClick={handleRemoveImage}
              label="Remove Image"
            />
          )}
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <CustomTextField
                label="Email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
				required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
				required={true}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
