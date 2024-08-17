import { endpoints } from "../api/endpoints";
import { get, patch, post } from "../api/requests";
import { dayColumns, PlannerDates } from "../common/plannerUtils";

export const MealTypes = ["Breakfast", "Lunch", "Dinner"];
export type IIngredient = {
	name: string;
	quantity?: string;
	comments?: string;
};
export type IMeal = {
	name: string;
	ingredients?: IIngredient[];
	instructions: string[];
	_id: string;
	liked: boolean;
	wasEaten: boolean;
};
export type IMealPlanner = Record<
	(typeof dayColumns)[number],
	Record<(typeof MealTypes)[number], IMeal>
> & { user_id: string; startDate: string; endDate: string };

export const changeMeal = async (
	userId: string,
	mealId: string,
	reason: string,
	day: string,
	type: string
) => {
	console.log(`change the meal: ${mealId} because ${reason} `);
	const url = endpoints.MEAL_PLAN.CHANGE_MEAL;
	return post(url, { user_id: userId, meal_id: mealId, feedback: reason, day: day, type: type });
};

export const changeLikeMeal = async (
	userId: string,
	mealId: string,
	mealName: string,
	liked: boolean
) => {
	console.log(`change the meal: ${mealName} like ${liked} `);
	const url = endpoints.MEAL_PLAN.LIKE_MEAL;
	return post(url, { user_id: userId, meal_id: mealId, feedback: `The user liked ${mealName}`, liked: liked });
};

export const changeEatenMeal = async (
	userId: string,
	mealId: string,
	wasEaten: boolean
) => {
	console.log(`change the meal: ${mealId} to eaten ${wasEaten} `);
	const url = endpoints.MEAL_PLAN.EAT_MEAL;
	return post(url, { user_id: userId, meal_id: mealId, wasEaten: wasEaten });
};

export const getMealPlan = async (
	userId: string,
	dates?: PlannerDates
): Promise<IMealPlanner> => {
	try {
		const url = endpoints.MEAL_PLAN.GET_USER_MEAL_PLAN(userId);
		console.log(`Requesting meal plan from: ${url}`);

		const data: IMealPlanner = await get(url, dates);
		console.log("Received meal plan data:", data);
		return data;
	} catch (error) {
		console.error("Error in getMealPlan:", error);
		throw error;
	}
};

export const updateMealPlanner = async (userId: string | null) => {
	try {
		const response = await patch(endpoints.MEAL_PLAN.CHANGE_MEAL_PLANNER, {userId});
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error in updating meal planner data:", error);
		return null;
	}
};
