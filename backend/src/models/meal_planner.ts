import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  breakfast: {
    type: [String],
    required: true,
  },
  lunch: {
    type: [String],
    required: true,
  },
  dinner: {
    type: [String],
    required: true,
  }
});

const plannerSchema = new mongoose.Schema({
  sunday: mealSchema,
  monday: mealSchema,
  tuesday: mealSchema,
  wednesday: mealSchema,
  thursday: mealSchema,
  friday: mealSchema,
  saturday: mealSchema,
  user_id: {
    type: String,
    required: true,
  }
});
export default mongoose.model('Planner', plannerSchema);

