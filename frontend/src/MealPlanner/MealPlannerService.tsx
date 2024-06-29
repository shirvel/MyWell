import { endpoints } from "../api/endpoints";
import { get } from "../api/requests";

export const MealTypes = ["Breakfast", "Lunch", "Dinner"];
export type IMeal = { meal: string; meal_id: string };
export type IMealPlanner = Record<
	string,
	Record<(typeof MealTypes)[number], IMeal>
>;

export const changeMeal = async (mealId: string, reason: string) => {
	console.log(`change the meal: ${mealId} because ${reason} `);
};

export const getMealPlan = async (userId: string): Promise<IMealPlanner> => {
	// try {
	// 	const response = await get(endpoints.MEAL_PLAN.GET_USER_MEAL_PLAN(userId));
	// 	const data = await response.data;
	// 	const newPost: IMealPlanner = data;
	// 	return newPost;
	// } catch (error) {
	// 	throw error; // Handle any errors appropriately
	// }
	return {
		Sunday: {
			Breakfast: { meal: "coffee", meal_id: "123" },
			Lunch: { meal: "hamburger", meal_id: "123" },
			Dinner: { meal: "soup", meal_id: "123" },
		},
		Monday: {
			Breakfast: { meal: "coffee", meal_id: "123" },
			Lunch: { meal: "hamburger", meal_id: "123" },
			Dinner: { meal: "soup", meal_id: "123" },
		},
		Tuesday: {
			Breakfast: { meal: "coffee", meal_id: "123" },
			Lunch: { meal: "hamburger", meal_id: "123" },
			Dinner: { meal: "soup", meal_id: "123" },
		},
		Wednesday: {
			Breakfast: { meal: "coffee", meal_id: "123" },
			Lunch: { meal: "hamburger", meal_id: "123" },
			Dinner: { meal: "soup", meal_id: "123" },
		},
		Thursday: {
			Breakfast: { meal: "coffee", meal_id: "123" },
			Lunch: { meal: "hamburger", meal_id: "123" },
			Dinner: { meal: "soup", meal_id: "123" },
		},
		Friday: {
			Breakfast: { meal: "coffee", meal_id: "123" },
			Lunch: { meal: "hamburger", meal_id: "123" },
			Dinner: { meal: "soup", meal_id: "123" },
		},
		Saturday: {
			Breakfast: { meal: "coffee", meal_id: "123" },
			Lunch: { meal: "hamburger", meal_id: "123" },
			Dinner: { meal: "soup", meal_id: "123" },
		},
	};
};
