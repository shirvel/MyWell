"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meal_planner_controller_1 = __importDefault(require("../controllers/meal_planner_controller"));
const router = express_1.default.Router();
router.post("/", meal_planner_controller_1.default.createPlanner); // Existing route for creating a planner
router.get("/:user_id", meal_planner_controller_1.default.getPlanner); // Existing route for getting a planner
router.put("/:user_id/:day/:meal", meal_planner_controller_1.default.updateMeal); // New route for updating a meal
exports.default = router;
//# sourceMappingURL=meal_planner_route.js.map