"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mealSchema = new mongoose_1.default.Schema({
    breakfast: {
        type: [String],
        required: true,
    },
    lunch: {
        type: [String],
        required: true,
    },
    dinner: {
        type: [String],
        required: true,
    }
});
const plannerSchema = new mongoose_1.default.Schema({
    sunday: mealSchema,
    monday: mealSchema,
    tuesday: mealSchema,
    wednesday: mealSchema,
    thursday: mealSchema,
    friday: mealSchema,
    saturday: mealSchema,
    user_id: {
        type: String,
        required: true,
    }
});
exports.default = mongoose_1.default.model('Planner', plannerSchema);
//# sourceMappingURL=meal_planner.js.map