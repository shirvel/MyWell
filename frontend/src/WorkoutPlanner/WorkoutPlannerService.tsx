import { endpoints } from "../api/endpoints";
import { get } from "../api/requests";
import { dayColumns } from "../MealPlanner/MealPlanner";

export type IWorkout = {
	Workout: { name: string; instructions: string[] };
	_id: string;
};
export type IWorkoutPlanner = Record<(typeof dayColumns)[number], IWorkout>;

export const getWorkoutPlan = async (
	userId: string
): Promise<IWorkoutPlanner> => {
	try {
		const url = endpoints.WORKOUT_PLANNER.WORKOUT_PLAN(userId);
		const data: IWorkoutPlanner = await get(url);
		return data;
	} catch (error) {
		throw error;
	}
};
