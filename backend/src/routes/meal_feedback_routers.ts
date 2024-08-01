import express from "express";
const router = express.Router();
import meal_feedback_controller from '../controllers/meal_feedback_controller';

router.post("/", meal_feedback_controller.createMealfeedback);
router.get("/", meal_feedback_controller.getAllMealfeedback);

export default router;