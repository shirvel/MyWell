import mongoose from 'mongoose';

const workoutFeedbackSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    workout_id: {
      type: String,
      required: false
    },
    feedback: {
      type: String,
      required: true,
    }
  });

export default mongoose.model('workoutFeedback', workoutFeedbackSchema);
