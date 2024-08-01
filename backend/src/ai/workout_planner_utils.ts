import sendMessageToChatGPT from "./chat_gpt_sender";
import { buildPromptAfterWorkoutFeedback, buildPromptForWorkoutWeek } from "./prompt/workout_prompt_builder";

const isValidResponse = (response) => {
  try {
    const parsedResponse = JSON.parse(`${response}`);
 
    // Check that each day has the required meal keys
    for (const day in parsedResponse) {
      const workouts = parsedResponse[day];
      if (!workouts['Workout']) {
        return null;
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

export const createWorkoutPlanner = async(userId: string, startDate: string, endDate: string) => {
  // Build prompts for each day of the week
  const prompt: string = await buildPromptForWorkoutWeek(userId)

  const response = await getValidResponse(prompt);
  console.log(response)
  
  return { 
    user_id: userId,
    startDate: startDate,
    endDate: endDate,
    ...response };
}

export const updateWorkoutPlanner = async (currentPlanner: any, userId: string, day: string) => {
  const workoutsJson = await sendMessageToChatGPT(await buildPromptAfterWorkoutFeedback(userId, day));

  console.log("Planner json: " + workoutsJson);
  const newWorkouts = JSON.parse(workoutsJson);

  Object.keys(newWorkouts).forEach(day => {
    currentPlanner[day] = {
      ...currentPlanner[day], // Keep existing data for the day
      ...newWorkouts[day] // Update with new workouts
    };
  });

  return currentPlanner;
}