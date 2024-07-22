// For now..
const URL = "http://127.0.0.1:3000/";

const base = URL;
export const endpoints = {
	BASE: URL,
	AUTH: {
		CREATE_USER: () => base + "auth/register/",
		LOGIN: base + "auth/login/",
	},
	MEAL_PLAN: {
		GET_USER_MEAL_PLAN: (user_id: string) =>
			base + "api/planner/" + user_id + "/",
		CHANGE_MEAL: () => base + "meal_feedback/",
	},
	WEEKLY_REFLECTION: {
		CREATE_FEEDBACK: () => base + "api/weekly_reflection/",
	},
};
