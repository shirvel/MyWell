import { firstExample } from '../meal_examples/first_example';
import { secondExample } from '../meal_examples/second_example';
import { daysOfWeek } from '../../common/date_utils';
import { formatUserHistory, getMealsFromDayAndMealType } from './prompt_builder_utils';
import MealFeedback from '../../models/meal_feedback';
import MealPlannerFeedback from '../../models/meal_planner_feedback';


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
    return `Create a detailed meal planner for ${day} for the current user in the given format based on:
    - Your role.
    - The user's details and history.
    - The given steps.
    - The given examples.

Constraints:
    - Do not include any ingredients that the user dislikes!!!
    - Ensure that all meals align with the user’s dietary preferences (e.g., vegan, gluten-free, kosher, etc.).

Steps to create a detailed meal plan:
    - Check the user's details (age, plan goals, dietary restrictions, and preferences).
    - Check the user's feedback on previous meals to identify what the user doesn't like.
    - Check the user's previous weekly reflections to understand the user's preferences.
    - For each day, create a detailed list of meals. All meals (breakfast, lunch, and dinner) need to be included:
    For each meal, provide:
        * A list of ingredients.
        * Step-by-step cooking instructions.
    - At the end, validate the meal plan to ensure none of the results violate the user's dietary restrictions or preferences.

${userHistory}
${format}
${examples}
${role}`
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
        
        const userHistory = await formatUserHistory(userId) +
        `Current user's feedbacks on previous meals':\n${await formatMealFeedbacks(userId)}\n\n`;

        return `Replace only the problematic meals for the current user. Return only the new meals, in the given format based on:
    - Your role.
    - The user's details and history.
    - The given steps.
    - The given examples.

Constraints:
    - Do not include any ingredients that the user dislikes!!!
    - Ensure that all meals align with the user’s dietary preferences (e.g., vegan, gluten-free, kosher, etc.).

Steps to replace problametic meals in a plan:
    - Check the user's details (age, plan goals, dietary restrictions, and preferences).
    - Check the user's feedback on previous meals to identify what the user doesn't like.
    - Check the user's previous weekly reflections to understand the user's preferences.
    - Go through the received meals.
    For each meal, check if the meal invades the user's preferences or contains ingredients that the user dislikes, and if so, replace the meal.
    For each meal, provide:
        * A list of ingredients.
        * Step-by-step cooking instructions.
    - At the end, validate the meal plan to ensure none of the results violate the user's dietary restrictions or preferences.

${userHistory}
${format}
${role}

The meals to check:
${possibleMealsToReplace}`
    } catch (error) {
        console.error('Error building prompt:', error);
        throw new Error('Failed to build prompt');
    }
}

const formatMealFeedbacks = async (userId: string) => {
    // Fetch all meal feedbacks for the user
    const mealFeedbacks = await MealFeedback.find({ user_id: userId });
    const generalMealFeedbacks = await MealPlannerFeedback.find({ user_id: userId });

    var feedbacks : string

    if (mealFeedbacks.length == 0 && generalMealFeedbacks.length == 0) {
        feedbacks = `No feedbacks on meals were written yet.`
    }
    else {
        feedbacks = mealFeedbacks.map(feedback => (
            `* ${feedback.feedback}`
        )).join('');
        feedbacks += generalMealFeedbacks.map(feedback => (
            `* ${feedback.feedback}`
        )).join('');
    }

    return feedbacks
}