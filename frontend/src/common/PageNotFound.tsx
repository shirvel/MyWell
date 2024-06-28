import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export const PageNotFound = () => {
	return (
		<Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
			<Typography variant="h1" component="h1" gutterBottom>
				404 - Page Not Found
			</Typography>
			<Typography variant="h5" component="p" gutterBottom>
				Oops! The page you are looking for does not exist.
			</Typography>
			<Button
				component={RouterLink}
				to="/"
				variant="contained"
				color="primary"
				sx={{ mt: 4 }}>
				Go to Home
			</Button>
		</Container>
	);
};
