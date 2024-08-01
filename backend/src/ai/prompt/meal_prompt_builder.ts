import { firstExample } from '../meal_examples/first_example';
import { secondExample } from '../meal_examples/second_example';
import { daysOfWeek } from '../../common/date_utils';
import { formatUserHistory, getMealsFromDayAndMealType } from './prompt_builder_utils';
import MealFeedback from '../../models/meal_feedback';

const format = `The needed format for the result meal planner:\n` +
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

const role = `Your rule is: nutritionist.\n`

const examples = `A few examples to learn from:\n${firstExample}\n\n${secondExample}\n`

const buildPromptForDays = (userHistory: string, day: string): string => {
    const steps = `Steps to create a detailed meal plan:\n` +
        `1. Check the user's details (age, plan goals, dietary restrictions and preferences).\n` +
        `2. Check the user's feedback on previous meals, to identify what the user doesn't like.\n` +
        `3. Check the user's previous weekly reflections, to understand the user's preferences.\n` +
        `4. For each day, create a detailed list of meals. All meals (breakfast, lunch, and dinner) needs to be included:\n` +
        `For each meal, provide:\n` +
        `\t- a list of ingredients.\n` +
        `\t- step-by-step cooking instructions.\n` +
        `At the end, make sure none of the results violate the user's needs.\n`;

    return `${steps}\n${format}\n${role}\n${examples}\n\n${userHistory}` +
    `Create a detailed planner for ${day} for the current user *in the given format* based on:\n` +
    `\t- Your role.\n` +
    `\t- the user's details and history.\n` +
    `\t- the given steps.\n` +
    `\t- the given examples.\n` +
    `return only the result in the format, no extra chars before or after.`;
}

export const buildPromptForMealsPlanner = async (userId: string): Promise<string[]> => {
    try {
        // Fetch and format user history once
        const userHistory = await formatUserHistory(userId) +
        `Current user's feedbacks on previous meals':\n${await formatMealFeedbacks(userId)}\n\n`;

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

export const buildPromptAfterMealFeedback = async(userId: string, day: string, mealType: string): Promise<string> => {
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
        `Current user's feedbacks on previous meals':\n${await formatMealFeedbacks(userId)}\n\n` +
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