import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	CircularProgress,
    DialogContentText,
} from "@mui/material";
import { IWorkout, commentWorkout } from "./WorkoutPlannerService";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChangeWorkoutModalProps {
	workout: IWorkout;
	isOpen: boolean;
	closeModal: () => void;
    day: string;
}

export const ChangeWorkoutModal = ({
	workout,
	isOpen,
	closeModal,
	day
}: ChangeWorkoutModalProps) => {
	const [comment, setComment] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
    const userId = localStorage.getItem('userId')

	const sendChangeRequest = useCallback(async () => {
        if (!userId) {
			return;
		}

		setLoading(true);
		await commentWorkout(userId, workout._id, comment, day).then((response) => {
			if (response != null) {
				navigate(0); // Refresh the page
			}

			setLoading(false);
			closeModal();
		});
	}, [comment, workout._id, day, userId, navigate, closeModal]);

	return (
		<Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
			<DialogTitle>{`Provide Feedback for ${workout.name}`}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					If you want to change this workout, please indicate what didn't work for you.
				</DialogContentText>
				<TextField
					label="Additional comments"
					variant="outlined"
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					fullWidth
					multiline
					rows={3}
					margin="normal"
				/>
				{loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}
			</DialogContent>
			<DialogActions>
				<Button onClick={sendChangeRequest} disabled={loading} variant="contained">
					{loading ? "Saving..." : "Save"}
				</Button>
				<Button onClick={closeModal} disabled={loading} color="inherit">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};
