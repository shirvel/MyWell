import cron from 'node-cron';
import User from '../models/user_model';

export function scheduleWeeklyReflectionCronJob() {
    cron.schedule(process.env.WEEKLY_REFLECTION_CRON, async () => {
        
        try {
            await User.updateMany({}, { didWeeklyReflection: false });
            console.log("Weekly reflection status reset for all users.");
        } catch (error) {
            console.error("Error resetting weekly reflection status:", error);
        }
    });
}
