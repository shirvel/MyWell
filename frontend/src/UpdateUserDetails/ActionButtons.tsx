import { FC, useState, useEffect } from 'react';
import { Grid, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { updateMealPlanner } from '../MealPlanner/MealPlannerService';
interface actions { 
    onSave: any;
}

const ActionButtons: FC<actions> = ({onSave}) => {
    
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [popupSeverity, setPopupSeverity] = useState<string | null>("")
    const [popupMessage, setPopupMessage] = useState<string | null>("")
    const navigate = useNavigate();

    useEffect(() => {
        const popupSeverityLS = localStorage.getItem('popupSeverity');
        const popupMessageLS = localStorage.getItem('popupMessage');
    
        if (popupSeverityLS !== null) { 
            setPopupSeverity(popupSeverityLS)
            setPopupMessage(popupMessageLS)
            setShowPopup(true);
            localStorage.removeItem('popupSeverity');
            localStorage.removeItem('popupMessage');
        }
      }, []);

    const handleSubmit = () => {
        onSave();
    };

    const onPopupClose = () => {
        setShowPopup(false);
    }

    const handleGenerateNewPlan = async () => {
        const userId = localStorage.getItem("userId")
        alert("Working on your new plan! You'll be redirected to your new plan once it's done :)");
        await updateMealPlanner(userId);
        navigate('/meal-planner')
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
            <Snackbar style={{width: '20vw', left: '40vw'}} open={showPopup} autoHideDuration={5000} 
                onClose={onPopupClose}>
                <Alert
                    severity={popupSeverity === "success" ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {popupMessage}
                </Alert>
                </Snackbar>
        </>
    );
};

export default ActionButtons;