import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";
import { getUserDetails } from "../Registration/RegisterService";
import { GlobalState, GlobalStateContext } from "../context/MyWellGlobalState";

export const NavBar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const location = useLocation();
	const { userId, setUserId } = useUserContext();
	const { globalState, setGlobalState } = useContext(GlobalStateContext)!;
	const [username, setUsername] = useState<string | undefined>();
	const [imageUrl, setImageUrl] = useState<string | undefined>();

	useEffect(() => {
		const getUser = async () => {
			if (userId) {
				const res = await getUserDetails(userId);
				if (res) {
					setUsername(res.name);
					setImageUrl(res.imageUrl);
					setGlobalState((prev) => {
						return {
							...prev,
							didWeeklyReflection: res.didWeeklyReflection,
						} as GlobalState;
					});
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
		setGlobalState({} as GlobalState);
		handleClose("/login");
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
					{username && userId && (
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
					<Badge
						color="error"
						variant="dot"
						invisible={globalState.didWeeklyReflection !== false}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}>
						<MenuIcon className="text-white" />
					</Badge>
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
							<Badge
								color="error"
								variant="dot"
								invisible={globalState.didWeeklyReflection !== false}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								sx={{
									"& .MuiBadge-dot": {
										top: "50%",
									},
								}}>
								<MenuItem onClick={() => handleClose("/week-reflection")}>
									Week Reflection
								</MenuItem>
							</Badge>
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
