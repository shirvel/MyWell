import {
	Container,
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
	Box,
	Snackbar,
	Alert,
	SnackbarCloseReason,
  } from "@mui/material";
  import { useCallback, useState, useContext } from "react";
  import { sendWeekReflection } from "./WeekReflectionService";
  import { useNavigate } from "react-router-dom";
  import { GlobalStateContext } from '../context/MyWellGlobalState';
  
  export const WeekReflection = () => {
	const navigate = useNavigate();
	const { setGlobalState } = useContext(GlobalStateContext)!;
	const [feeling, setFeeling] = useState<string>("");
	const [pastWeek, setPastWeek] = useState<string>("");
	const [feedback, setFeedback] = useState<string>("");
  
	const [openSnackbar, setOpenSnackbar] = useState(false);
  
	const handleSnackbarClose = (
	  _event: React.SyntheticEvent<any, Event> | Event,
	  reason?: SnackbarCloseReason
	) => {
	  if (reason === 'clickaway') {
		return;
	  }
	  setOpenSnackbar(false);
	};
  
	const saveReflection = useCallback(() => {
	  const user_id = localStorage.getItem("userId");
	  sendWeekReflection(user_id ?? "" , { feeling, pastWeek, feedback });
	  setGlobalState((prev) => ({ ...prev, didWeeklyReflection: true }));
	  setFeeling("");
	  setPastWeek("");
	  setFeedback("");
	  setOpenSnackbar(true); // Show the Snackbar
  
	  // Delay the navigation to the meal planner
	  setTimeout(() => {
		navigate('/meal-planner');
	  }, 3000); // 3-second delay before navigating
	}, [feeling, pastWeek, feedback]);
  
	return (
	  <Box
		sx={{
		  minHeight: '100vh',
		  backgroundImage: `url('/background.jpg')`,
		  backgroundSize: 'cover',
		  backgroundPosition: 'center',
		  display: 'flex',
		  justifyContent: 'center',
		  alignItems: 'center',
		  padding: 2,
		}}
	  >
		<Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
		  <Card 
			sx={{
			  borderRadius: '50%',  // Make the card circular
			  width: '700px',       // Adjust width to make the circle bigger
			  height: '700px',      // Adjust height to make the circle bigger
			  display: 'flex',
			  flexDirection: 'column',
			  justifyContent: 'center',
			  alignItems: 'center',
			  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
			  overflow: 'hidden',
			  margin: '0 auto',     // Center the circle
			}}
		  >
			<CardContent 
			  sx={{ 
				padding: 2, 
				textAlign: 'center', 
				width: '90%',       // Increase the width to make text fields slightly wider
				maxWidth: '650px',  // Ensure the content doesn't exceed a certain width
			  }}
			>
			  <Typography 
				gutterBottom 
				variant="h5" 
				component="div" 
				sx={{ 
				  color: '#5e7b99', 
				  fontFamily: 'Lora',
				  fontWeight: 'bold',
				  fontSize: '2.5rem', // Increased font size
				}}
			  >
				How was your week?
			  </Typography>
			  <Typography 
				variant="body2" 
				color="text.secondary" 
				sx={{ 
				  color: '#5e7b99',
				  fontFamily: 'Lora',
				  marginBottom: '16px',  // Added margin for spacing
				  fontSize: '1.0rem',  // Increased font size
				}}
			  >
				It's important to us to know how your experience was in our app! It's
				also important for you to reflect and think about the past week
				focusing on the positive effects! So grab a cup of tea and let's
				start!
			  </Typography>
			  <TextField
				fullWidth
				label="Feeling"
				variant="outlined"
				value={feeling}
				onChange={(event) => {
				  setFeeling(event.target.value);
				}}
				sx={{ marginBottom: 2 }}
			  />
			  <TextField
				fullWidth
				label="Past Week"
				variant="outlined"
				value={pastWeek}
				onChange={(event) => {
				  setPastWeek(event.target.value);
				}}
				sx={{ marginBottom: 2 }}
			  />
			  <TextField
				fullWidth
				label="Feedback"
				variant="outlined"
				value={feedback}
				onChange={(event) => {
				  setFeedback(event.target.value);
				}}
				sx={{ marginBottom: 2 }}
			  />
			</CardContent>
			<CardActions sx={{ justifyContent: 'center' }}>
			  <Button 
				variant="contained" 
				sx={{ 
				  backgroundColor: '#5e7b99', 
				  color: '#fff', 
				  fontFamily: 'Lora',
				  textAlign: 'center',
				}}
				onClick={saveReflection}
			  >
				Save
			  </Button>
			</CardActions>
		  </Card>
		</Container>
		<Snackbar
		  open={openSnackbar}
		  autoHideDuration={6000}
		  onClose={handleSnackbarClose}
		  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
		  <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
			Your weekly reflection has been saved successfully!
		  </Alert>
		</Snackbar>
	  </Box>
	);
  };
  