import express from "express";
const router = express.Router();
import authMiddleware from "../common/auth_middleware";
import { addMealPlannerFeedback, addWorkoutPlannerFeedback } from "../controllers/general_planner_feedback_controller";

router.post("/workout", authMiddleware, addWorkoutPlannerFeedback);
router.post("/meal", authMiddleware, addMealPlannerFeedback);


export default router;