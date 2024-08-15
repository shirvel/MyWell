import { FC, useState, useEffect } from 'react';
import { Grid, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { updateMealPlanner } from '../MealPlanner/MealPlannerService';
import { updateWorkoutPlanner } from '../WorkoutPlanner/WorkoutPlannerService';
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
        let {severity, message} = await onSave(false)
        let isOk = severity !== "error";

        if (isOk) {
            message = "Working on your new plan! You'll be redirected to your new plan once it's done :)"
            severity = "info";
            setPopupSeverity(severity)
            setPopupMessage(message)
            setShowPopup(true);

            isOk = isOk && await updateMealPlanner(userId) !== null;
            isOk = isOk && await updateWorkoutPlanner(userId) !== null;
            if (isOk) {
                navigate('/meal-planner')
            }
        }
        
        // Something was not ok
        if (severity !== "error") {
            message = "There were problems generating your new plans. Please try again!"
            severity = "error";
        }
        
        setPopupSeverity(severity)
        setPopupMessage(message)
        setShowPopup(true);
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
                        Generate New Plans
                    </Button>
                </Grid>
            </Grid>
            <Snackbar style={{width: '20vw', left: '40vw'}} open={showPopup} autoHideDuration={popupSeverity === "info" ? null : 5000} 
                onClose={onPopupClose}>
                <Alert
                    severity={popupSeverity === "success" ? "success" : popupSeverity === "info" ? "info" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {popupSeverity === "info" && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2, color: 'white' }} />}
                    {popupMessage}
                </Alert>
                </Snackbar>
        </>
    );
};

export default ActionButtons;