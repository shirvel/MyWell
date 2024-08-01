import express from "express";
const router = express.Router();
import workout_feedback_controller from '../controllers/workout_feedback_controller';

router.post("/", workout_feedback_controller.createWorkoutfeedback);

export default router;