import mongoose from 'mongoose';

// This is a generic feedback for the whole plan.
const workoutPlannerFeedbackSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true
    },
    feedback: {
      type: String,
      required: true,
    }
  });

export default mongoose.model('WorkoutPlannerFeedback', workoutPlannerFeedbackSchema);
