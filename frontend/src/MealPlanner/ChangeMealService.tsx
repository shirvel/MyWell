import { changeMeal } from "./MealPlannerService";

export const commentMeal = async (userId: string, mealName: string, summary: string, day: string, type: string) => {
	try {
		console.log(`commenting on ${mealName}: ${summary}`)
		const response = await changeMeal(userId, mealName, summary, day, type);
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error commenting on meal:", error);
		return null;
	}
};
