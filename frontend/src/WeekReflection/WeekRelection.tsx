import {
	Container,
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { sendWeekReflection } from "./WeekReflectionService";

export const WeekReflection = () => {
	const [feeling, setFeeling] = useState<string>("");
	const [pastWeek, setPastWeek] = useState<string>("");
	const [feedback, setFeedback] = useState<string>("");

	const saveReflection = useCallback(() => {
		sendWeekReflection("123", { feeling, pastWeek, feedback });
		setFeeling("");
		setPastWeek("");
		setFeedback("");
	}, [feeling, pastWeek, feedback]);

	return (
		<Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
			<Card>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						How was your week?
					</Typography>
					<Typography variant="body2" color="text.secondary" className="pb-4">
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
					<Button size="small" onClick={saveReflection}>
						Save
					</Button>
				</CardActions>
			</Card>
		</Container>
	);
};
