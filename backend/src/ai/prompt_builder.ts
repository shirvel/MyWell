import User, { IUser } from '../models/user_model';
import MealFeedback from '../models/meal_feedback';
import Planner from '../models/meal_planner';
import WeeklyReflection from '../models/weekly_reflection';
import { differenceInYears, parseISO } from 'date-fns';
import { firstExample } from './examples/first_example';
import { secondExample } from './examples/second_example';
import { thirdExample } from './examples/third_example';

export const buildPromptForWeek = async(userId: string): Promise<string> => {
    try {
        return `${await buildPrompt(userId)}\n` +
        `Create a detailed planner for the current user *in the given format* based on:\n` +
        `\t- Your rule.\n` +
        `\t- the user's details and history.\n` +
        `\t- the given steps.\n` +
        `\t- the given examples.`
    } catch (error) {
        console.error('Error building prompt:', error);
        throw new Error('Failed to build prompt');
    }
}

const buildPrompt = async (userId: string): Promise<string> => {
    try {
        // Fetch user details
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        // Build the prompt
        const steps = `Steps to create a detailed meal and workout plan:\n` +
        `1. Check the user's details (age, plan goals, dietary restrictions and preferences).\n` +
        `2. Check the user's feedbacks on previous meals, to identify what the user doesn't like.\n` +
        `3. Check the user's previous weekly reflections, to understand the user's preferences.\n` +
        `4. Start the week at sunday.\n` +
        `For each day of the week, Create a details list of meals (breakfast, lunch and dinner):\n` +
        `For each meal, provide:\n` +
        `\t- a list of ingredients.\n` +
        `\t- step-by-step cooking instructions.\n` +
        `5. Not all days must have a workout. According to the user's goal, invlove a few exercises during the week.\n` +
        `For each workout, provide:\n` +
        `\t- a specific routine with detailed instructions on how to perform each exercise,` + 
        ` including sets, reps, and any necessary equipment.\n` +
        `At the end, make sure none of the results violate the user's needs.\n`

        const format = `The needed format for the result planner:\n` +
        `{
            <day>: {
                Breakfast: {
                    name: string,
                    ingredients: [],
                    instructions: []
                },
                Lunch: {
                    name: string,
                    ingredients: [],
                    instructions: [],
                },
                Workout (optional): {
                    name: string,
                    instructions: [],
                },
                Dinner: {
                    name: string,
                    ingredients: [],
                    instructions: [],
                }
            }
        }\n`

        const temperature = `temperature: 0.6, for moderate creativity and variety in the responses.\n`

        const role = `Your rule is: nutritionist and fitness trainer.\n`

        const examples = `A few examples to learn from:\n${firstExample}\n\n${secondExample}\n\n${thirdExample}`
            
        const prompt = `${steps}\n${format}\n${temperature}\n${role}\n${examples}\n\n` + 
        `Current user details:\n${formatUserDetails(user)}\n\n` +
        `Current user's feedbacks on previous meals':\n${await formatMealFeedbacks(userId)}\n\n` +
        `Current user's weekly reflections':\n${await formatWeeklyReflections(userId)}\n\n`
        return prompt;
    } catch (error) {
        console.error('Error building prompt:', error);
        throw new Error('Failed to build prompt');
    }
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
            `* The meal: ${feedback.meal}. The user's comment: ${feedback.feedback}.`
        )).join('\n');
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
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek.map(day => {
        if (!mealPlan || !mealPlan[day]) return '';
        const meals = mealPlan[day];
        const workout = meals.Workout ? `, Workout: ${meals.Workout.name}` : '';
        return `${day}: Breakfast: ${meals.Breakfast.name}, Lunch: ${meals.Lunch.name}${workout}, Dinner: ${meals.Dinner.name}`;
    }).join('\n');
}