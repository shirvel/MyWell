import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Box,
} from "@mui/material";
import { IWorkout } from "./WorkoutPlannerService";
import WorkoutWithImage from "./WorkoutWithImage"; // Import the WorkoutWithImage component

interface WorkoutDetailsModalProps {
	workout: IWorkout;
	isOpen: boolean;
	onClose: () => void;
}

export const WorkoutDetailsModal = ({
	workout,
	isOpen,
	onClose,
}: WorkoutDetailsModalProps) => {
	// Extract exercise names from instructions
	const exercises = workout.instructions.map(inst => inst.split(':')[0].trim());

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>{workout.name}</DialogTitle>
			<DialogContent dividers>
				<Box>
					<Typography variant="h6" gutterBottom>
						Instructions
					</Typography>
					{workout.instructions.map((inst, index) => (
						<Typography key={index} variant="body1" gutterBottom>
							{inst}
						</Typography>
					))}

					{/* Display the images for the exercises */}
					<Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '16px', justifyContent: 'flex-end' }}>
						{exercises.map((exercise, index) => (
							<WorkoutWithImage key={index} workoutName={exercise} />
						))}
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
