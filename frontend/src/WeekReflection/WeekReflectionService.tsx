import axios from 'axios';

export type IReflectionSummery = {
  feeling: string;
  pastWeek: string;
  feedback: string;
};

export const sendWeekReflection = async (
  user_id: string,
  reflectionSummery: IReflectionSummery
) => {
  console.log("sends the reflection summery", reflectionSummery);

  try {
    const response = await axios.post('http://localhost:3000/api/weekly_reflection', {
      user_id: user_id,
      feeling: reflectionSummery.feeling,
      pastWeek: reflectionSummery.pastWeek,
      feedbackOnWeeklyPlan: reflectionSummery.feedback,
    });

    console.log('Response from server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending reflection summary:', error);
    return null;
  }
};
