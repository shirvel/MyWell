import { useEffect, useState } from "react";
import { useUserContext } from "../providers/UserContextProvider";
import { getWorkoutPlan, IWorkoutPlanner } from "./WorkoutPlannerService";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";
import { Workout } from "./Workout";
import { dayColumns, isDayPassed } from "../common/plannerUtils";

export const WorkoutPlanner = () => {
	const { userId } = useUserContext();
	const [workoutPlan, setWorkoutPlan] = useState<IWorkoutPlanner>();
	useEffect(() => {
		const loadWorkoutPlan = async () => {
			if (userId != null) {
				try {
					const response = await getWorkoutPlan(userId);
					if (response) setWorkoutPlan(response);
					console.log(response);
				} catch (err) {
					// setError("Failed to load meal plan");
				} finally {
					// setLoading(false);
					// requestInProgress.current = false;
				}
			}
		};
		loadWorkoutPlan();
	}, []);
	return (
		<div className="w-full py-8 px-2">
			{workoutPlan && (
				<Table className="w-full">
					<TableHead className="bg-blue-600">
						<TableRow>
							{dayColumns.map((day) => (
								<TableCell key={day} align="center">
									<div className="font-bold text-white decoration-8">{day}</div>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							{dayColumns.map((day) => (
								<TableCell
									key={day}
									align="center"
									sx={
										isDayPassed(day)
											? {
													backgroundColor: "#DCDCDC",
											  }
											: {}
									}>
									{workoutPlan[day] ? (
										<Workout workout={workoutPlan[day]} />
									) : (
										<div>rest</div>
									)}
								</TableCell>
							))}
						</TableRow>
					</TableBody>
				</Table>
			)}
		</div>
	);
};
