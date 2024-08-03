import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import UserImageSection from './UserImageSection';
import UserFormSection from './UserFormSection';
import ActionButtons from './ActionButtons';
import './UpdateUserDetails.css';
import { getConnectedUser, UserDetails} from '../UserDetails/UserDetails'
import { updateUserDetails } from './UpdateUserDetailsService';

export const UpdateUserDetails: any = () => {

    const [userDetails, setUserDetails] = useState<UserDetails>();
    
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
        fieldName: MultiSelectFields
    ) => {
        const value = e.currentTarget.textContent || '';
    
        setUserDetails(prevState => ({
            ...prevState,
            [fieldName]: (prevState![fieldName] ?? []).includes(value)
                ? (prevState![fieldName] ?? []).filter(item => item !== value) 
                : [...(prevState![fieldName] ?? []), value]
        } as UserDetails));
    };

    const handleImageChange = (newUrl: string) => {
        setUserDetails(prevState => ({
            ...prevState,
            imageUrl: newUrl
        } as UserDetails));
    };

    const onSave = () => {
        updateUserDetails(userDetails);
        window.location.reload();
    }


    return (
        <Grid container spacing={10} style={{ padding: '40px' }}>
            <Grid item xs={5}>
                <UserImageSection imageUrl={userDetails?.imageUrl} setUserImage={handleImageChange} />
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: '175px', paddingTop: '80px'}}>
                <UserFormSection mainGoal={userDetails?.mainGoal} specialDiets={userDetails?.specialDiets}
                 healthConditions={userDetails?.healthConditions} comment={userDetails?.comment}
                 handleInputChange={handleInputChange} handleMultiSelectChange={handleMultiSelectChange}/>
                <ActionButtons onSave={onSave}/>
            </Grid>
        </Grid>
    );
};
