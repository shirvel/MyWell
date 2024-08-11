import express from 'express';
import planner_controller from '../controllers/workout_planner_controller';
import authMiddleware from '../common/auth_middleware';

const router = express.Router();

router.get("/:user_id", authMiddleware, planner_controller.getWorkoutPlanner); // Existing route for getting a planner
// router.put("/:user_id/:day", planner_controller.updateWorkout); // New route for updating a meal

export default router;