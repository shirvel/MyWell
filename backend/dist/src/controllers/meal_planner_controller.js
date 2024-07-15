"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMeal = exports.getPlanner = exports.createPlanner = void 0;
const meal_planner_1 = __importDefault(require("../models/meal_planner"));
// Create a new planner
const createPlanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planner = new meal_planner_1.default(req.body);
    try {
        yield planner.save();
        res.status(201).json(planner);
    }
    catch (err) {
        res.status(500).json({ error: "fail: " + err.message });
    }
});
exports.createPlanner = createPlanner;
// Get a planner by user ID
const getPlanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planner = yield meal_planner_1.default.findOne({ user_id: req.params.user_id });
        if (!planner) {
            return res.status(404).json({ error: 'Planner not found' });
        }
        res.status(200).json(planner);
    }
    catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching planner' });
    }
});
exports.getPlanner = getPlanner;
// Update a specific meal for a specific day
const updateMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, day, meal } = req.params;
    const mealData = req.body.mealData;
    try {
        const update = {};
        update[`${day}.${meal}`] = mealData;
        const planner = yield meal_planner_1.default.findOneAndUpdate({ user_id: userId }, { $set: update }, { new: true, runValidators: true });
        if (!planner) {
            return res.status(404).json({ error: 'Planner not found' });
        }
        res.status(200).json(planner);
    }
    catch (err) {
        console.error('Error updating meal:', err);
        res.status(500).json({ error: 'An error occurred while updating the meal' });
    }
});
exports.updateMeal = updateMeal;
exports.default = { createPlanner: exports.createPlanner, getPlanner: exports.getPlanner, updateMeal: exports.updateMeal };
//# sourceMappingURL=meal_planner_controller.js.map