//import User from '../models/user_model';
import mealFeedback from '../models/meal_feedback';
import mongoose from "mongoose";
import { Request, Response } from 'express';
import { Console } from 'console';

export interface IFeedbackSummery {
  user_id: string; 
  meal: string;
  feedback: string;
  _id?: string;
};

const createfeedback = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body); // Add this log to check the request body
  const meal_feedback = new mealFeedback(req.body);
  try {
    await meal_feedback.save();
    console.log(`Created new meal_feedback, ID: ${meal_feedback._id}`);
    res.status(201).json(meal_feedback);
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
