import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";
import { getUserName } from "../Registration/RegisterService";

export const NavBar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const navigate = useNavigate();
	const { userId, setUserId } = useUserContext();
	const [username, setUsername] = useState<string>();

	useEffect(() => {
		const getUser = async () => {
			if (userId) {
				const res = await getUserName(userId);
				if (res) setUsername(res);
			}
		};
		getUser();
	}, [userId]);

	const handleClose = useCallback((route?: string) => {
		if (route)
			navigate({
				pathname: route,
			});
		setAnchorEl(null);
	}, []);

	const handleLogOut = () => {
		setUserId(null);
		handleClose("register");
	};

	return (
		<AppBar position="sticky">
			<Toolbar className="m-0 p-0">
				<SelfImprovementIcon
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
				<div className="w-full">
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
					<Typography
						noWrap
						sx={{
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							color: "white",
						}}>
						{username && <div>Hello, {username}</div>}
					</Typography>
				</div>

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
					<MenuItem onClick={() => handleClose("login")}>Login</MenuItem>
					<MenuItem onClick={() => handleLogOut()}>Log out</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};
