import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import { PlannerRecreationModal } from "./PlannerRecreationModal";
import {
	addMealPlannerFeedback,
	IMealPlanner,
	updateMealPlanner,
} from "../../MealPlanner/MealPlannerService";
import {
	addWorkoutPlannerFeedback,
	IWorkoutPlanner,
	updateWorkoutPlanner,
} from "../../WorkoutPlanner/WorkoutPlannerService";

export const PlannerRecreationButton = ({
	isMealPlan,
	setPlanner,
}: {
	isMealPlan: boolean;
	setPlanner:
		| React.Dispatch<React.SetStateAction<IMealPlanner | null>>
		| React.Dispatch<React.SetStateAction<IWorkoutPlanner | undefined>>;
}) => {
	const [open, setOpen] = useState(false);
	const onClose = async (feedback: string | null) => {
		if (!feedback) {
			setOpen(false);
			return;
		}
		const userId = localStorage.getItem("userId");
		if (isMealPlan) {
			// Save meal feedback
			await addMealPlannerFeedback(userId, feedback);
			// Recreate the planner
			const planner = await updateMealPlanner(userId);
			// Set the new planner
			setPlanner(planner);
		} else {
			// Save workout feedback
			await addWorkoutPlannerFeedback(userId, feedback);
			// Recreate the planner
			const planner = await updateWorkoutPlanner(userId);
			// Set the new planner
			setPlanner(planner);
		}
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
