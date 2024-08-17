import mongoose from 'mongoose';

const mealFeedbackSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true
    },
    meal_id: {
      type: String,
      required: false
    },
    feedback: {
      type: String,
      required: true,
    }
  });

export default mongoose.model('MealFeedback', mealFeedbackSchema);
