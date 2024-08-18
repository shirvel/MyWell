import workoutFeedback from '../models/workout_feedback';
import { Request, Response } from 'express';
import { daysOfWeek, getStartAndEndDates } from '../common/date_utils';
import WorkoutPlanner from '../models/workout_planner';
import { updateWorkoutPlanner } from '../ai/workout_planner_utils';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const createWorkoutChange = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  const { user_id, workout_id, feedback, day } = req.body;
  const workout_feedback = new workoutFeedback({ user_id, workout_id, feedback });

  try {
    await workout_feedback.save();
    console.log(`Created new workout_feedback, ID: ${workout_feedback._id}`);

    // udpate the current meal planner
    const { startDate, endDate } = getStartAndEndDates();

    let currentPlanner = await WorkoutPlanner.findOne({
      user_id: user_id,
      startDate: startDate,
      endDate: endDate,
    }).lean();

    if (currentPlanner != null) {
      currentPlanner = await updateWorkoutPlanner(currentPlanner, user_id, day);

      await WorkoutPlanner.updateOne({ _id: currentPlanner._id }, currentPlanner);
      console.log('Updated planner:', currentPlanner);

      res.status(201).json(workout_feedback);
    }
    else {
      res.status(401).json({ error: "current workout plan is missing." });
    }
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: "fail: " + errorMessage });
  }
};

const updateWorkoutLike = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  
  const { user_id, workout_id, liked, feedback } = req.body;

  try {
    if (liked) {
      await handleWorkoutLike(user_id, workout_id, feedback);
      res.status(201).json({ message: 'Workout liked successfully' });
    } else {
      await handleWorkoutUnlike(user_id, workout_id);
      res.status(200).json({ message: 'Workout unliked successfully' });
    }
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: "fail: " + errorMessage });
  }
};

const handleWorkoutLike = async (user_id: string, workout_id: string, feedback: string) => {
  const workout_feedback = new workoutFeedback({ user_id, workout_id, feedback });
  await workout_feedback.save();
  console.log(`Created new workout_feedback, ID: ${workout_feedback._id}`);

  // Update the workout as liked in the workout planner
  await updateWorkoutLikedStatus(user_id, workout_id, true);
};

const handleWorkoutUnlike = async (user_id: string, workout_id: string) => {
  console.log(`user id: ${user_id} workout id: ${workout_id}`)
  const result = await workoutFeedback.findOneAndDelete({ user_id, workout_id });
  
  if (result) {
    console.log(`Deleted workout_feedback, ID: ${result._id}`);
    // Update the workout as unliked in the workout planner
    await updateWorkoutLikedStatus(user_id, workout_id, false);
  } else {
    throw new Error('Workout feedback not found');
  }
};

const updateWorkoutLikedStatus = async (user_id: string, workout_id: string, liked: boolean) => {
  try {
    const message = await updateWorkoutStatus(user_id, workout_id, 'liked', liked);
    console.log(message);
  } catch (error) {
    console.error(error.message);
  }
};

const updateDoneWorkout = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  
  const { user_id, workout_id, done } = req.body;

  try {
    const message = await updateWorkoutStatus(user_id, workout_id, 'done', done);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: `fail: ${error.message}` });
  }
};

const updateWorkoutStatus = async (user_id, workout_id, statusKey, statusValue) => {
  try {
    const workoutId = new ObjectId(workout_id);
    
    // Find the document
    const planner = await WorkoutPlanner.findOne({ user_id });

    if (!planner) {
      throw new Error('Planner not found for the given user ID');
    }

    let updateSuccessful = false;

    // Iterate through days to find the workout
    for (const day of daysOfWeek) {
        const workout = planner[day]?.['Workout'];
        
        if (workout && workout._id.equals(workoutId)) {
          console.log(`Found workout: ${workout.name} on ${day}`);
          await WorkoutPlanner.updateOne(
            { user_id, [`${day}.Workout._id`]: workoutId },
            { $set: { [`${day}.Workout.${statusKey}`]: statusValue } }
          );
          updateSuccessful = true;
          break;
      }
      if (updateSuccessful) break;
    }

    if (!updateSuccessful) {
      throw new Error('Workout not found');
    }

    return 'Workout status updated successfully';
  } catch (error) {
    throw new Error(`Error updating workout status: ${error.message}`);
  }
};


export default { createWorkoutChange, updateWorkoutLike, updateDoneWorkout }

