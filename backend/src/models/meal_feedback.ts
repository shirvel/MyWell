import mongoose from 'mongoose';

const mealFeedbackSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    meal: {
      type: String,
      required: true
    },
    feedback: {
      type: String,
      required: true,
    }
  });

export default mongoose.model('mealFeedback', mealFeedbackSchema);
