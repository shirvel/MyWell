import express from 'express';
import planner_controller from '../controllers/meal_planner_controller';
import authMiddleware from '../common/auth_middleware';

const router = express.Router();

router.get("/:user_id", planner_controller.getMealPlanner); // Existing route for getting a planner
router.put("/:user_id/:day/:meal", planner_controller.updateMeal); // New route for updating a meal
router.patch("/update-meal-planner", planner_controller.updateMealPlanner); 

export default router;