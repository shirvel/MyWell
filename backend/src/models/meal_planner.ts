import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
});

const mealDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [ingredientSchema],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  wasEaten: {
    type: Boolean,
    required: true,
    default: false
  },
  liked: {
    type: Boolean,
    required: true,
    default: false
  },
});

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  instructions: {
    type: [String],
    required: false,
  },
});

const dailyPlanSchema = new mongoose.Schema({
  Breakfast: {
    type: mealDetailSchema,
    required: true,
  },
  Lunch: {
    type: mealDetailSchema,
    required: true,
  },
  Workout: {
    type: workoutSchema,
    required: false,
  },
  Dinner: {
    type: mealDetailSchema,
    required: true,
  }
});

const mealPlannerSchema = new mongoose.Schema({
  Sunday: dailyPlanSchema,
  Monday: dailyPlanSchema,
  Tuesday: dailyPlanSchema,
  Wednesday: dailyPlanSchema,
  Thursday: dailyPlanSchema,
  Friday: dailyPlanSchema,
  Saturday: dailyPlanSchema,
  user_id: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

export default mongoose.model('MealPlanner', mealPlannerSchema);
