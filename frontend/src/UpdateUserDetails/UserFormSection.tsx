import { FC } from 'react';
import { TextField, FormControl, Typography, Button, Grid } from '@mui/material';

interface UserDetailsForm {
    mainGoal: string[] | undefined; 
    specialDiets: string [] | undefined; 
    healthConditions?: string; 
    comment?: string; 
    handleInputChange?: any;
    handleMultiSelectChange?: any;
}

const dietMap: Record<string, string> = {

        "No Specific Diet": "No specific diet",
        "Vegetarian": "Vegetarian", 
        "Gluten Free": "Gluten-free"
    }


const UserFormSection: FC<UserDetailsForm> = ({mainGoal, specialDiets, healthConditions, comment,
                                                handleInputChange, handleMultiSelectChange}) => {

    return (
        <>
            <FormControl fullWidth margin="normal">
            </FormControl>

            <Typography variant='subtitle1' style={{color: 'gray'}} gutterBottom>Main Goal</Typography>
            <Grid container mt={1} spacing={1} style={{alignItems: 'center', justifyContent: 'center'}}>
                {['Reduce Stress', 'Eat Healthy', 'Improve Sleep'].map((goal) => (
                    <Grid item key={goal}>
                        <Button
                            onClick={(e) => handleMultiSelectChange(e, 'mainGoal', true)}
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
                            onClick={(e) => handleMultiSelectChange(e, 'specialDiets', false)}
                            variant={(specialDiets ?? []).includes(dietMap[diet]) ? 'contained' : 'outlined'}
                            style={{width: '12vw'}}
                        >
                            {dietMap[diet]}
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
