import mongoose from 'mongoose';

const workoutFeedbackSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    feedback: {
      type: String,
      required: true,
    }
  });

export default mongoose.model('workoutFeedback', workoutFeedbackSchema);
