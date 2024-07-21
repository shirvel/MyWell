import express from 'express';
import planner_controller from '../controllers/meal_planner_controller';

const router = express.Router();

router.post("/", planner_controller.createPlanner); // Existing route for creating a planner
router.get("/:user_id", planner_controller.getPlanner); // Existing route for getting a planner
router.put("/:userId/:day/:meal", planner_controller.updateMeal); // New route for updating a meal

export default router;