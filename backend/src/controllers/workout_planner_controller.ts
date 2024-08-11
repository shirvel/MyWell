import { Request, Response } from 'express';
import WorkoutPlanner from '../models/workout_planner';
import { createWorkoutPlanner } from '../ai/workout_planner_utils';
import { getStartAndEndDates } from '../common/date_utils';

const plannerRequestInProgress: { [key: string]: boolean } = {};

// Get a planner by user ID
export const getWorkoutPlanner = async (req: Request, res: Response) => {
  var startDate, endDate = "";
  if (req.query.startDate && req.query.endDate){
    startDate = req.query.startDate;
    endDate = req.query.endDate.toString();
  }else{
    const res = getStartAndEndDates();
    startDate = res.startDate;
    endDate = res.endDate;
  }
  const userId = req.params.user_id;

  // Check if a request is already in progress for this user
  if (plannerRequestInProgress[userId]) {
    return res.status(429).json({ error: 'A planner request is already in progress for this user.' });
  }

  // Set the flag to indicate a request is in progress
  plannerRequestInProgress[userId] = true;

  try {
    let planner = await WorkoutPlanner.findOne({
      user_id: userId,
      startDate: startDate,
      endDate: endDate,
    }).lean();
    
    if (!planner && !req.query.startDate) {
      const response = await createWorkoutPlanner(userId, startDate, endDate);
      console.log(response)
      const newPlanner = new WorkoutPlanner(response);
      console.log(newPlanner.toJSON());

      planner = await newPlanner.save();
    }

    console.log('Retrieved or created planner:', planner); // Debug statement

    res.status(200).json(planner);
    plannerRequestInProgress[userId] = false;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching planner' });
    plannerRequestInProgress[userId] = false;
  }
};

export default { getWorkoutPlanner };
