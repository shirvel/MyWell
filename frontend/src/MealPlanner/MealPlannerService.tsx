import { endpoints } from "../api/endpoints";
import { get, post } from "../api/requests";

export const MealTypes = ["Breakfast", "Lunch", "Workout", "Dinner"];
export type IIngredient = { name: string, quantity?: string, comments?: string};
export type IMeal = { name: string, ingredients?: IIngredient[], instructions: string[], _id: string};
export type IMealPlanner = Record<
	string,
	Record<(typeof MealTypes)[number], IMeal>
>;

export const changeMeal = async (userId: string, meal: string, reason: string, day: string, type: string) => {
	console.log(`change the meal: ${meal} because ${reason} `);
	const url = endpoints.MEAL_PLAN.CHANGE_MEAL;
	return post(url, {user_id: userId, feedback: reason, day: day, type: type})
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

  export const changeMealPlanner = async (currentMealPlanned: any, userId: string): Promise<void> => {


	// try {
	// 	const url = endpoints.MEAL_PLAN.CHANGE_MEAL_PLANNER()
	// 	console.log(`Requesting meal plan from: ${url}`);
	// 	const data: IMealPlanner = await get(url);
	// 	console.log('Received meal plan data:', data);
	// 	return data;
	//   }

	
};

