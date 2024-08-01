export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
