import { useState, useCallback } from "react";
import { Alert, Grid } from "@mui/material";
import { login } from "./LoginService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";
import { CustomTextField } from "../components/CustomTextField";
import { CustomButton } from "../components/CustomButton";
import { CustomTypography } from "../components/CustomTypography";

export const addInfoToLocalStorage = (userInfo: {
	accessToken: string;
	refreshToken: string;
	userId: string;
}) => {
	localStorage.setItem("accessToken", userInfo.accessToken);
	localStorage.setItem("refreshToken", userInfo.refreshToken);
	localStorage.setItem("userId", userInfo.userId);
};

export const removeInfoToLocalStorage = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("userId");
};

export const LoginPage = () => {
	const { setUserId } = useUserContext();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showError, setShowError] = useState(false);
	const navigate = useNavigate();
	const onLogin = useCallback(async () => {
		const tokens = await login({ email, password });
		console.log(tokens);
		if (tokens) {
			setUserId(tokens.userId);
			addInfoToLocalStorage(tokens);
			navigate("/meal-planner");
		} else {
			setShowError(true);
		}
	}, [email, password]);

	const onRegister = useCallback(() => {
		navigate({
			pathname: "/register",
		});
	}, []);

	return (
		<div
			className="flex items-center justify-center"
			style={{ marginTop: "20px" }}>
			<div className="w-1/3 p-4">
				<CustomTypography style={{ marginBottom: "20px" }}>
					Login
				</CustomTypography>
				<Grid container spacing={2} justifyContent="center" alignItems="center">
					<Grid item xs={12}>
						<CustomTextField
							label="Email"
							onChange={(event) => {
								setEmail(event.target.value);
								setShowError(false);
							}}
							value={email}
							required={true}
						/>
					</Grid>
					<Grid item xs={12}>
						<CustomTextField
							label="Password"
							type="password"
							onChange={(event) => {
								setPassword(event.target.value);
								setShowError(false);
							}}
							value={password}
							required={true}
						/>
					</Grid>
					{showError && (
						<Grid item xs={12}>
							<Alert severity="error">
								The Email or Password are incorrect please try again or register
							</Alert>
						</Grid>
					)}

					<Grid item xs={12}>
						<CustomButton
							onClick={onLogin}
							fullWidth
							size="large"
							label="Login"
						/>
					</Grid>
					<Grid item xs={12}>
						<CustomButton
							onClick={onRegister}
							fullWidth
							size="large"
							label="Register"
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
