import mongoose from 'mongoose';

const weeklyReflectionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    feeling: {
        type: String,
        required: true,
      },
      pastWeek: {
        type: String,
        required: true,
      },
      feedbackOnWeeklyPlan: {
        type: String,
        required: true,
      },
      //createdAt: {
        //type: Date,
        //default: Date.now,
      //}
    });

export default mongoose.model('weeklyReflection', weeklyReflectionSchema);
