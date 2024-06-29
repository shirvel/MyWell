import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";

import { useEffect, useState } from "react";
import { IMealPlanner, MealTypes, getMealPlan } from "./MealPlannerService";
import { Meal } from "./Meal";

export const MealPlanner = () => {
	const [mealPlan, setMealPlan] = useState<IMealPlanner>({});

	useEffect(() => {
		const userId = "123";

		const loadMealPlan = async () => {
			if (userId) {
				const response = await getMealPlan(userId);
				setMealPlan(response);
			}
		};

		loadMealPlan();
	}, []);

	return (
		<div className="w-full py-8 px-2">
			<Table className="w-full">
				<TableHead className="bg-blue-600 ">
					<TableRow>
						{Object.keys(mealPlan).map((day) => (
							<TableCell key={day} align="center">
								<div className="font-bold text-white decoration-8">{day}</div>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{MealTypes.map((meal) => (
						<TableRow key={meal}>
							{Object.keys(mealPlan).map((day) => (
								<TableCell key={`${meal}-${day}`} align="center">
									<Meal
										mealKind={meal}
										mealContent={mealPlan[day][meal].meal}
										mealId={mealPlan[day][meal].meal_id}
									/>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
