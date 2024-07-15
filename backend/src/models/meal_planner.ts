import mongoose from 'mongoose';

const mealItemSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: true,
  },
  meal_id: {
    type: String,
    required: true,
  },
});

const dailyMealsSchema = new mongoose.Schema({
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

const plannerSchema = new mongoose.Schema({
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

export default mongoose.model('Planner', plannerSchema);
