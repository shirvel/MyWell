import sendMessageToChatGPT from "./chat_gpt_sender";
import { buildPromptAfterMealFeedback, buildPromptForMealsPlanner } from "./prompt/meal_prompt_builder";

export const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

const isValidResponse = (response) => {
  try {
    const parsedResponse = JSON.parse(`${response}`);
    
    // Check that each day has the required meal keys
    for (const day in parsedResponse) {
      const meals = parsedResponse[day];
      for (const meal of mealTypes) {
        if (!meals[meal]) {
          return null;
        }
      }
    }
    
    return parsedResponse;
  } catch (error) {
    console.error('Error parsing response:', error);
    return null;
  }
};

const getValidResponse = async (prompt, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`requesting attempt ${attempt}`)
      const responseJson = await sendMessageToChatGPT(prompt);
      const responseObject = isValidResponse(responseJson)
      
      if (responseObject != null) {
        return responseObject;
      }
    }
    catch {
      console.log("maximum tries.");
    }
    
    console.log(`Invalid response received (attempt ${attempt}), retrying...`);
  }
  
  throw new Error('Failed to get a valid response after maximum retries.');
};

export const createMealPlanner = async(userId: string, startDate: string, endDate: string) => {
  // Build prompts for each day of the week
  const prompts: string[] = await buildPromptForMealsPlanner(userId)

  let combinedResponse = {
    user_id: userId,
    startDate: startDate,
    endDate: endDate
  }

  const responses = await Promise.all(prompts.map(prompt => getValidResponse(prompt)));

  // Combine the valid responses into a single object
  for (const response of responses) {
    combinedResponse = { ...combinedResponse, ...response };
  }

  return combinedResponse;
}

export const updateMealPlanner = async (currentPlanner: any, userId: string, day: string, type: string) => {
  const mealsJson = await sendMessageToChatGPT(await buildPromptAfterMealFeedback(userId, day, type));

  console.log("Planner json: " + mealsJson);
  const newMeals = JSON.parse(mealsJson);

  Object.keys(newMeals).forEach(day => {
    currentPlanner[day] = {
      ...currentPlanner[day], // Keep existing data for the day
      ...newMeals[day] // Update with new meals
    };
  });

  return currentPlanner;
}