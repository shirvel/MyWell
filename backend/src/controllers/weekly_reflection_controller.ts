//import User from '../models/user_model';
import weeklyReflection from '../models/weekly_reflection';
import mongoose from "mongoose";
import { Request, Response } from 'express';
import { Console } from 'console';

export interface IweeklyReflection {
  user_id: string; 
  feeling: string;
  pastWeek: string;
  feedbackOnWeeklyPlan: string;
  _id?: string;
};

const createfeedback = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body); // Add this log to check the request body
  const weekly_reflection = new weeklyReflection(req.body);
  try {
    await weekly_reflection.save();
    console.log(`Created new weekly_reflection, ID: ${weekly_reflection._id}`);
    res.status(201).json(weekly_reflection);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: "fail: " + errorMessage });
  }
};

const getAllfeedback = async (req: Request, res: Response) => {
    const weekly_reflections = await weeklyReflection.find();
    try {
        res.status(200).json(weekly_reflections);
      } catch (err) {
        console.error('Error getting weekly_reflections:', err);
        res.status(500).json({ error: 'An error occurred while fetching weekly_reflections' });
      }

};

  export default {createfeedback, getAllfeedback}
