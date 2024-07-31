import axios from "axios";

const getRequestConfig = (headers?: any) => {
	const token = localStorage.getItem("accessToken");
	return {
		headers: {
			Authorization: "JWT " + token,
			...headers,
		},
	};
};

export const get = async (endpoint: string, headers?: any) => {
	try {
		console.log("config=" + JSON.stringify(getRequestConfig(headers)));
		const response = await axios.get(endpoint, getRequestConfig(headers));
		console.log("done");
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const patch = async (endpoint: string, data: any) => {
	try {
		console.log(getRequestConfig());
		const response = await axios.patch(endpoint, data, getRequestConfig());
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const post = async (endpoint: string, data: any, headers?: any) => {
	try {
		const response = await axios.post(
			endpoint,
			data,
			getRequestConfig(headers)
		);

		// Include the HTTP status code in the response object
		return {
			data: response.data,
			status: response.status,
		};
	} catch (error: any) {
		// Handle Axios errors and include the HTTP status code in the response object
		if (error.response) {
			const responseData = error.response.data;
			const responseStatus = error.response.status;
			return {
				data: responseData,
				status: responseStatus,
			};
		} else {
			console.log(error);
			return {
				data: null,
				status: 500, // You can choose an appropriate status code for network errors
			};
		}
	}
};

export const deleteRequest = async (endpoint: string) => {
	try {
		const response = await axios.delete(endpoint, getRequestConfig());
		console.log("The response" + response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
