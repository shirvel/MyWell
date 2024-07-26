import mealFeedback from '../models/meal_feedback';
import { Request, Response } from 'express';
import sendMessageToChatGPT from '../ai/chat_gpt_sender';
import { buildPromptAfterFeedback } from '../ai/prompt_builder';
import { getStartAndEndDates } from '../common/planner_utils';
import Planner from '../models/meal_planner';

export interface IFeedbackSummery {
  user_id: string; 
  meal: string;
  feedback: string;
  _id?: string;
};

const createfeedback = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  const { user_id, feedback, day, type } = req.body;
  const meal_feedback = new mealFeedback({ user_id, feedback });

  try {
    await meal_feedback.save();
    console.log(`Created new meal_feedback, ID: ${meal_feedback._id}`);

    // udpate the current meal planner
    const { startDate, endDate } = getStartAndEndDates();

    let currentPlanner = await Planner.findOne({
      user_id: user_id,
      startDate: startDate,
      endDate: endDate,
    }).lean();

    if (currentPlanner != null) {
      const mealsJson = await sendMessageToChatGPT(await buildPromptAfterFeedback(user_id, day, type));

      console.log("Planner json: " + mealsJson);
      const newMeals = JSON.parse(mealsJson);

      Object.keys(newMeals).forEach(day => {
        currentPlanner[day] = {
          ...currentPlanner[day], // Keep existing data for the day
          ...newMeals[day] // Update with new meals
        };
      });

      await Planner.updateOne({ _id: currentPlanner._id }, currentPlanner);
      console.log('Updated planner:', currentPlanner);

      res.status(201).json(meal_feedback);
    }
    else {
      res.status(401).json({ error: "current meal plan is missing." });
    }
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: "fail: " + errorMessage });
  }
};

const getAllfeedback = async (req: Request, res: Response) => {
  try {
    const meal_feedbacks = await mealFeedback.find();
    res.status(200).json(meal_feedbacks);
  } catch (err) {
    console.error('Error getting meal_feedbacks:', err);
    res.status(500).json({ error: 'An error occurred while fetching meal_feedbacks' });
  }
};

  export default {createfeedback, getAllfeedback}
