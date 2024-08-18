import { useCallback, useEffect, useRef, useState } from "react";
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
import { dayColumns, isDayPassed, PlannerDates } from "../common/plannerUtils";
import { DateNav } from "../common/PlannerDateNav";

export const WorkoutPlanner = () => {
	const { userId } = useUserContext();
	const [loading, setLoading] = useState<boolean>(true);
	const requestInProgress = useRef<boolean>(false);
	const [workoutPlan, setWorkoutPlan] = useState<IWorkoutPlanner>();
	const [dates, setDates] = useState<PlannerDates | null>(null);
	const loadWorkoutPlan = useCallback(async (dates?: PlannerDates) => {
		if (dates) {
			setDates({ startDate: dates.startDate, endDate: dates.endDate });
		}
		if (userId != null) {
			if (requestInProgress.current) {
				return; // Exit if a request is already in progress
			}

			requestInProgress.current = true;
			try {
				const response = await getWorkoutPlan(userId, dates);
				setWorkoutPlan(response);
				setDates({
					startDate: response.startDate,
					endDate: response.endDate,
				});
			} catch (err) {
				// setError("Failed to load meal plan");
			} finally {
				setLoading(false);
				requestInProgress.current = false;
			}
		}
	}, []);

	useEffect(() => {
		loadWorkoutPlan();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return workoutPlan ? (
		<div className="w-full py-8 px-2">
			<DateNav
				dates={{
					startDate: workoutPlan.startDate,
					endDate: workoutPlan.endDate,
				}}
				loadPlan={loadWorkoutPlan}
			/>
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
									<Workout workout={workoutPlan[day].Workout} day={day} />
								) : (
									<div>rest</div>
								)}
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</div>
	) : (
		<div>
			no workout plan
			<DateNav
				dates={{ startDate: dates?.startDate, endDate: dates?.endDate }}
				loadPlan={loadWorkoutPlan}
			/>
		</div>
	);
};
