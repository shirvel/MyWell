import Planner from '../models/meal_planner';
import { Request, Response } from 'express';

// Create a new planner
export const createPlanner = async (req: Request, res: Response) => {
    const planner = new Planner(req.body);
    try {
      await planner.save();
      res.status(201).json(planner);
    } catch (err) {
      res.status(500).json({ error: "fail: " + (err as Error).message });
    }
  };
  
  // Get a planner by user ID
  export const getPlanner = async (req: Request, res: Response) => {
    try {
      const planner = await Planner.findOne({ user_id: req.params.user_id });
      if (!planner) {
        return res.status(404).json({ error: 'Planner not found' });
      }
      res.status(200).json(planner);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while fetching planner' });
    }
  };
  
  // Update a specific meal for a specific day
  export const updateMeal = async (req: Request, res: Response) => {
    const { userId, day, meal } = req.params;
    const mealData = req.body.mealData;
  
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
