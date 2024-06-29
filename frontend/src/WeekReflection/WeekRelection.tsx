import {
	Container,
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
} from "@mui/material";

export const WeekReflection = () => {
	return (
		<Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
			<Card>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						How was your week?
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Its important to us to know how was you experience in our app! Its
						also important for you to reflect and think about the past week
						focusing on the positive effects! So grub a cup of tea and lets
						start!
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Start</Button>
				</CardActions>
			</Card>
		</Container>
	);
};
