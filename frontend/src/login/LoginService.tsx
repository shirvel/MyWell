import { endpoints } from "../api/endpoints";
import { post } from "../api/requests";

export type ILoginData = {
	email: string;
	password: string;
};

export const login = async (loginData: ILoginData) => {
	try {
		const response = await post(endpoints.AUTH.LOGIN, loginData);
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error login:", error);
		return null;
	}
};
