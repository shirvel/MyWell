import React, { useState, FC, useEffect } from 'react';
import { TextField, FormControl, Typography, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface UserDetailsForm {
    mainGoal: string[] | undefined; 
    specialDiets: string [] | undefined; 
    healthConditions?: string; 
    comment?: string; 
    handleInputChange?: any;
    handleMultiSelectChange?: any;
}

const UserFormSection: FC<UserDetailsForm> = ({mainGoal, specialDiets, healthConditions, comment,
                                                handleInputChange, handleMultiSelectChange}) => {

    

    


    return (
        <>
            {/* <TextField
                label="Name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
            /> */}

            {/* <DatePicker
                label="Birthday"
                // value={userDetails.birthday}
                value={"20/12/1998"}
                onChange={handleDateChange}
            //    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            /> */}

            <FormControl fullWidth margin="normal">
                {/* <InputLabel>Gender</InputLabel> */}
                {/* <Select
                    name="gender"
                    value={userDetails.gender}
                    onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                </Select> */}
            </FormControl>

            <Typography variant='subtitle1' style={{color: 'gray'}} gutterBottom>Main Goal</Typography>
            <Grid container mt={1} spacing={1} style={{alignItems: 'center', justifyContent: 'center'}}>
                {['Reduce Stress', 'Eat Healthy', 'Improve Sleep'].map((goal) => (
                    <Grid item key={goal}>
                        <Button
                            onClick={(e) => handleMultiSelectChange(e, 'mainGoal')}
                            variant={(mainGoal ?? []).includes(goal) ? 'contained' : 'outlined'}
                            style={{width: '12vw'}}
                        >
                            {goal}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <Typography mt={3} variant="subtitle1" style={{color: 'grey'}} gutterBottom>Special Diet</Typography>
            <Grid container mt={1} spacing={1} style={{alignItems: 'center', justifyContent: 'center'}}>
                {['No Specific Diet', 'Vegetarian', 'Gluten Free'].map((diet) => (
                    <Grid item key={diet}>
                        <Button
                            onClick={(e) => handleMultiSelectChange(e, 'specialDiets')}
                            variant={(specialDiets ?? []).includes(diet) ? 'contained' : 'outlined'}
                            style={{width: '12vw'}}
                        >
                            {diet}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <TextField
                style={{ marginTop: 40 }}
                label="Health Conditions"
                name="healthConditions"
                value={healthConditions || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
            />

            <TextField
                label="Comments"
                name="comment"
                value={comment || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
        </>
    );
};

export default UserFormSection;
