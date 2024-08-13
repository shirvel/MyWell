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

// Function to get the start date and end date of the current week: Sunday - Saturday
    export const weekStartAndEndDates = (): { startDate: string, endDate: string } => {

        // Clone the date to avoid modifying the original
        const currentDate = new Date();
      
        // Calculate the difference between the current date and the start of the week (Sunday)
        const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const diffToStartOfWeek = dayOfWeek; // Number of days to go back to the previous Sunday
      
        // Calculate start of the week (Sunday)
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - diffToStartOfWeek);
        
        // Calculate end of the week (Saturday)
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // Saturday is 6 days after Sunday
      
        // Format the dates to yyyy-mm-dd
        const formatDate = (date: Date): string => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
      
        return {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        };
      };
      