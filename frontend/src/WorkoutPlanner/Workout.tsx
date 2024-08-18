import {
	Card,
	CardHeader,
	Avatar,
	CardActions,
	IconButton,
	FormControlLabel,
	Checkbox,
	Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { IWorkout, changeDoneWorkout, changeLikeWorkout } from "./WorkoutPlannerService";
import { WorkoutDetailsModal } from "./WorkoutDetailsModal";
import { ChangeWorkoutModal } from "./ChangeWorkoutModal";

export const Workout = ({ workout, day }: { workout: IWorkout | null, day: string }) => {
	const [liked, setLiked] = useState(workout?.liked || false);
	const [done, setDone] = useState(workout?.done || false);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [commentOpen, setCommentOpen] = useState(false);
	const userId = localStorage.getItem('userId');

	const handleLikeClick = () => {
		if (workout) {
			workout.liked = !workout.liked;
			console.log(`new liked: ${workout.liked}`);
			setLiked(workout.liked);
			changeLikeWorkout(userId!!, workout._id, workout.name, workout.liked);
		}
	};

	const handleCheckboxChange = () => {
		if (workout) {
			workout.done = !workout.done;
			console.log(`new completed: ${workout.done}`);
			setDone(workout.done);
			changeDoneWorkout(userId!!, workout._id, workout.done);
		}
	};

	const handleEditClick = () => {
		if (workout) {
			setCommentOpen(true);
		}
	};

	const handleCardClick = () => {
		if (workout) {
			setDetailsOpen(true);
		}
	};

	return (
		<>
			<Card onClick={workout ? handleCardClick : undefined} sx={{ cursor: workout ? "pointer" : "default" }}>
				<Box>
					<CardHeader
						avatar={<Avatar>{workout ? <ExpandMoreIcon /> : "R"}</Avatar>}
						title={workout ? workout.name : "Rest"}
					/>
				</Box>

				{workout && (
					<CardActions disableSpacing onClick={(e) => e.stopPropagation()}>
						<IconButton aria-label="Like" onClick={handleLikeClick}>
							<FavoriteIcon style={{ color: liked ? "red" : "inherit" }} />
						</IconButton>
						<IconButton aria-label="Edit" onClick={handleEditClick}>
							<EditIcon />
						</IconButton>
						<FormControlLabel
							control={
								<Checkbox
									checked={done}
									onChange={handleCheckboxChange}
								/>
							}
							label="Completed"
							sx={{ marginLeft: 1 }}
						/>
					</CardActions>
				)}
			</Card>

			{workout && (
				<ChangeWorkoutModal
					workout={workout}
					isOpen={commentOpen}
					closeModal={() => setCommentOpen(false)}
					day={day}
				/>
			)}

			{workout && (
				<WorkoutDetailsModal
					workout={workout}
					isOpen={detailsOpen}
					onClose={() => setDetailsOpen(false)}
				/>
			)}
		</>
	);
};
