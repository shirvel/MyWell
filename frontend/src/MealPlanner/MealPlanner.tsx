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
import { useUserContext } from "../providers/UserContextProvider";
import { dayColumns, PlannerDates } from "../common/plannerUtils";
import { DateNav } from "../common/PlannerDateNav";
import axios from "axios";
import { Meal } from "./Meal";  // Import the Meal component

export const MealPlanner = () => {
	const { userId } = useUserContext();
	const [mealPlan, setMealPlan] = useState<IMealPlanner | null>(null);
	const [dates, setDates] = useState<PlannerDates | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const requestInProgress = useRef<boolean>(false);

	const fetchBatchMealImages = async (mealNames: string[]) => {
		const cachedImages = JSON.parse(localStorage.getItem('mealImages') || '{}');
		const mealsToFetch = mealNames.filter(meal => !cachedImages[meal]);

		if (mealsToFetch.length > 0) {
			try {
				const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
					params: {
						query: mealsToFetch.join(','), // Batch request for multiple meals
						number: mealsToFetch.length,
						apiKey: '', // Replace with your actual Spoonacular API key
					},
				});

				response.data.results.forEach((result: any) => {
					cachedImages[result.title] = result.image; // Assuming the meal title is accurate
				});

				// Cache the fetched images
				localStorage.setItem('mealImages', JSON.stringify(cachedImages));
			} catch (error) {
				console.error("Error fetching meal images", error);
			}
		}
	};

	const loadMealPlan = useCallback(async (dates?: PlannerDates) => {
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

				Object.keys(response).forEach(day => {
					MealTypes.forEach(mealType => {
						if (response[day][mealType]) {
							mealNames.push(response[day][mealType].name);
						}
					});
				});

				await fetchBatchMealImages(mealNames);

				setDates({ startDate: response.startDate, endDate: response.endDate });
			} catch (err) {
				console.log("Failed to load meal plan");
			} finally {
				setLoading(false);
				requestInProgress.current = false;
			}
		}
	}, [userId]);

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
				backgroundImage: `url('/background.jpg')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				padding: "20px",
			}}
		>
			<Box
				className="background-overlay"
				sx={{
					width: "100%",
					maxWidth: "1600px",
					backgroundColor: "rgba(255, 255, 255, 0.8)",
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
						color: "#6A8CAF",
						fontWeight: "bold",
					}}
				>
					Weekly Planner
				</Typography>
				<DateNav
					dates={{ startDate: mealPlan.startDate, endDate: mealPlan.endDate }}
					loadPlan={loadMealPlan}
				/>
				<Table
					style={{
						tableLayout: "fixed", // Force equal width for each column
						width: "100%",
					}}
				>
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
										borderBottom: "2px solid #6A8CAF",
										width: "150px", // Ensure consistent width for each column
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
											padding: "8px", // Less padding to fit everything properly
											backgroundColor: "#F9F9F9",
											borderBottom: "1px solid #DCDCDC",
											borderRadius: "8px",
											height: "220px",  // Ensure consistent height for each row
											width: "150px",   // Ensure consistent width for each column
											verticalAlign: "top", // Ensure content aligns to the top of the cell
										}}
									>
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
