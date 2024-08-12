import { endpoints } from "../api/endpoints";
import { post } from "../api/requests";

export type ILoginData = {
	email: string;
	password: string;
};

export const login = async (loginData: ILoginData) => {
	try {
		const response = await post(endpoints.AUTH.LOGIN, loginData);
		if (response.status === 401) {
			return null;
		}
		return response.data;
	} catch (error) {
		return null;
	}
};
