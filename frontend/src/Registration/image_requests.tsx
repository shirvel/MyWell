import { endpoints } from "../api/endpoints";
import { post } from "../api/requests";

export const uploadImage = async (file: File | undefined) => {
	try {
		const formData = new FormData();
		if (file) {
			formData.append("image", file);
			const res = await post(endpoints.IMAGE.UPLOAD_IMAGE, formData, {
				"Content-Type": "image/jpeg",
			});
			return res.data.imageUrl;
		}
	} catch (error) {
		console.error("Error login:", error);
		return null;
	}
};
