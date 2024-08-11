import { Request, Response } from 'express';
import MealPlanner from '../models/meal_planner';
import { createMealPlanner } from '../ai/meal_planner_utils';
import { getStartAndEndDates } from '../common/date_utils';

const plannerRequestInProgress: { [key: string]: boolean } = {};


export const getMealPlannerByDate = async (req: Request, res: Response) => {
  const { startDate, endDate } = getStartAndEndDates();
  const userId = req.params.user_id;

};

// Get a planner by user ID
export const getMealPlanner = async (req: Request, res: Response) => {
  var startDate, endDate = "";
  if (req.query.startDate && req.query.endDate){
    startDate = req.query.startDate;
    endDate = req.query.endDate.toString();
  }else{
    const res = getStartAndEndDates();
    startDate = res.startDate;
    endDate = res.endDate;
  }
  
  const userId = req.params.user_id;
  console.log("the query: ", req.query);

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
    
    if (!planner && !req.query.startDate) {
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

export default { getMealPlanner, updateMeal };
