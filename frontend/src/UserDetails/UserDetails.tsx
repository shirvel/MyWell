import { endpoints } from "../api/endpoints";
import { get } from "../api/requests";

export type UserDetails = { mainGoal: string[]; specialDiets: string[]; healthConditions: string; comment: string; imageUrl?: string | undefined};

export const getUserById = async (id: string) => {
	const response = await get(endpoints.USER.UPDATE_USER(id));
	const newMainGoal = response.mainGoal.split(' & ');
	const newSpecialDiets = response.specialDiets.split(' & ');
	response.mainGoal = newMainGoal;
	response.specialDiets = newSpecialDiets;
	return response as UserDetails;
};

export const getConnectedUser = async () => {
	const connectedUserId = localStorage.getItem("userId");
	if (connectedUserId) {
		return await getUserById(connectedUserId);
	}
};
