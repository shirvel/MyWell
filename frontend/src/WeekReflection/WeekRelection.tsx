import {
	Container,
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
	Box,
} from "@mui/material";
import { useCallback, useState, useContext } from "react";
import { sendWeekReflection } from "./WeekReflectionService";
import { useNavigate } from "react-router-dom";
import { GlobalState, GlobalStateContext } from '../context/MyWellGlobalState';

export const WeekReflection = () => {
	const navigate = useNavigate();
	const { globalState, setGlobalState } = useContext(GlobalStateContext)!;
	const [feeling, setFeeling] = useState<string>("");
	const [pastWeek, setPastWeek] = useState<string>("");
	const [feedback, setFeedback] = useState<string>("");

	const saveReflection = useCallback(() => {
		const user_id = localStorage.getItem("userId");
		sendWeekReflection(user_id ?? "" , { feeling, pastWeek, feedback });
		setGlobalState((prev) => {return {...prev, didWeeklyReflection: true} as GlobalState})
		setFeeling("");
		setPastWeek("");
		setFeedback("");
		navigate('/meal-planner');
	}, [feeling, pastWeek, feedback]);

	return (
		<Box
			sx={{
				minHeight: '100vh',
				backgroundImage: `url('/background.jpg')`, // Replace with your image path
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 2,
			}}
		>
			<Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
				<Card>
					<CardContent>
						<Typography 
							gutterBottom 
							variant="h5" 
							component="div" 
							sx={{ 
								color: '#5e7b99', // Updated color
								fontFamily: 'Lora', // Matching font family
								fontWeight: 'bold', // Matching font weight
								fontSize: '2rem', // Adjust the font size to match
							}}
						>
							How was your week?
						</Typography>
						<Typography 
							variant="body2" 
							color="text.secondary" 
							className="pb-4" 
							sx={{ 
								color: '#5e7b99',
								fontFamily: 'Lora', // Matching font family
							}}
						>
							Its important to us to know how was you experience in our app! Its
							also important for you to reflect and think about the past week
							focusing on the positive effects! So grub a cup of tea and lets
							start!
						</Typography>
						<div className="space-y-4">
							<TextField
								className="w-full"
								label="How Are you feeling"
								variant="outlined"
								value={feeling}
								onChange={(event) => {
									setFeeling(event.target.value);
								}}
							/>
							<TextField
								className="w-full"
								label="How was the past week"
								variant="outlined"
								value={pastWeek}
								onChange={(event) => {
									setPastWeek(event.target.value);
								}}
							/>
							<TextField
								className="w-full"
								label="Feedback on the weekly plan"
								variant="outlined"
								value={feedback}
								onChange={(event) => {
									setFeedback(event.target.value);
								}}
							/>
						</div>
					</CardContent>
					<CardActions>
						<Button 
							variant="contained" 
							sx={{ backgroundColor: '#5e7b99', color: '#fff', fontFamily: 'Lora', textAlign: 'center' }}
							color="primary" onClick={saveReflection}>
							Save
						</Button>
					</CardActions>
				</Card>
			</Container>
		</Box>
	);
};
