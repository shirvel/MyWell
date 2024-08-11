import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMealPlanner, MealTypes, getMealPlan } from "./MealPlannerService";
import { Meal } from "./Meal";
import { useUserContext } from "../providers/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { dayColumns, isDayPassed, PlannerDates } from "../common/plannerUtils";
import { DateNav } from "../common/PlannerDateNav";

export const MealPlanner = () => {
	const navigate = useNavigate();
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
		} else {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		loadMealPlan();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return mealPlan ? (
		<div className="w-full py-8 px-2">
			<DateNav
				dates={{ startDate: mealPlan.startDate, endDate: mealPlan.endDate }}
				loadPlan={loadMealPlan}
			/>
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
