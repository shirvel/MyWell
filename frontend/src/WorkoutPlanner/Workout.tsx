import {
	Card,
	CardHeader,
	Avatar,
	CardActions,
	IconButton,
	FormControlLabel,
	Checkbox,
	Box,
	CardContent,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import EditIcon from "@mui/icons-material/Edit";
  import { useState } from "react";
  import { IWorkout, changeDoneWorkout, changeLikeWorkout } from "./WorkoutPlannerService";
  import { WorkoutDetailsModal } from "./WorkoutDetailsModal";
  import { ChangeWorkoutModal } from "./ChangeWorkoutModal";
  import { isDayPassed } from "../common/plannerUtils";
  
  export const Workout = ({ workout, day }: { workout: IWorkout | null, day: string }) => {
	const [liked, setLiked] = useState(workout?.liked || false);
	const [done, setDone] = useState(workout?.done || false);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [commentOpen, setCommentOpen] = useState(false);
	const userId = localStorage.getItem('userId');
  
	const handleLikeClick = () => {
	  if (workout) {
		workout.liked = !workout.liked;
		setLiked(workout.liked);
		changeLikeWorkout(userId!!, workout._id, workout.name, workout.liked);
	  }
	};
  
	const handleCheckboxChange = () => {
	  if (workout) {
		workout.done = !workout.done;
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
		<Card
		  className="h-full"
		  sx={
			isDayPassed(day)
			  ? {
				  backgroundColor: "#DCDCDC",
				  border: "none",
				  boxShadow: "none",
				}
			  : {}
		  }
		>
		  <Box onClick={handleCardClick} sx={{ cursor: "pointer" }}>
			<CardHeader
			  avatar={<Avatar>{workout ? <ExpandMoreIcon /> : "R"}</Avatar>}
			  title={workout ? workout.name : "Rest"}
			/>
			<CardContent sx={{ minHeight: "64px" }}> {/* Ensuring consistent height */}
			 
			</CardContent>
		  </Box>
  
		  {workout && (
			<CardActions
			  disableSpacing
			  sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0 16px', // Adjust padding for consistent spacing
			  }}
			>
			  <IconButton
				aria-label="Like"
				onClick={handleLikeClick}
				disabled={isDayPassed(day)}
			  >
				<FavoriteIcon style={{ color: liked ? "red" : "inherit" }} />
			  </IconButton>
			  <IconButton
				aria-label="Edit"
				onClick={handleEditClick}
				disabled={isDayPassed(day)}
			  >
				<EditIcon />
			  </IconButton>
			  <FormControlLabel
				control={
				  <Checkbox
					checked={done}
					onChange={handleCheckboxChange}
					disabled={isDayPassed(day)}
				  />
				}
				label=""
				sx={{ marginLeft: 'auto' }} // Align checkbox to the right
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
  