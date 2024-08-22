import { endpoints } from "../api/endpoints";
import { get, patch, post } from "../api/requests";
import { dayColumns, PlannerDates } from "../common/plannerUtils";

export type IWorkout = {
	name: string;
	instructions: string[];
	_id: string;
	liked: boolean;
	done: boolean;
};
export type IWorkoutPlanner = Record<
	(typeof dayColumns)[number],
	Record<"Workout", IWorkout>
> & {
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
		const response = await patch(
			endpoints.WORKOUT_PLANNER.CHANGE_WORKOUT_PLANNER,
			{ userId }
		);
		console.log("Response from server:", response.data);
		return response;
	} catch (error) {
		console.error("Error in updating workout planner data:", error);
		return null;
	}
};

export const commentWorkout = async (
	userId: string,
	workoutId: string,
	comment: string,
	day: string
) => {
	try {
		console.log(`commenting on ${workoutId}: ${comment}`);
		const response = await changeWorkout(userId, workoutId, comment, day);
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error commenting on workout:", error);
		return null;
	}
};

export const changeWorkout = async (
	userId: string,
	workoutId: string,
	reason: string,
	day: string
) => {
	console.log(`change the workout: ${workoutId} because ${reason} `);
	const url = endpoints.WORKOUT_PLANNER.CHANGE_WORKOUT;
	return post(url, {
		user_id: userId,
		workout_id: workoutId,
		feedback: reason,
		day: day,
	});
};

export const changeLikeWorkout = async (
	userId: string,
	workoutId: string,
	workoutName: string,
	liked: boolean
) => {
	console.log(`change the workout: ${workoutName} like ${liked} `);
	const url = endpoints.WORKOUT_PLANNER.LIKE_WORKOUT;
	return post(url, {
		user_id: userId,
		workout_id: workoutId,
		feedback: `The user liked ${workoutName}`,
		liked: liked,
	});
};

export const changeDoneWorkout = async (
	userId: string,
	workoutId: string,
	done: boolean
) => {
	console.log(`change the workout: ${workoutId} to done ${done} `);
	const url = endpoints.WORKOUT_PLANNER.DONE_WORKOUT;
	return post(url, { user_id: userId, workout_id: workoutId, done: done });
};

export const addWorkoutPlannerFeedback = async (
	user_id: string | null,
	feedback: string
) => {
	try {
		const response = await post(endpoints.GENERAL_FEEDBACKS.WORKOUT, {
			user_id,
			feedback,
		});
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error in updating workout planner data:", error);
		return null;
	}
};
