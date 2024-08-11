import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { IMealPlanner, MealTypes, getMealPlan } from "./MealPlannerService";
import { Meal } from "./Meal";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export const dayColumns = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const isDayPassed = (day: string) => {
	// Get the current date
	const today = new Date();
	// Format the date to get the full day name
	const currentDay = format(today, "EEEE");
	const currentDayIndex = dayColumns.indexOf(currentDay);
	if (dayColumns.indexOf(day) < currentDayIndex) {
		return true;
	}
	return false;
};

export const MealPlanner = () => {
	const navigate = useNavigate();
	const userId = useMemo(() => localStorage.getItem("userId"), []);
	const [mealPlan, setMealPlan] = useState<IMealPlanner | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const requestInProgress = useRef<boolean>(false);

	useEffect(() => {
		const loadMealPlan = async () => {
			if (userId != null) {
				if (requestInProgress.current) {
					return; // Exit if a request is already in progress
				}

				requestInProgress.current = true;

				try {
					const response = await getMealPlan(userId);
					setMealPlan(response);
				} catch (err) {
					setError("Failed to load meal plan");
				} finally {
					setLoading(false);
					requestInProgress.current = false;
				}
			} else {
				navigate("/login");
			}
		};

		loadMealPlan();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="w-full py-8 px-2">
			<Table className="w-full">
				<TableHead className="bg-blue-600">
					<TableRow>
						{dayColumns.map((day) => (
							<TableCell key={day} align="center">
								<div className="font-bold text-white decoration-8">{day}</div>
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
									sx={
										isDayPassed(day)
											? {
													backgroundColor: "#DCDCDC",
											  }
											: {}
									}>
									{mealPlan && mealPlan[day][mealType] && (
										<Meal
											key={mealPlan[day][mealType]._id}
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
		</div>
	);
};
