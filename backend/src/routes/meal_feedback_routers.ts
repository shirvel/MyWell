import express from "express";
const router = express.Router();
import meal_feedback_controller from '../controllers/meal_feedback_controller';
import authMiddleware from "../common/auth_middleware";

router.post("/", authMiddleware, meal_feedback_controller.createMealFeedback);
router.get("/", authMiddleware, meal_feedback_controller.getAllMealFeedback);

export default router;