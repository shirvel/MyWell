import { endpoints } from "../api/endpoints";
import { get, patch } from "../api/requests";
import { dayColumns, PlannerDates } from "../common/plannerUtils";

export type IWorkout = {
	Workout: { name: string; instructions: string[] };
	_id: string;
};
export type IWorkoutPlanner = Record<(typeof dayColumns)[number], IWorkout> & {
	user_id: string;
	startDate: string;
	endDate: string;
};

export const getWorkoutPlan = async (
	userId: string,
	dates?: PlannerDates
): Promise<IWorkoutPlanner> => {
	try {
		const url = endpoints.WORKOUT_PLANNER.WORKOUT_PLAN(userId);
		const data: IWorkoutPlanner = await get(url, dates);
		return data;
	} catch (error) {
		throw error;
	}
};

export const updateWorkoutPlanner = async (userId: string | null) => {
	try {
		const response = await patch(endpoints.WORKOUT_PLANNER.CHANGE_WORKOUT_PLANNER, {userId});
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error in updating workout planner data:", error);
		return null;
	}
};
