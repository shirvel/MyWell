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
        const userHistory = await formatUserHistory(userId) +
        `Current user's feedbacks on previous workouts':\n${await formatWorkoutFeedbacks(userId)}\n\n`;

        return `Create a detailed planner for the current user in the given format based on:
    - Your role.
    - The user's details and history.
    - The given steps.
    - The given examples.
    
Constraints:
    - Do not include anything that the user dislikes!!!
    - Ensure that all meals align with the user’s preferences (e.g. health issues, etc.).
    
Steps to create a detailed workout plan:
    - Check the user's details (age, plan goals, dietary restrictions, and preferences).
    - Check the user's feedback on previous workouts to identify what the user doesn't like.
    - Check the user's previous weekly reflections to understand the user's preferences.
    - Start on sunday. Not all days must have a workout. According to the user's goal, involve a few exercises during the week.
    For each workout, provide a specific routine with detailed instructions on how to perform each exercise, including sets, reps, and any necessary equipment.
    - At the end, validate the workout plan to ensure none of the results violate the user's needs or preferences.
    
${userHistory}
${format}
${examples}
${role}`
    } catch (error) {
        console.error('Error building prompt:', error);
        throw new Error('Failed to build prompt');
    }
}

export const buildPromptAfterWorkoutFeedback = async(userId: string, day: string): Promise<string> => {
    try {
        const possibleWorkoutsToReplace = await getWorkoutsFromDay(userId, day);

        const userHistory = await formatUserHistory(userId) +
        `Current user's feedbacks on previous workouts':\n${await formatWorkoutFeedbacks(userId)}\n\n`;

        return `Replace only the problematic workouts for the current user. Return only the new workouts, in the given format based on:
    - Your role.
    - The user's details and history.
    - The given steps.
    - The given examples.

Constraints:
    - Do not include anything that the user dislikes!!!
    - Ensure that all meals align with the user’s preferences (e.g. health issues, etc.).

Steps to replace problametic workouts in a plan:
    - Check the user's details (age, plan goals, dietary restrictions, and preferences).
    - Check the user's feedback on previous workouts to identify what the user doesn't like.
    - Check the user's previous weekly reflections to understand the user's preferences.
    - Go through the received workouts.
    For each workout, check if the exercise invades the user's preferences, and if so, replace the workout.
    For each workout, provide a specific routine with detailed instructions on how to perform each exercise, including sets, reps, and any necessary equipment.
    - At the end, validate the workout plan to ensure none of the results violate the user's needs or preferences.

${userHistory}
${format}
${role}

The meals to check:
${possibleWorkoutsToReplace}`
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
        )).join('\n');
        feedbacks += workoutGeneralFeedbacks.map(feedback => (
            `* ${feedback.feedback}`
        )).join('\n');
    }

    return feedbacks
}