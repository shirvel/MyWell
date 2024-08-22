import { Request, Response } from 'express';
import MealPlannerFeedback from '../models/meal_planner_feedback';
import WorkoutPlannerFeedback from '../models/workout_planner_feedback';

export const addMealPlannerFeedback = async (req: Request, res: Response) => {
    const { user_id, feedback } = req.body;
    const meal_feedback = new MealPlannerFeedback({ user_id, feedback });
    try {
        await meal_feedback.save();
        res.status(201).json(meal_feedback);
    } catch (err) {
        const errorMessage = (err as Error).message;
        res.status(500).json({ error: "fail: " + errorMessage });
    }
  };

  export const addWorkoutPlannerFeedback = async (req: Request, res: Response) => {
    const { user_id, feedback } = req.body;
    const workout_feedback = new WorkoutPlannerFeedback({ user_id, feedback });
    try {
        await workout_feedback.save();
        res.status(201).json(workout_feedback);
    } catch (err) {
        const errorMessage = (err as Error).message;
        res.status(500).json({ error: "fail: " + errorMessage });
    }
  };