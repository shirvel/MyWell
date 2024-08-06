import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";
import { getUserNameAndImage } from "../Registration/RegisterService";

export const NavBar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const location = useLocation();
	const { userId, setUserId } = useUserContext();
	const [username, setUsername] = useState<string | undefined>();
	const [imageUrl, setImageUrl] = useState<string | undefined>();

	useEffect(() => {
		const getUser = async () => {
			if (userId) {
				const res = await getUserNameAndImage(userId);
				if (res) {
					setUsername(res.name);
					setImageUrl(res.image);
				}
			}
		};
		getUser();
	}, [userId]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = useCallback(
		(route?: string) => {
			if (route) {
				navigate(route);
			}
			setAnchorEl(null);
		},
		[navigate]
	);

	const handleLogOut = () => {
		setUserId(null);
		handleClose("/register"); // Redirect to Register page after logout
	};

	const isLoginPage = location.pathname === "/login";
	const isRegisterPage = location.pathname === "/register";
	const isAuthenticated = userId != null;

	return (
		<AppBar position="sticky">
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					p: 0,
				}}>
				{/* Left section: Avatar and username */}
				<div className="flex items-center space-x-4">
					{username && (
						<div>
							<Avatar className="my-2" src={imageUrl} alt={username} />
							<Typography
								noWrap
								sx={{
									display: { xs: "none", md: "flex" },
									fontFamily: "monospace",
									fontWeight: 700,
									color: "white",
								}}>
								Hello, {username}
							</Typography>
						</div>
					)}
				</div>

				{/* Center section: App name */}
				<div
					style={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<SelfImprovementIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						sx={{
							display: { xs: "none", md: "flex" },
							fontFamily: "Product Sans",
							fontWeight: 700,
							color: "white",
						}}>
						My Well
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
					{isAuthenticated ? (
						<div>
							<MenuItem onClick={() => handleClose("/meal-planner")}>
								Meal Plan
							</MenuItem>
							<MenuItem onClick={() => handleClose("/workout-planner")}>
								Workout Plan
							</MenuItem>
							<MenuItem onClick={() => handleClose("/week-reflection")}>
								Week Reflection
							</MenuItem>
							<MenuItem onClick={() => handleClose("update-user-details")}>
								Update User Details
							</MenuItem>
							<MenuItem onClick={handleLogOut}>Log out</MenuItem>
						</div>
					) : isLoginPage ? (
						<MenuItem onClick={() => handleClose("/register")}>
							Register
						</MenuItem>
					) : isRegisterPage ? (
						<MenuItem onClick={() => handleClose("/login")}>Login</MenuItem>
					) : null}
				</Menu>
			</Toolbar>
		</AppBar>
	);
};
