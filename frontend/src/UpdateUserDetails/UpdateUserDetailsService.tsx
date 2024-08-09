import { uploadImage } from "../Registration/image_requests";
import { endpoints } from "../api/endpoints";
import { patch } from "../api/requests";

export const updateUserDetails = async (userDetails: any, imageFile: File | undefined) => {
	try {
        const connectedUserId = localStorage.getItem("userId");
		if(imageFile !== undefined) {
			const image_url = await uploadImage(imageFile);
			userDetails.imageUrl = image_url;
		}
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