// For now..
const URL = "http://127.0.0.1:3000/";

const base = URL;
export const endpoints = {
	BASE: URL,
	AUTH: {
		REGISTER: base + "auth/register/",
		LOGIN: base + "auth/login/",
		GET_USER_BY_ID: (userId: string) => base + "user/" + userId + "/",
		CREATE_NEW_TOKENS: base + "auth/refresh/",
	},
	MEAL_PLAN: {
		GET_USER_MEAL_PLAN: (user_id: string) =>
			base + "api/meal-planner/" + user_id + "/",
		CHANGE_MEAL: base + "meal_feedback/change",
		LIKE_MEAL: base + "meal_feedback/like",
		EAT_MEAL: base + "meal_feedback/eat",
		CHANGE_MEAL_PLANNER: base + "api/meal-planner/update-meal-planner",
	},
	GENERAL_FEEDBACKS: {
		WORKOUT: base + "general_feedback/workout",
		MEAL: base + "general_feedback/meal",
	},
	WORKOUT_PLANNER: {
		WORKOUT_PLAN: (user_id: string) =>
			base + "api/workout-planner/" + user_id + "/",
		CHANGE_WORKOUT: base + "workout_feedback/change",
		LIKE_WORKOUT: base + "workout_feedback/like",
		DONE_WORKOUT: base + "workout_feedback/done",
		CHANGE_WORKOUT_PLANNER: base + "api/workout-planner/update-workout-planner",
	},
	WEEKLY_REFLECTION: {
		CREATE_FEEDBACK: (user_id: string) =>
			base + "api/weekly_reflection/" + user_id,
	},
	IMAGE: {
		UPLOAD_IMAGE: base + "image/upload/",
	},
	USER: {
		UPDATE_USER: (id: string) => base + "user/" + id + "/",
	},
};
