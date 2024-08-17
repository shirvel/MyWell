import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	Box,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMealPlanner, MealTypes, getMealPlan } from "./MealPlannerService";
import { Meal } from "./Meal";
import { useUserContext } from "../providers/UserContextProvider";
import { dayColumns, PlannerDates } from "../common/plannerUtils";
import { DateNav } from "../common/PlannerDateNav";

export const MealPlanner = () => {
	const { userId } = useUserContext();
	const [mealPlan, setMealPlan] = useState<IMealPlanner | null>(null);
	const [dates, setDates] = useState<PlannerDates | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const requestInProgress = useRef<boolean>(false);

	const loadMealPlan = useCallback(async (dates?: PlannerDates) => {
		if (dates) {
			setDates({ startDate: dates.startDate, endDate: dates.endDate });
		}
		if (userId != null) {
			if (requestInProgress.current) {
				return; // Exit if a request is already in progress
			}

			requestInProgress.current = true;

			try {
				const response = await getMealPlan(userId, dates);
				setMealPlan(response);
				setDates({ startDate: response.startDate, endDate: response.endDate });
			} catch (err) {
				console.log("Failed to load meal plan");
			} finally {
				setLoading(false);
				requestInProgress.current = false;
			}
		}
	}, []);

	useEffect(() => {
		loadMealPlan();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return mealPlan ? (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				backgroundImage: `url('/background.jpg')`, // Replace with your image path
				backgroundSize: "cover",
				backgroundPosition: "center",
				padding: "20px",
			}}
		>
			<Box
				className="background-overlay"
				sx={{
					width: "100%", // Width set to fill the screen
					maxWidth: "1600px", // Max width to contain content
					backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white overlay
					borderRadius: "12px",
					padding: "20px",
					boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
				}}
			>
				<Typography
					variant="h4"
					align="center"
					gutterBottom
					style={{
						color: "#6A8CAF", // Softer blue color for text
						fontWeight: "bold",
					}}
				>
					Weekly Planner
				</Typography>
				<DateNav
					dates={{ startDate: mealPlan.startDate, endDate: mealPlan.endDate }}
					loadPlan={loadMealPlan}
				/>
				<Table>
					<TableHead>
						<TableRow>
							{dayColumns.map((day) => (
								<TableCell
									key={day}
									align="center"
									style={{
										color: "#6C757D",
										fontWeight: "bold",
										fontSize: "16px",
										padding: "12px",
										borderBottom: "2px solid #6A8CAF", // Softer blue color
									}}
								>
									{day}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{MealTypes.map((mealType) => (
							<TableRow key={mealType}>
								{dayColumns.map((day) => (
									<TableCell
										key={`${mealType}-${day}`}
										align="center"
										style={{
											padding: "16px",
											backgroundColor: "#F9F9F9",
											borderBottom: "1px solid #DCDCDC",
											borderRadius: "8px",
										}}
									>
										{mealPlan && mealPlan[day][mealType] && (
											<Box
												sx={{
													backgroundColor: "#D4E6F1", // Softer blue background for the cards
													borderRadius: "8px",
													padding: "10px",
													boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
												}}
											>
												<Meal
													key={mealPlan[day][mealType]._id}
													mealKind={mealType}
													meal={mealPlan[day][mealType]}
													day={day}
												/>
											</Box>
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</div>
	) : (
		<div>
			no meal plan
			<DateNav
				dates={{ startDate: dates?.startDate, endDate: dates?.endDate }}
				loadPlan={loadMealPlan}
			/>
		</div>
	);
};
