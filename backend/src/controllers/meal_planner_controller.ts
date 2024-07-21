import { Request, Response } from 'express';
import Planner from '../models/meal_planner';
import { log } from 'console';

// Create a new planner
export const createPlanner = async (req: Request, res: Response) => {
  console.log('Received request body:', JSON.stringify(req.body, null, 2)); // Pretty-print request body

  const planner = new Planner(req.body);
  try {
    await planner.save();
    console.log('Saved planner:', JSON.stringify(planner, null, 2)); // Pretty-print saved document
    res.status(201).json(planner);
  } catch (err) {
    console.error('Error saving planner:', err); // Debug statement
    res.status(500).json({ error: "fail: " + (err as Error).message });
  }
};

// Get a planner by user ID
export const getPlanner = async (req: Request, res: Response) => {
  try {
    const planner = await Planner.findOne({ user_id: req.params.user_id }).lean();
    if (!planner) {
      return res.status(404).json({ error: 'Planner not found' });
    }

    res.status(200).json(planner);
  } catch (err) {
    console.error('Error fetching planner:', err); // Debug statement
    res.status(500).json({ error: 'An error occurred while fetching planner' });
  }
};


// Update a specific meal for a specific day
export const updateMeal = async (req: Request, res: Response) => {
  const { userId, day, meal } = req.params;
  const mealData = req.body;

  try {
    // Ensure the day is in the correct format (capitalized)
    const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
    const mealField = `${formattedDay}.${meal}`;

    console.log('Updating planner for user:', userId);
    console.log('Day:', formattedDay);
    console.log('Meal:', meal);
    console.log('Meal Field:', mealField);
    console.log('Meal Data:', mealData);

    // Construct the update object
    const update = { $set: { [mealField]: mealData } };

    // Find and update the planner
    const planner = await Planner.findOneAndUpdate(
      { user_id: userId },
      update,
      { new: true, runValidators: true }
    ).lean(); // .lean() to return a plain JavaScript object

    if (!planner) {
      console.error('Planner not found for user_id:', userId);
      return res.status(404).json({ error: 'Planner not found' });
    }

    res.status(200).json(planner);
  } catch (err) {
    console.error('Error updating meal:', err); // Debug statement
    res.status(500).json({ error: 'An error occurred while updating the meal' });
  }
};

export default { createPlanner, getPlanner, updateMeal };
