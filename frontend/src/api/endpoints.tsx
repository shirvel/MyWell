// For now..
const URL = "http://127.0.0.1:3000/";

const base = URL;
export const endpoints = {
	BASE: URL,
	AUTH: {
		REGISTER: base + "auth/register/",
		LOGIN: base + "auth/login/",
		GET_USER_BY_ID: (userId: string) => base + "user/" + userId + "/",
	},
	MEAL_PLAN: {
		GET_USER_MEAL_PLAN: (user_id: string) =>
			base + "api/meal-planner/" + user_id + "/",
		CHANGE_MEAL: base + "meal_feedback/",
	},
	WEEKLY_REFLECTION: {
		CREATE_FEEDBACK: base + "api/weekly_reflection/",
	},
	IMAGE: {
		UPLOAD_IMAGE: base + "image/upload/",
	},
};
