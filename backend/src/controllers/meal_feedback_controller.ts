import mealFeedback from '../models/meal_feedback';
import { Request, Response } from 'express';
import { daysOfWeek, getStartAndEndDates } from '../common/date_utils';
import Planner from '../models/meal_planner';
import { mealTypes, updateMealPlanner } from '../ai/meal_planner_utils';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const createMealChange = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  const { user_id, meal_id, feedback, day, type } = req.body;
  const meal_feedback = new mealFeedback({ user_id, meal_id, feedback });

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
      currentPlanner = await updateMealPlanner(currentPlanner, user_id, day, type);

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

const updateMealLike = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  
  const { user_id, meal_id, liked, feedback } = req.body;

  try {
    if (liked) {
      await handleMealLike(user_id, meal_id, feedback);
      res.status(201).json({ message: 'Meal liked successfully' });
    } else {
      await handleMealUnlike(user_id, meal_id);
      res.status(200).json({ message: 'Meal unliked successfully' });
    }
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: "fail: " + errorMessage });
  }
};

const handleMealLike = async (user_id: string, meal_id: string, feedback: string) => {
  const meal_feedback = new mealFeedback({ user_id, meal_id, feedback });
  await meal_feedback.save();
  console.log(`Created new meal_feedback, ID: ${meal_feedback._id}`);

  // Update the meal as liked in the meal planner
  await updateMealLikedStatus(user_id, meal_id, true);
};

const handleMealUnlike = async (user_id: string, meal_id: string) => {
  console.log(`user id: ${user_id} meal id: ${meal_id}`)
  const result = await mealFeedback.findOneAndDelete({ user_id, meal_id });
  
  if (result) {
    console.log(`Deleted meal_feedback, ID: ${result._id}`);
    // Update the meal as unliked in the meal planner
    await updateMealLikedStatus(user_id, meal_id, false);
  } else {
    throw new Error('Meal feedback not found');
  }
};

const updateMealLikedStatus = async (user_id: string, meal_id: string, liked: boolean) => {
  try {
    const message = await updateMealStatus(user_id, meal_id, 'liked', liked);
    console.log(message);
  } catch (error) {
    console.error(error.message);
  }
};

const updateEatenMeal = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  
  const { user_id, meal_id, wasEaten } = req.body;

  try {
    const message = await updateMealStatus(user_id, meal_id, 'wasEaten', wasEaten);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: `fail: ${error.message}` });
  }
};

const getAllMealFeedback = async (req: Request, res: Response) => {
  try {
    const meal_feedbacks = await mealFeedback.find();
    res.status(200).json(meal_feedbacks);
  } catch (err) {
    console.error('Error getting meal_feedbacks:', err);
    res.status(500).json({ error: 'An error occurred while fetching meal_feedbacks' });
  }
};

const updateMealStatus = async (user_id: string, meal_id: string, statusKey: string, statusValue: boolean) => {
  try {
    const mealId = new ObjectId(meal_id);
    
    // Find the document
    const planner = await Planner.findOne({ user_id });

    if (!planner) {
      throw new Error('Planner not found for the given user ID');
    }

    let updateSuccessful = false;

    // Iterate through days and meal types to find the meal
    for (const day of daysOfWeek) {
      for (const mealType of mealTypes) {
        const meal = planner[day]?.[mealType];
        if (meal && meal._id.equals(mealId)) {
          await Planner.updateOne(
            { user_id, [`${day}.${mealType}._id`]: mealId },
            { $set: { [`${day}.${mealType}.${statusKey}`]: statusValue } }
          );
          updateSuccessful = true;
          break;
        }
      }
      if (updateSuccessful) break;
    }

    if (!updateSuccessful) {
      throw new Error('Meal not found');
    }

    return 'Meal status updated successfully';
  } catch (error) {
    throw new Error(`Error updating meal status: ${error.message}`);
  }
};

export default { createMealChange, getAllMealFeedback, updateMealLike, updateEatenMeal }
