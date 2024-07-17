import express from "express";
const router = express.Router();
import meal_feedback_controller from '../controllers/meal_feedback_controller';

router.post("/", meal_feedback_controller.createfeedback);
router.get("/", meal_feedback_controller.getAllfeedback);

export default router;