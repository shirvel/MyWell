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
	try {
	  const url = endpoints.MEAL_PLAN.GET_USER_MEAL_PLAN(userId);
	  console.log(`Requesting meal plan from: ${url}`);
	  const data: IMealPlanner = await get(url);
	  console.log('Received meal plan data:', data);
	  return data;
	} catch (error) {
	  console.error('Error in getMealPlan:', error);
	  throw error;
	}
  };
