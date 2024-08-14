import express from "express";
const router = express.Router();
import workout_feedback_controller from '../controllers/workout_feedback_controller';
import authMiddleware from '../common/auth_middleware';

router.post("/", authMiddleware, workout_feedback_controller.createWorkoutfeedback);

export default router;