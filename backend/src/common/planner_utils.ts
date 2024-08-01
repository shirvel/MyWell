import sendMessageToChatGPT from "../ai/chat_gpt_sender";
import { buildPromptForWeek } from "../ai/prompt_builder";

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const mealTypes = ['Breakfast', 'Lunch', 'Workout', 'Dinner'];

// Function to get the upcoming Sunday and Saturday
export const getStartAndEndDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startDate = new Date(today);
    const endDate = new Date(today);
  
    // Set the start date to the most recent Sunday
    // If today is Sunday, it should be set to today
    startDate.setDate(today.getDate() - dayOfWeek);
    
    // Set the end date to the upcoming Saturday
    endDate.setDate(startDate.getDate() + 6);
  
    return {
        startDate: startDate.toISOString().split('T')[0], // 'YYYY-MM-DD'
        endDate: endDate.toISOString().split('T')[0],     // 'YYYY-MM-DD'
    };
};

export const isValidResponse = (response) => {
  try {
    console.log(response)
    const parsedResponse = JSON.parse(`${response}`);

    console.log(parsedResponse)
    
    // Check that each day has the required meal keys
    const requiredMeals = ['Breakfast', 'Lunch', 'Dinner'];
    for (const day in parsedResponse) {
      const meals = parsedResponse[day];
      for (const meal of requiredMeals) {
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

export const getValidResponse = async (prompt, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`requesting attempt ${attempt}`)
    const responseJson = await sendMessageToChatGPT(prompt);
    const responseObject = isValidResponse(responseJson)
    
    if (responseObject != null) {
      // console.log(responseJson)
      return responseObject;
    }
    
    console.log(`Invalid response received (attempt ${attempt}), retrying...`);
  }
  
  throw new Error('Failed to get a valid response after maximum retries.');
};

export const createMealPlanner = async(userId: string, startDate: string, endDate: string) => {
  // Build prompts for each day of the week
  const prompts: string[] = await buildPromptForWeek(userId)

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

  return combinedResponse
}