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
	const [mealPlan, setMealPlan] = useState<IMealPlanner | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
	  const userId = "1234";
  
	  const loadMealPlan = async () => {
		try {
		  const response = await getMealPlan(userId);
		  setMealPlan(response);
		} catch (err) {
		  setError("Failed to load meal plan");
		} finally {
		  setLoading(false);
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
  
	const dayColumns = Object.keys(mealPlan || {}).filter(day => day !== "_id" && day !== "user_id" && day !== "__v");
  
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
				  <TableCell key={`${mealType}-${day}`} align="center">
					{mealPlan && mealPlan[day][mealType] && (
					  <Meal
						key={mealPlan[day][mealType].meal_id}
						mealKind={mealType}
						mealContent={mealPlan[day][mealType].meal}
						mealId={mealPlan[day][mealType].meal_id}
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
