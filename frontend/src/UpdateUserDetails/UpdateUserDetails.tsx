import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography,Button, TextField} from '@mui/material';
import UserImageSection from './UserImageSection';
import ActionButtons from './ActionButtons';
import './UpdateUserDetails.css';
import { getConnectedUser, UserDetails } from '../UserDetails/UserDetails';
import { updateUserDetails } from './UpdateUserDetailsService';

export const UpdateUserDetails: any = () => {

    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);

    type MultiSelectFields = 'mainGoal' | 'specialDiets';

    useEffect(() => {
      const getUserDetails = async () => {
        const data = await getConnectedUser() as UserDetails;
        setUserDetails({
            mainGoal: data.mainGoal ?? [],
            specialDiets: data.specialDiets ?? [],
            healthConditions: data.healthConditions,
            comment: data.comment,
            imageUrl: data.imageUrl
        });
      };

      getUserDetails();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        } as UserDetails));
    };

    const handleMultiSelectChange = (
        e: React.MouseEvent<HTMLButtonElement>,
        fieldName: MultiSelectFields,
        multi: boolean
    ) => {
        const value = e.currentTarget.textContent || '';

        setUserDetails(prevState => ({
            ...prevState,
            [fieldName]: !multi ? 
                            [value] :
                            (prevState![fieldName] ?? []).includes(value)
                            ? (prevState![fieldName] ?? []).filter(item => item !== value) 
                            : [...(prevState![fieldName] ?? []), value]
        } as UserDetails));
    };

    const handleImageChange = (newUrl: string, newFile: File) => {
        setImageFile(newFile)
        setUserDetails(prevState => ({
            ...prevState,
            imageUrl: newUrl
        } as UserDetails));
    };

    const getFormErrors = () => {
        if (userDetails!.mainGoal.length < 1) {
            return "Please select at least one goal!"
        }
        else if (userDetails!.specialDiets.length !== 1) {
            return "Please select only one dietary option!"
        }

        return null
    }

    const onSave = async () => {
        const formErrors = getFormErrors()
        let message = null
        let severity = null
        if (!formErrors) {
            await updateUserDetails(userDetails, imageFile);
            severity = "success"
            message = "Your details have been saved successfully!"
        }
        else {
            severity = "error"
            message = formErrors
        }

        localStorage.setItem('popupSeverity', severity)
        localStorage.setItem('popupMessage', message);
        window.location.reload();
    }

    return (
        <Box 
            sx={{
                minHeight: '100vh',
                backgroundImage: `url('/background.jpg')`, // Replace with your actual background image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
            }}
        >
            <Grid container spacing={10} style={{ padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', maxWidth: '80%', margin: '0 auto' }}>
                <Grid item xs={4}>
                    <UserImageSection imageUrl={userDetails?.imageUrl} setUserImage={handleImageChange} />
                </Grid>
                <Grid item xs={7} style={{ paddingLeft: '100px', paddingTop: '80px'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Typography variant="h6" style={{color: '#5e7b99'}}>Main Goal</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                onClick={(e) => handleMultiSelectChange(e, 'mainGoal', true)}
                                variant={(userDetails?.mainGoal ?? []).includes('Reduce Stress') ? 'contained' : 'outlined'}
                                style={{width: '32%'}}
                            >
                                Reduce Stress
                            </Button>
                            <Button
                                onClick={(e) => handleMultiSelectChange(e, 'mainGoal', true)}
                                variant={(userDetails?.mainGoal ?? []).includes('Eat Healthy') ? 'contained' : 'outlined'}
                                style={{width: '32%'}}
                            >
                                Eat Healthy
                            </Button>
                            <Button
                                onClick={(e) => handleMultiSelectChange(e, 'mainGoal', true)}
                                variant={(userDetails?.mainGoal ?? []).includes('Improve Sleep') ? 'contained' : 'outlined'}
                                style={{width: '32%'}}
                            >
                                Improve Sleep
                            </Button>
                        </Box>

                        <Typography mt={3} variant="h6" style={{color: '#5e7b99'}}>Special Diet</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                onClick={(e) => handleMultiSelectChange(e, 'specialDiets', false)}
                                variant={(userDetails?.specialDiets ?? []).includes('No Specific Diet') ? 'contained' : 'outlined'}
                                style={{width: '32%'}}
                            >
                                No Specific Diet
                            </Button>
                            <Button
                                onClick={(e) => handleMultiSelectChange(e, 'specialDiets', false)}
                                variant={(userDetails?.specialDiets ?? []).includes('Vegetarian') ? 'contained' : 'outlined'}
                                style={{width: '32%'}}
                            >
                                Vegetarian
                            </Button>
                            <Button
                                onClick={(e) => handleMultiSelectChange(e, 'specialDiets', false)}
                                variant={(userDetails?.specialDiets ?? []).includes('Gluten-Free') ? 'contained' : 'outlined'}
                                style={{width: '32%'}}
                            >
                                Gluten-Free
                            </Button>
                        </Box>

                        <TextField
                            style={{ marginTop: 40 }}
                            label="Health Conditions"
                            name="healthConditions"
                            value={userDetails?.healthConditions || ''}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                        />

                        <TextField
                            label="Comments"
                            name="comment"
                            value={userDetails?.comment || ''}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                    </Box>

                    <ActionButtons onSave={onSave}/>
                </Grid>
            </Grid>
        </Box>
    );
};
