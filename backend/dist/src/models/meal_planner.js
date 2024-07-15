"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mealItemSchema = new mongoose_1.default.Schema({
    meal: {
        type: String,
        required: true,
    },
    meal_id: {
        type: String,
        required: true,
    },
});
const dailyMealsSchema = new mongoose_1.default.Schema({
    Breakfast: {
        type: mealItemSchema,
        required: true,
    },
    Lunch: {
        type: mealItemSchema,
        required: true,
    },
    Dinner: {
        type: mealItemSchema,
        required: true,
    },
});
const plannerSchema = new mongoose_1.default.Schema({
    Sunday: dailyMealsSchema,
    Monday: dailyMealsSchema,
    Tuesday: dailyMealsSchema,
    Wednesday: dailyMealsSchema,
    Thursday: dailyMealsSchema,
    Friday: dailyMealsSchema,
    Saturday: dailyMealsSchema,
    user_id: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model('Planner', plannerSchema);
//# sourceMappingURL=meal_planner.js.map