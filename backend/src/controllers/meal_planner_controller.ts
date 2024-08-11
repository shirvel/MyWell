import { Request, Response } from 'express';
import MealPlanner from '../models/meal_planner';
import { createMealPlanner } from '../ai/meal_planner_utils';
import { getStartAndEndDates } from '../common/date_utils';
import { updateMealPlanner } from '../../src/ai/meal_planner_utils'

const plannerRequestInProgress: { [key: string]: boolean } = {};

// Get a planner by user ID
export const getMealPlanner = async (req: Request, res: Response) => {
  const { startDate, endDate } = getStartAndEndDates();
  const userId = req.params.user_id;

  // Check if a request is already in progress for this user
  if (plannerRequestInProgress[userId]) {
    return res.status(429).json({ error: 'A planner request is already in progress for this user.' });
  }

  // Set the flag to indicate a request is in progress
  plannerRequestInProgress[userId] = true;

  try {
    let planner = await MealPlanner.findOne({
      user_id: userId,
      startDate: startDate,
      endDate: endDate,
    }).lean();
    
    if (!planner) {
      const combinedResponse = await createMealPlanner(userId, startDate, endDate);
      const newPlanner = new MealPlanner(combinedResponse);
      console.log(newPlanner.toJSON());

      planner = await newPlanner.save();
    }

    console.log('Retrieved or created planner:', planner); // Debug statement

    res.status(200).json(planner);
    plannerRequestInProgress[userId] = false;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching planner' });
    plannerRequestInProgress[userId] = false;
  }
};

// Update a specific meal for a specific day
export const updateMeal = async (req: Request, res: Response) => {
  const { userId, day, meal } = req.params;
  const mealData = req.body;

  try {
    const update = {};
    update[`${day}.${meal}`] = mealData;

    const planner = await MealPlanner.findOneAndUpdate(
      { user_id: userId },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!planner) {
      return res.status(404).json({ error: 'Planner not found' });
    }

    res.status(200).json(planner);
  } catch (err) {
    console.error('Error updating meal:', err);
    res.status(500).json({ error: 'An error occurred while updating the meal' });
  }
};

// Update the meal planner
export const updateMealPlannerForUser = async (req: Request, res: Response) => {
  try {
    const { currentPlanner, userId, day, type } = req.body;

    // Validate the incoming data
    if (!currentPlanner || !userId || !day || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Call the service function
    const updatedPlanner = await updateMealPlanner(currentPlanner, userId, day, type);

    // Respond with the updated planner
    return res.status(200).json(updatedPlanner);
  } catch (error) {
    console.error("Error updating meal planner:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default { getMealPlanner, updateMeal, updateMealPlannerForUser };
