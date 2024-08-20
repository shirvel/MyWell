import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import { PlannerRecreationModal } from "./PlannerRecreationModal";
import { updateMealPlanner } from "../../MealPlanner/MealPlannerService";
import { updateWorkoutPlanner } from "../../WorkoutPlanner/WorkoutPlannerService";

export const PlannerRecreationButton = () => {
	const [open, setOpen] = useState(false);
	const onClose = async () => {
		const userId = localStorage.getItem("userId");
		// Add the user comments

		// Make the new planners
		await updateMealPlanner(userId);
		await updateWorkoutPlanner(userId);
		// set the new planner with loading

		setOpen(false);
	};
	return (
		<>
			<Tooltip title="Regenerate planner">
				<IconButton
					aria-label="delete"
					size="small"
					onClick={() => setOpen(true)}>
					<RefreshIcon />
				</IconButton>
			</Tooltip>
			<PlannerRecreationModal isOpen={open} onClose={onClose} />
		</>
	);
};
