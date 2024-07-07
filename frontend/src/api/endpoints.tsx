// For now..
const URL = "http://127.0.0.1:3000/";

const base = URL;
export const endpoints = {
	BASE: URL,
	MEAL_PLAN: {
		GET_USER_MEAL_PLAN: (user_id: string) =>
			base + "meal-plan/" + user_id + "/",
		CHANGE_MEAL: (user_id: string, meal_id: string) =>
			base + "meal-plan/" + user_id + "/" + meal_id + "/",
	},
	WEEKLY_REFLECTION: {
		CREATE_FEEDBACK: () => base + "api/weekly_reflection/"
	}
};
