import React, { FC } from 'react';
import { Grid, Button } from '@mui/material';
import { UserDetails } from '../UserDetails/UserDetails';

interface actions { 
    onSave: any;
}

const ActionButtons: FC<actions> = ({onSave}) => {
    const handleSubmit = () => {
        onSave();
        alert('Form submitted');
    };

    const handleCancel = () => {
        // Logic for canceling changes
        alert('Changes canceled');
    };

    const handleGenerateNewPlan = () => {
        // Logic for generating a new plan
        alert('New plan generated');
    };

    return (
        <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" onClick={handleGenerateNewPlan}>
                    Generate New Plan
                </Button>
            </Grid>
        </Grid>
    );
};

export default ActionButtons;