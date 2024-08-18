import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  done: {
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

const dailyPlanSchema = new mongoose.Schema({
  Workout: {
    type: workoutSchema,
    required: true,
  }
});

const workoutPlannerSchema = new mongoose.Schema({
  Sunday: {
    type: dailyPlanSchema,
    required: false
  },
  Monday: {
    type: dailyPlanSchema,
    required: false
  },
  Tuesday: {
    type: dailyPlanSchema,
    required: false
  },
  Wednesday: {
    type: dailyPlanSchema,
    required: false
  },
  Thursday: {
    type: dailyPlanSchema,
    required: false
  },
  Friday: {
    type: dailyPlanSchema,
    required: false
  },
  Saturday: {
    type: dailyPlanSchema,
    required: false
  },
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

export default mongoose.model('WorkoutPlanner', workoutPlannerSchema);
