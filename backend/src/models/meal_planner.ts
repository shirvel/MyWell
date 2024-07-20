import mongoose from 'mongoose';

const mealDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
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

const plannerSchema = new mongoose.Schema({
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
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Planner', plannerSchema);
