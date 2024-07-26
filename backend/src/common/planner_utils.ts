export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const mealTypes = ['Breakfast', 'Lunch', 'Workout', 'Dinner'];

// Function to get the upcoming Sunday and Saturday
export const getStartAndEndDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startDate = new Date(today);
    const endDate = new Date(today);
  
    // Set the start date to the most recent Sunday
    // If today is Sunday, it should be set to today
    startDate.setDate(today.getDate() - dayOfWeek);
    
    // Set the end date to the upcoming Saturday
    endDate.setDate(startDate.getDate() + 6);
  
    return {
        startDate: startDate.toISOString().split('T')[0], // 'YYYY-MM-DD'
        endDate: endDate.toISOString().split('T')[0],     // 'YYYY-MM-DD'
    };
};

// Function to create and save a meal planner
export const createMealPlanner = (responseString, userId, startDate, endDate) => {  
    // Parse the response string into an object
    const response = JSON.parse(responseString);

    return {
      Sunday: response.Sunday,
      Monday: response.Monday,
      Tuesday: response.Tuesday,
      Wednesday: response.Wednesday,
      Thursday: response.Thursday,
      Friday: response.Friday,
      Saturday: response.Saturday,
      user_id: userId,
      startDate,
      endDate,
    };
  };