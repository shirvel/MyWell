import { Grid, TextField, Button, Card } from "@mui/material";
import { useCallback, useState } from "react";
import { login } from "./LoginService";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const onLogin = useCallback(() => {
		console.log(email, password);
		login({ email, password });
	}, []);

	const onRegister = useCallback(() => {
		navigate({
			pathname: "/register",
		});
	}, []);

	return (
		<div className="flex items-center justify-center">
			<div className="w-1/2">
				<Grid container spacing={2} justifyContent="center" alignItems="center">
					<Grid item xs={12} className="p-4">
						<TextField
							fullWidth
							id="email"
							label="Email"
							variant="outlined"
							margin="normal"
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							value={email}
							required
						/>
						<TextField
							fullWidth
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							value={password}
							id="password"
							label="Password"
							variant="outlined"
							type="password"
							margin="normal"
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							onClick={onLogin}
							variant="contained"
							fullWidth
							size="large"
							className="w-full">
							Login
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button
							onClick={onRegister}
							variant="contained"
							fullWidth
							size="large"
							className="w-full">
							Register
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
