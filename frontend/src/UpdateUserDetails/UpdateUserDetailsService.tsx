import { UserDetails } from "../UserDetails/UserDetails";
import { endpoints } from "../api/endpoints";
import { patch } from "../api/requests";

export const updateUserDetails = async (userDetails: any) => {
	try {
        const connectedUserId = localStorage.getItem("userId");
        userDetails.mainGoal = userDetails.mainGoal.join(' & ')
        userDetails.specialDiets = userDetails.specialDiets.join(' & ')
		const response = await patch(endpoints.USER.UPDATE_USER(connectedUserId!), userDetails);
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error in fetching user data:", error);
		return null;
	}
};