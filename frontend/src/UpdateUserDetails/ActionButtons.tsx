import { FC, useState, useEffect } from 'react';
import { Grid, Button, Snackbar, Alert } from '@mui/material';
interface actions { 
    onSave: any;
}

const ActionButtons: FC<actions> = ({onSave}) => {
    
    const [showPopup, setShowPopup] = useState<boolean>(false)

    useEffect(() => {
        const popup = localStorage.getItem('popup');
    
        if (popup === 'true') {
          setShowPopup(true);
          localStorage.removeItem('popup');
        }
      }, []);

    const handleSubmit = () => {
        localStorage.setItem('popup', 'true');
        onSave();
    };


    const handleGenerateNewPlan = () => {
        // Logic for generating a new plan
        alert('New plan generated');
    };

    return (
        <>
            <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={handleGenerateNewPlan}>
                        Generate New Plan
                    </Button>
                </Grid>
            </Grid>
            <Snackbar style={{width: '18vw', left: '41vw'}} open={showPopup} autoHideDuration={5000} 
                onClose={() => {setShowPopup(false)}}>
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Your details have been updated!
                </Alert>
                </Snackbar>
        </>
    );
};

export default ActionButtons;