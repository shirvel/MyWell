import User, { IUser } from '../models/user_model';
import MealFeedback from '../models/meal_feedback';
import Planner from '../models/meal_planner';
import WeeklyReflection from '../models/weekly_reflection';
import { differenceInYears, parseISO } from 'date-fns';
import { firstExample } from './examples/first_example';
import { secondExample } from './examples/second_example';
import { thirdExample } from './examples/third_example';
import { daysOfWeek, mealTypes } from '../common/planner_utils';

const format = `The needed format for the result planner:\n` +
`{
    <day>: {
        Breakfast: {
            name: string,
            ingredients: [
                {
                    name: string,
                    quantity: string (optional),
                    comments: string (optinal, Comments for preparation or additional info)
                }
            ],
            instructions: []
        },
        Lunch: {
            name: string,
            ingredients: [
                {
                    name: string,
                    quantity: string (optional),
                    comments: string (optinal, Comments for preparation or additional info)
                }
            ],
            instructions: [],
        },
        Workout (optional): {
            name: string,
            instructions: [],
        },
        Dinner: {
            name: string,
            ingredients: [
                {
                    name: string,
                    quantity: string (optional),
                    comments: string (optinal, Comments for preparation or additional info)
                }
            ],
            instructions: [],
        }
    }
}\n`

const role = `Your rule is: nutritionist and fitness trainer.\n`

const examples = `A few examples to learn from:\n${firstExample}\n\n${secondExample}\n`

const buildPromptForDays = (userHistory: string, day: string): string => {
    const steps = `Steps to create a detailed meal and workout plan:\n` +
        `1. Check the user's details (age, plan goals, dietary restrictions and preferences).\n` +
        `2. Check the user's feedback on previous meals, to identify what the user doesn't like.\n` +
        `3. Check the user's previous weekly reflections, to understand the user's preferences.\n` +
        `4. For each day, create a detailed list of meals. All meals (breakfast, lunch, and dinner) needs to be included:\n` +
        `For each meal, provide:\n` +
        `\t- a list of ingredients.\n` +
        `\t- step-by-step cooking instructions.\n` +
        `5. Not all days must have a workout. According to the user's goal, involve a few exercises during the week.\n` +
        `For each workout, provide:\n` +
        `\t- a specific routine with detailed instructions on how to perform each exercise,` + 
        ` including sets, reps, and any necessary equipment.\n` +
        `At the end, make sure none of the results violate the user's needs.\n`;

    return `${steps}\n${format}\n${role}\n${examples}\n\n${userHistory}` +
    `Create a detailed planner for ${day} for the current user *in the given format* based on:\n` +
    `\t- Your role.\n` +
    `\t- the user's details and history.\n` +
    `\t- the given steps.\n` +
    `\t- the given examples.\n` +
    `return only the result in the format, no extra chars before or after.`;
}

export const buildPromptForWeek = async (userId: string): Promise<string[]> => {
    try {
        // Fetch and format user history once
        const userHistory = await formatUserHistory(userId);

        // Build prompts for each day range
        const prompts = daysOfWeek.map(day => 
            buildPromptForDays(userHistory, day)
        );

        return prompts;
    } catch (error) {
        console.error('Error building prompt:', error);
        throw new Error('Failed to build prompt');
    }
}

export const buildPromptAfterFeedback = async(userId: string, day: string, mealType: string): Promise<string> => {
    try {
        const possibleMealsToReplace = await getMealsFromDayAndMealType(userId, day, mealType);

        // Build the prompt
        const steps = `Steps to replace problametic meals in a plan:\n` +
        `1. Check the user's details (age, plan goals, dietary restrictions and preferences).\n` +
        `2. Check the user's feedbacks on previous meals, to identify what the user doesn't like.\n` +
        `3. Check the user's previous weekly reflections, to understand the user's preferences.\n` +
        `4. Go through the received meals.\n` +
        `For each meal, check if the meal invades the user's preferences or contains ingredients that the user dislikes, and if so, replace the meal.\n` +
        `For each meal, provide:\n` +
        `\t- a list of ingredients.\n` +
        `\t- step-by-step cooking instructions.\n` +
        `At the end, make sure again none of the results violate the user's needs.\n`
            
        return `${steps}\n${format}\n${role}\n\n` + 
        `${await formatUserHistory(userId)}` +
        `Here are the meals you need to check: ${possibleMealsToReplace}\n\n` +
        `Replace only the problematic meals for the current user. Return only the new meals. Base your answer on:\n` +
        `\t- The given format.\n` +
        `\t- Your rule.\n` +
        `\t- the user's details and history.\n` +
        `\t- the given steps.\n` +
        `\t- the given examples.`
    } catch (error) {
        console.error('Error building prompt:', error);
        throw new Error('Failed to build prompt');
    }
}

const formatUserHistory = async (userId: string) => {
    // Fetch user details
    const user = await User.findById(userId);
    if (user == null) throw new Error('User not found');

    return `Current user details:\n${formatUserDetails(user)}\n\n` +
        `Current user's feedbacks on previous meals':\n${await formatMealFeedbacks(userId)}\n\n` +
        `Current user's weekly reflections':\n${await formatWeeklyReflections(userId)}\n\n`
}

const formatUserDetails = (user: IUser) => {
    var userDetails = `Age: ${calculateAge(user.birthday)} years old.\n` +
    `Gender: ${user.gender}.\n` + 
    `Goals: ${user.mainGoal}.\n` +
    `Diets: ${user.specialDiets}.`

    if (user.healthConditions.length != 0) {
        userDetails += `\nHealth Conditions: ${user.healthConditions}.`
    }

    if (user.comment.length != 0) {
        userDetails += `\nExtra Information: ${user.comment}.`
    }

    return userDetails
}

const calculateAge = (birthday: string) : number => {
    const birthDate = parseISO(birthday);
    const today = new Date();
    return differenceInYears(today, birthDate);
}

const formatMealFeedbacks = async (userId: string) => {
    // Fetch all meal feedbacks for the user
    const mealFeedbacks = await MealFeedback.find({ user_id: userId });

    var feedbacks : string

    if (mealFeedbacks.length == 0) {
        feedbacks = `No feedbacks on meals were written yet.`
    }
    else {
        feedbacks = mealFeedbacks.map(feedback => (
            `* ${feedback.feedback}`
        )).join('');
    }

    return feedbacks
}

const formatWeeklyReflections = async (userId: string) => {
    // Fetch all weekly reflections for the user
    const weeklyReflections = await WeeklyReflection.find({ user_id: userId });

    var reflections : string

    if (weeklyReflections.length == 0) {
        reflections = `No weekly reflections were written yet.`
    }
    else {
        // Fetch all meal planners for the user
        const mealPlanners = await Planner.find({ user_id: userId });

        // Match meal planners to weekly reflections
        const reflectionsWithMealPlans = await Promise.all(
            weeklyReflections.map(async (reflection) => {
                const mealPlan = mealPlanners.find(plan =>
                new Date(plan.startDate) <= new Date(reflection.startDate) &&
                new Date(plan.endDate) >= new Date(reflection.endDate)
                );
                return {
                ...reflection.toObject(),
                mealPlan,
                };
            })
        );

        // Format weekly reflections and their corresponding meal planners
        reflections = reflectionsWithMealPlans.map(reflection => {
            if (reflection.mealPlan) {
                return `* The meal plan: ${formatMealPlan(reflection.mealPlan)}\n` +
                `The User's reflection:\n` +
                `Feeling: ${reflection.feeling}\n` +
                `How was the past week?: ${reflection.pastWeek}\n` +
                `Feedback: ${reflection.feedbackOnWeeklyPlan}\n`
            }
        }).join('\n\n');
    }

    return reflections
}

const formatMealPlan = (mealPlan: any): string => {
    return daysOfWeek.map(day => {
        if (!mealPlan || !mealPlan[day]) return '';
        const meals = mealPlan[day];
        const workout = meals.Workout ? `, Workout: ${meals.Workout.name}` : '';
        return `${day}: Breakfast: ${meals.Breakfast.name}, Lunch: ${meals.Lunch.name}${workout}, Dinner: ${meals.Dinner.name}`;
    }).join('\n');
}

const getMealsFromDayAndMealType = async (userId, startDay, startMealType) => {
    try {
      const planner = await Planner.findOne({ user_id: userId }).exec();
      if (!planner) throw new Error('Planner not found');
  
      // Find the index of the start day and start meal type
      const startDayIndex = daysOfWeek.indexOf(startDay);
      const startMealIndex = mealTypes.indexOf(startMealType);
  
      if (startDayIndex === -1 || startMealIndex === -1) throw new Error('Invalid day or meal type');
  
      // Extract meals from the planner starting from the specified day and meal type
      const mealsOnly = {};
      let dayReached = false;
      let mealReached = false;
  
      for (const day of daysOfWeek) {
        if (day === startDay) {
          dayReached = true;
        }
  
        if (dayReached) {
          mealsOnly[day] = {};
  
          for (const mealType of mealTypes) {
            if (day === startDay && mealType === startMealType) {
              mealReached = true;
            }
  
            if (mealReached) {
              mealsOnly[day][mealType] = planner[day][mealType];
            }
          }
        }
      }
  
      return JSON.stringify(mealsOnly, null, 2); // Pretty-print JSON with 2 spaces
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
};  