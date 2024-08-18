import express from "express";
const router = express.Router();
import workout_feedback_controller from '../controllers/workout_feedback_controller';
import authMiddleware from '../common/auth_middleware';

router.post("/change", authMiddleware, workout_feedback_controller.createWorkoutChange);
router.post("/like", authMiddleware, workout_feedback_controller.updateWorkoutLike);
router.post("/done", authMiddleware, workout_feedback_controller.updateDoneWorkout);
router.post("/", authMiddleware, workout_feedback_controller.createWorkoutChange);

export default router;