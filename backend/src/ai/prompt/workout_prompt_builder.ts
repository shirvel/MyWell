import { firstExample } from '../workout_examples/first_example';
import { secondExample } from '../workout_examples/second_example';
import { thirdExample } from '../workout_examples/third_example';
import { formatUserHistory, getWorkoutsFromDay } from './prompt_builder_utils';
import WorkoutFeedback from '../../models/workout_feedback';
import WorkoutPlannerFeedback from '../../models/workout_planner_feedback';


const format = `The needed format for the result workout planner:\n` +
`{
    <day> (optional): {
        Workout: {
            name: string,
            instructions: [],
        }
    }
}\n`

const role = `Your rule is: fitness trainer.\n`

const examples = `A few examples to learn from:\n${firstExample}\n\n${secondExample}\n\n${thirdExample}\n`

export const buildPromptForWorkoutWeek = async (userId: string): Promise<string> => {
    try {
        // Fetch and format user history once
        const userHistory = await formatUserHistory(userId);

        const steps = `Steps to create a detailed workout plan:\n` +
        `1. Check the user's details (age, plan goals, dietary restrictions and preferences).\n` +
        `2. Check the user's feedback on previous workouts, to identify what the user doesn't like.\n` +
        `3. Check the user's previous weekly reflections, to understand the user's preferences.\n` +
        `4. Start on sunday. Not all days must have a workout.\n` +
        `According to the user's goal, involve a few exercises during the week.\n` +
        `For each workout, provide:\n` +
        `\t- a specific routine with detailed instructions on how to perform each exercise,` + 
        ` including sets, reps, and any necessary equipment.\n` +
        `At the end, make sure none of the results violate the user's needs.\n`;

        return `${steps}\n${format}\n${role}\n${examples}\n\n${userHistory}` +
        `Current user's feedbacks on previous workouts':\n${await formatWorkoutFeedbacks(userId)}\n\n` +
        `Create a detailed planner for the current user *in the given format* based on:\n` +
        `\t- Your role.\n` +
        `\t- the user's details and history.\n` +
        `\t- the given steps.\n` +
        `\t- the given examples.\n` +
        `return only the result in the format, no extra chars before or after.`;
    } catch (error) {
        console.error('Error building prompt:', error);
        throw new Error('Failed to build prompt');
    }
}

export const buildPromptAfterWorkoutFeedback = async(userId: string, day: string): Promise<string> => {
    try {
        const possibleWorkoutsToReplace = await getWorkoutsFromDay(userId, day);

        // Build the prompt
        const steps = `Steps to replace problametic workouts in a plan:\n` +
        `1. Check the user's details (age, plan goals, dietary restrictions and preferences).\n` +
        `2. Check the user's feedbacks on previous meals, to identify what the user doesn't like.\n` +
        `3. Check the user's previous weekly reflections, to understand the user's preferences.\n` +
        `4. Go through the received workouts.\n` +
        `For each workout, check if the exercise invades the user's preferences, and if so, replace the workout.\n` +
        `For each workout, provide:\n` +
        `\t- a specific routine with detailed instructions on how to perform each exercise,` + 
        ` including sets, reps, and any necessary equipment.\n` +
        `At the end, make sure again none of the results violate the user's needs.\n`
            
        return `${steps}\n${format}\n${role}\n\n` + 
        `${await formatUserHistory(userId)}` +
        `Current user's feedbacks on previous workouts':\n${await formatWorkoutFeedbacks(userId)}\n\n` +
        `Here are the workouts you need to check: ${possibleWorkoutsToReplace}\n\n` +
        `Replace only the problematic workouts for the current user. Return only the new workouts. Base your answer on:\n` +
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

const formatWorkoutFeedbacks = async (userId: string) => {
    // Fetch all meal feedbacks for the user
    const workoutFeedbacks = await WorkoutFeedback.find({ user_id: userId });
    const workoutGeneralFeedbacks = await WorkoutPlannerFeedback.find({ user_id: userId });

    var feedbacks : string

    if (workoutFeedbacks.length == 0 && workoutGeneralFeedbacks.length == 0) {
        feedbacks = `No feedbacks on workouts were written yet.`
    }
    else {
        feedbacks = workoutFeedbacks.map(feedback => (
            `* ${feedback.feedback}`
        )).join('');
        feedbacks += workoutGeneralFeedbacks.map(feedback => (
            `* ${feedback.feedback}`
        )).join('');
    }

    return feedbacks
}