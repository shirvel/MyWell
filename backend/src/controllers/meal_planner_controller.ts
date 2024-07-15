import { Request, Response } from 'express';
import Planner from '../models/meal_planner';
import { log } from 'console';

// Create a new planner
export const createPlanner = async (req: Request, res: Response) => {
  console.log('Received request body:', req.body); // Debug statement
  const planner = new Planner(req.body);
  try {
    await planner.save();
    console.log('Saved planner:', planner); // Debug statement
    res.status(201).json(planner);
  } catch (err) {
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

    console.log('Retrieved planner:', planner); // Debug statement

    // Transform data to the correct format
    const transformMeals = (meals) => {
      return {
        Breakfast: meals.breakfast.length > 0 ? { meal: meals.breakfast[0], meal_id: "unique_id" } : { meal: "", meal_id: "" },
        Lunch: meals.lunch.length > 0 ? { meal: meals.lunch[0], meal_id: "unique_id" } : { meal: "", meal_id: "" },
        Dinner: meals.dinner.length > 0 ? { meal: meals.dinner[0], meal_id: "unique_id" } : { meal: "", meal_id: "" },
      };
    };

    const transformedPlanner = {};
    for (const [day, meals] of Object.entries(planner)) {
      if (day !== "_id" && day !== "user_id" && day !== "__v") {
        transformedPlanner[day.charAt(0).toUpperCase() + day.slice(1)] = transformMeals(meals);
      } else {
        transformedPlanner[day] = meals;
      }
    }

    console.log('Transformed planner:', transformedPlanner); // Debug statement
    res.status(200).json(transformedPlanner);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching planner' });
  }
};
// Update a specific meal for a specific day
export const updateMeal = async (req: Request, res: Response) => {
  const { userId, day, meal } = req.params;
  const mealData = req.body;

  try {
    const update = {};
    update[`${day}.${meal}`] = mealData;

    const planner = await Planner.findOneAndUpdate(
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

export default { createPlanner, getPlanner, updateMeal };
