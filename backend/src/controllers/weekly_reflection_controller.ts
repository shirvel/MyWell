import { Request, Response } from 'express';
import weeklyReflection from '../models/weekly_reflection';
import User from '../models/user_model';
import mongoose from 'mongoose';

export interface IReflectionSummery {
  user_id: string;
  feeling: string;
  pastWeek: string;
  feedbackOnWeeklyPlan: string;
  _id?: string;
}

const createfeedback = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body); // Log to check the request body

  try {
    const { user_id, feeling, pastWeek, feedbackOnWeeklyPlan } = req.body;

    // Check if required fields are provided
    if (!user_id || !feeling || !pastWeek || !feedbackOnWeeklyPlan) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new weekly reflection document
    const weekly_reflection = new weeklyReflection({
      user_id: user_id, // Ensure user_id is a valid ObjectId
      feeling,
      pastWeek,
      feedbackOnWeeklyPlan,
    });

    // Save the weekly reflection to the database
    await weekly_reflection.save();

    // Update the user's document to indicate that the weekly reflection is done
    const userUpdate = await User.findByIdAndUpdate(
      user_id,
      { didWeeklyReflection: true },
      { new: true }
    );

    if (!userUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`Created new weekly_reflection, ID: ${weekly_reflection._id}`);
    res.status(201).json(weekly_reflection);
  } catch (err) {
    console.error('Error creating feedback:', err);
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: 'Failed to create feedback: ' + errorMessage });
  }
};

const getAllfeedback = async (req: Request, res: Response) => {
  try {
    const weekly_reflections = await weeklyReflection.find();
    res.status(200).json(weekly_reflections);
  } catch (err) {
    console.error('Error getting weekly_reflections:', err);
    res.status(500).json({ error: 'An error occurred while fetching weekly reflections' });
  }
};

export default { createfeedback, getAllfeedback };
