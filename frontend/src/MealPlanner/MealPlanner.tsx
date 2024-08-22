import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	Box,
	CircularProgress,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMealPlanner, MealTypes, getMealPlan } from "./MealPlannerService";
import { useUserContext } from "../providers/UserContextProvider";
import { dayColumns, PlannerDates } from "../common/plannerUtils";
import { DateNav } from "../common/PlannerDateNav";
import { PlannerRecreationButton } from "../common/RecreationPlanner/PlannerRecreationButton";
import axios from "axios";
import { Meal } from "./Meal"; // Import the Meal component

export const MealPlanner = () => {
	const { userId } = useUserContext();
	const [mealPlan, setMealPlan] = useState<IMealPlanner | null>(null);
	const [dates, setDates] = useState<PlannerDates | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const requestInProgress = useRef<boolean>(false);

	const fetchBatchMealImages = async (mealNames: string[]) => {
		const cachedImages = JSON.parse(localStorage.getItem("mealImages") || "{}");
		const mealsToFetch = mealNames.filter((meal) => !cachedImages[meal]);

		if (mealsToFetch.length > 0) {
			try {
				const response = await axios.get(
					`https://api.spoonacular.com/recipes/complexSearch`,
					{
						params: {
							query: mealsToFetch.join(","), // Batch request for multiple meals
							number: mealsToFetch.length,
							apiKey: "", // Replace with your actual Spoonacular API key
						},
					}
				);

				response.data.results.forEach((result: any) => {
					cachedImages[result.title] = result.image; // Assuming the meal title is accurate
				});

				// Cache the fetched images
				localStorage.setItem("mealImages", JSON.stringify(cachedImages));
			} catch (error) {
				console.error("Error fetching meal images", error);
			}
		}
	};

	const loadMealPlan = useCallback(
		async (dates?: PlannerDates) => {
			if (dates) {
				setDates({ startDate: dates.startDate, endDate: dates.endDate });
			}
			if (userId != null) {
				if (requestInProgress.current) {
					return;
				}

				requestInProgress.current = true;

				try {
					const response = await getMealPlan(userId, dates);
					setMealPlan(response);

					const mealNames: string[] = [];

					Object.keys(response).forEach((day) => {
						MealTypes.forEach((mealType) => {
							if (response[day][mealType]) {
								mealNames.push(response[day][mealType].name);
							}
						});
					});

					await fetchBatchMealImages(mealNames);

					setDates({
						startDate: response.startDate,
						endDate: response.endDate,
					});
				} catch (err) {
					console.log("Failed to load meal plan");
				} finally {
					setLoading(false);
					requestInProgress.current = false;
				}
			}
		},
		[userId]
	);

	useEffect(() => {
		loadMealPlan();
	}, []);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
					backgroundColor: "rgba(255, 255, 255, 0.9)",
				}}>
				<CircularProgress />
			</Box>
		);
	}

	return mealPlan ? (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				backgroundImage: `url('/test.jpg')`, // Background image
				backgroundSize: "cover", // Cover the entire container
				backgroundPosition: "center", // Center the background image
				padding: "20px",
				backgroundColor: "#f0f8ff", // Soft pastel blue background
			}}>
			<Box
				className="background-overlay"
				sx={{
					width: "100%",
					maxWidth: "1600px",
					backgroundColor: "rgba(255, 255, 255, 0.9)", // Softer white background
					borderRadius: "15px", // More rounded corners
					padding: "25px", // Slightly increased padding
					boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow
				}}>
				<Typography
					variant="h4"
					align="center"
					gutterBottom
					style={{
						color: "#5e7b99", // Softer blue
						fontWeight: "bold",
						fontFamily: "Lora", // Friendly font
					}}>
					Weekly Planner
				</Typography>
				<DateNav
					dates={{ startDate: mealPlan.startDate, endDate: mealPlan.endDate }}
					loadPlan={loadMealPlan}
				/>
				<PlannerRecreationButton />
				<Table
					style={{
						tableLayout: "fixed", // Force equal width for each column
						width: "100%",
					}}>
					<TableHead>
						<TableRow>
							{dayColumns.map((day) => (
								<TableCell
									key={day}
									align="center"
									style={{
										color: "#6C757D",
										fontWeight: "bold",
										fontSize: "18px", // Slightly larger for readability
										padding: "12px",
										borderBottom: "2px solid #4a90e2", // Softer blue
										width: "150px", // Ensure consistent width for each column
									}}>
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
											padding: "10px", // Slightly increased padding for comfort
											backgroundColor: "#f9fafb", // Light background
											borderBottom: "1px solid #DCDCDC",
											borderRadius: "12px", // More rounded corners
											height: "220px", // Ensure consistent height for each row
											width: "150px", // Ensure consistent width for each column
											verticalAlign: "top", // Ensure content aligns to the top of the cell
											boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for each card
										}}>
										{mealPlan && mealPlan[day][mealType] && (
											<Meal
												mealKind={mealType}
												meal={mealPlan[day][mealType]}
												day={day}
											/>
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
			No meal plan available.
			<DateNav
				dates={{ startDate: dates?.startDate, endDate: dates?.endDate }}
				loadPlan={loadMealPlan}
			/>
		</div>
	);
};
