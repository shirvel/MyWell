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
