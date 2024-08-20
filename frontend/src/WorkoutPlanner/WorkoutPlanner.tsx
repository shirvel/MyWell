import { useCallback, useEffect, useRef, useState } from "react";
import { useUserContext } from "../providers/UserContextProvider";
import { getWorkoutPlan, IWorkoutPlanner } from "./WorkoutPlannerService";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	Box,
} from "@mui/material";
import { Workout } from "./Workout";
import { dayColumns, isDayPassed, PlannerDates } from "../common/plannerUtils";
import { DateNav } from "../common/PlannerDateNav";
import RestImage from "/rest.png"; // Ensure the correct path to the image

export const WorkoutPlanner = () => {
	const { userId } = useUserContext();
	const [loading, setLoading] = useState<boolean>(true);
	const requestInProgress = useRef<boolean>(false);
	const [workoutPlan, setWorkoutPlan] = useState<IWorkoutPlanner>();
	const [dates, setDates] = useState<PlannerDates | null>(null);

	const loadWorkoutPlan = useCallback(async (dates?: PlannerDates) => {
		if (dates) {
			setDates({ startDate: dates.startDate, endDate: dates.endDate });
		}
		if (userId != null) {
			if (requestInProgress.current) {
				return; // Exit if a request is already in progress
			}

			requestInProgress.current = true;
			try {
				const response = await getWorkoutPlan(userId, dates);
				setWorkoutPlan(response);
				setDates({
					startDate: response.startDate,
					endDate: response.endDate,
				});
			} catch (err) {
				// Handle error
			} finally {
				setLoading(false);
				requestInProgress.current = false;
			}
		}
	}, [userId]);

	useEffect(() => {
		loadWorkoutPlan();
	}, [loadWorkoutPlan]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return workoutPlan ? (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				backgroundImage: `url('/work.jpg')`, // Use the resized background image
				backgroundSize: "cover", // Ensure the image covers the entire container
				backgroundRepeat: "no-repeat", // Prevent the image from repeating
				backgroundPosition: "center", // Center the background image
				backgroundAttachment: "fixed", // Ensure the background image stays fixed when scrolling
				padding: "20px",
				overflowX: "auto", // Ensure content doesn't overflow
			}}
		>
			<Box
				className="background-overlay"
				sx={{
					width: "100%",
					maxWidth: "1600px",
					backgroundColor: "rgba(255, 255, 255, 0.8)", // Reduced opacity to make the background more visible
					borderRadius: "15px", // More rounded corners
					padding: "25px", // Slightly increased padding
					boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow
				}}
			>
				<Typography
					variant="h4"
					align="center"
					gutterBottom
					style={{
						color: "#4a90e2", // Softer blue
						fontWeight: "bold",
						fontFamily: "'Nunito', sans-serif", // Friendly font
					}}
				>
					Weekly Workout Planner
				</Typography>
				<DateNav
					dates={{
						startDate: workoutPlan.startDate,
						endDate: workoutPlan.endDate,
					}}
					loadPlan={loadWorkoutPlan}
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						width: '100%',
						justifyContent: 'space-between',
						overflowX: 'auto',  // Allow horizontal scrolling if necessary
					}}
				>
					{dayColumns.map((day) => (
						<Box
							key={day}
							sx={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								margin: '0 10px',
								backgroundColor: isDayPassed(day) ? "#DCDCDC" : "#f9fafb",
								borderRadius: "12px",
								boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
								minWidth: '150px', // Ensure minimum width to prevent shrinking
								maxWidth: '200px', // Max width for consistency
								height: 'auto', // Let the height adjust based on content
								flexGrow: 1, // Allow boxes to grow to fill available space
							}}
						>
							<Typography
								align="center"
								sx={{
									color: "#6C757D",
									fontWeight: "bold",
									fontSize: "18px",
									padding: "12px",
									borderBottom: "2px solid #4a90e2",
								}}
							>
								{day}
							</Typography>
							<Box
								sx={{
									flex: 1,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									padding: '10px',
									minHeight: '180px', // Ensure enough height for all content
								}}
							>
								{workoutPlan[day] ? (
									<Workout workout={workoutPlan[day].Workout} day={day} />
								) : (
									<Box
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											height: "100%",
											textAlign: "center",
										}}
									>
										<img
											src={RestImage}
											alt="Rest Day"
											style={{
												width: "100px",
												height: "100px",
												marginBottom: "10px",
											}}
										/>
										<Typography variant="h6" align="center">
											Rest Day
										</Typography>
									</Box>
								)}
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</div>
	) : (
		<div>
			No workout plan available.
			<DateNav
				dates={{ startDate: dates?.startDate, endDate: dates?.endDate }}
				loadPlan={loadWorkoutPlan}
			/>
		</div>
	);
};
