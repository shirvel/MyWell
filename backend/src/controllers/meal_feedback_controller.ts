//import User from '../models/user_model';
import mealFeedback from '../models/meal_feedback';
import mongoose from "mongoose";
import { Request, Response } from 'express';
import { Console } from 'console';
import sendMessageToChatGPT from '../ai/chat_gpt_sender';
import { buildPromptForWeek } from '../ai/prompt_builder';
import { createMealPlanner, daysOrder, getStartAndEndDates, mealTypesOrder } from '../common/planner_utils';
import Planner from '../models/meal_planner';

export interface IFeedbackSummery {
  user_id: string; 
  meal: string;
  feedback: string;
  _id?: string;
};

const createfeedback = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body); // Add this log to check the request body
  const { user_id, meal, feedback, day, type } = req.body; // Ensure these fields are provided in the request body
  const meal_feedback = new mealFeedback({ user_id, meal, feedback });

  try {
    await meal_feedback.save();
    console.log(`Created new meal_feedback, ID: ${meal_feedback._id}`);

    // udpate the current meal planner
    const { startDate, endDate } = getStartAndEndDates();

    console.log(`${startDate} - ${endDate}, ${user_id}`);
    let currentPlanner = await Planner.findOne({
      user_id: user_id,
      startDate: startDate,
      endDate: endDate,
    }).lean();

    if (currentPlanner != null) {
      const plannerJson = await sendMessageToChatGPT(await buildPromptForWeek(user_id));
      const newPlanner = new Planner(createMealPlanner(plannerJson, user_id, startDate, endDate));
      
      let dayToUpdate = false;
      let mealToUpdate = false;

      for (const currentDay of daysOrder) {
        // If we have reached or passed the specified day, start updating
        if (dayToUpdate || currentDay == day) {
          dayToUpdate = true;
          
          for (const currentMealType of mealTypesOrder) {
            // If we have reached or passed the specified meal type, start updating
            if (mealToUpdate || currentMealType == type) {
              mealToUpdate = true;

              // Log the update for each meal type and day
              console.log(`${currentDay} - ${currentMealType}`);
            
              // Update the meal in the current planner
              currentPlanner[currentDay][currentMealType] = newPlanner[currentDay][currentMealType];
            }
          }
        }
      }

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
