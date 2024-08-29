import axios from 'axios';
import { endpoints } from '../api/endpoints';

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
    const url = endpoints.WEEKLY_REFLECTION.CREATE_FEEDBACK;
    const response = await axios.post(url, {
      user_id: user_id,
      feeling: reflectionSummery.feeling,
      pastWeek: reflectionSummery.pastWeek,
      feedbackOnWeeklyPlan: reflectionSummery.feedback,
    });

    console.log('Response from server:', response);
    return response;
  } catch (error) {
    console.error('Error sending reflection summary:', error);
    return null;
  }
};
