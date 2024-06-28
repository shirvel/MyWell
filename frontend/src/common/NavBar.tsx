import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const NavBar = () => {
	return (
		<AppBar position="sticky">
			<Toolbar className="m-0 p-0">
				<SelfImprovementIcon
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
				<Typography
					variant="h6"
					noWrap
					sx={{
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						color: "white",
					}}>
					My Well
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
