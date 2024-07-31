import { endpoints } from "../api/endpoints";
import { get, post } from "../api/requests";
import { uploadImage } from "./image_requests";
import { FormData } from "./types";

export const register = async (formData: FormData) => {
	try {
		const image_url = await uploadImage(formData.image);
		const url = endpoints.AUTH.REGISTER;
		const response = await post(url, { ...formData, image: image_url });
		console.log("Response from server:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error register:", error);
		return null;
	}
};

export const checkEmailExists = async (email: string) => {
	try {
		const url = endpoints.AUTH.CHECK_EMAIL(email);
		const response = await get(url);
		console.log("Response from server:", response.exists);

		return response.exists;
	} catch (error) {
		console.error("Error checking email:", error);
		return false;
	}
};

export const getUserName = async (userId: string) => {
	try {
		const url = endpoints.AUTH.GET_USER_BY_ID(userId);
		const response = await get(url);
		return response.name;
	} catch (error) {
		console.error("Error", error);
		return "";
	}
};
