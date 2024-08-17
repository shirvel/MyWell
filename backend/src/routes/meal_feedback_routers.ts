import express from "express";
const router = express.Router();
import meal_feedback_controller from '../controllers/meal_feedback_controller';
import authMiddleware from "../common/auth_middleware";

router.post("/change", authMiddleware, meal_feedback_controller.createMealChange);
router.post("/like", authMiddleware, meal_feedback_controller.updateMealLike);
router.post("/eat", authMiddleware, meal_feedback_controller.updateEatenMeal);
router.get("/", authMiddleware, meal_feedback_controller.getAllMealFeedback);

export default router;