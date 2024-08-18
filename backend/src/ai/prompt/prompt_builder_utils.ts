import User, { IUser } from '../../models/user_model';
import Planner from '../../models/meal_planner';
import WeeklyReflection from '../../models/weekly_reflection';
import { differenceInYears, parseISO } from 'date-fns';
import { mealTypes } from '../meal_planner_utils';
import { daysOfWeek } from '../../common/date_utils';
import workout_feedback from '../../models/workout_feedback';

export const formatUserHistory = async (userId: string) => {
    // Fetch user details
    const user = await User.findById(userId);
    if (user == null) throw new Error('User not found');

    return `Current user details:\n${formatUserDetails(user)}\n\n` +
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

export const getMealsFromDayAndMealType = async (userId, startDay, startMealType) => {
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

export const getWorkoutsFromDay = async (userId, startDay) => {
    try {
      const planner = await workout_feedback.findOne({ user_id: userId }).exec();
      if (!planner) throw new Error('Planner not found');
  
      // Find the index of the start day
      const startDayIndex = daysOfWeek.indexOf(startDay);
  
      if (startDayIndex === -1) throw new Error('Invalid day');
  
      // Extract workouts from the planner starting from the specified day
      const workouts = {};
      let dayReached = false;
  
      for (const day of daysOfWeek) {
        if (day === startDay) {
          dayReached = true;
        }
  
        if (dayReached) {
          workouts[day] = {};
          workouts[day]['Workout'] = planner[day]['Workout'];
      }
    }
  
      return JSON.stringify(workouts, null, 2); // Pretty-print JSON with 2 spaces
    } catch (error) {
      console.error('Error fetching workouts:', error);
      throw error;
    }
};  