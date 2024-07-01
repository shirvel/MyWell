import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const navigate = useNavigate();

	const handleClose = useCallback((route?: string) => {
		if (route)
			navigate({
				pathname: route,
			});
		setAnchorEl(null);
	}, []);

	return (
		<AppBar position="sticky">
			<Toolbar className="m-0 p-0">
				<SelfImprovementIcon
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
				<Typography
					className="w-full"
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
				<IconButton onClick={handleClick}>
					<MenuIcon className="text-white" />
				</IconButton>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={() => handleClose()}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}>
					<MenuItem onClick={() => handleClose("meal-planner")}>
						Meal Plan
					</MenuItem>
					<MenuItem onClick={() => handleClose("week-reflection")}>
						Week Reflection
					</MenuItem>
					<MenuItem onClick={() => handleClose("register")}>Register</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};
