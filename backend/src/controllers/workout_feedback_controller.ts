import workoutFeedback from '../models/workout_feedback';
import { Request, Response } from 'express';
import { getStartAndEndDates } from '../common/date_utils';
import WorkoutPlanner from '../models/workout_planner';
import { updateWorkoutPlanner } from '../ai/workout_planner_utils';

const createWorkoutfeedback = async (req: Request, res: Response) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  const { user_id, feedback, day } = req.body;
  const workout_feedback = new workoutFeedback({ user_id, feedback });

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

export default { createWorkoutfeedback }
