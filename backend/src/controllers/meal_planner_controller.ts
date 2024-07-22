import { Request, Response } from 'express';
import Planner from '../models/meal_planner';
import { log } from 'console';
import { createMealPlanner, getStartAndEndDates } from '../common/planner_utils';
import sendMessageToChatGPT from '../ai/chat_gpt_sender';
import { buildPromptForWeek } from '../ai/prompt_builder';
import meal_planner from '../models/meal_planner';

// Get a planner by user ID
export const getPlanner = async (req: Request, res: Response) => {
  const { startDate, endDate } = getStartAndEndDates();
  const userId = req.params.user_id;

  try {
    let planner = await Planner.findOne({
      user_id: userId,
      startDate: startDate,
      endDate: endDate,
    }).lean();
    
    if (!planner) {
      const plannerJson = await sendMessageToChatGPT(await buildPromptForWeek(userId));
      const newPlanner = new Planner(createMealPlanner(plannerJson, userId, startDate, endDate));
      console.log(newPlanner.toJSON());
      planner = await newPlanner.save();
    }

    console.log('Retrieved or created planner:', planner); // Debug statement

    res.status(200).json(planner);
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

export default { getPlanner, updateMeal };
