import axios from "axios";
import { endpoints } from "../api/endpoints";

export type ILoginData = {
	email: string;
	password: string;
};

export const login = async (loginData: ILoginData) => {
	try {
		const response = await axios.post(endpoints.AUTH.LOGIN, loginData);
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error login:", error);
		return null;
	}
};
