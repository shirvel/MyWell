import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Box,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { IMealPlanner, MealTypes, getMealPlan } from "./MealPlannerService";
  import { Meal } from "./Meal";
  import { useNavigate } from "react-router-dom";
  
  export const MealPlanner = () => {
	const navigate = useNavigate();
	const [mealPlan, setMealPlan] = useState<IMealPlanner | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
	  const loadMealPlan = async () => {
		try {
		  const response = await getMealPlan("1234");
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
  
	const dayColumns = Object.keys(mealPlan || {}).filter(
	  (day) =>
		day !== "_id" && day !== "user_id" && day !== "__v" && day !== "startDate" && day !== "endDate"
	);
  
	return (
	  <Box sx={{ width: "100%", py: 4 }}>
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
						mealContent={{
						  name: mealPlan[day][mealType].name,
						  ingredients: mealPlan[day][mealType].ingredients,
						  instructions: mealPlan[day][mealType].instructions,
						}}
						mealId={mealPlan[day][mealType].meal_id}
					  />
					)}
				  </TableCell>
				))}
			  </TableRow>
			))}
		  </TableBody>
		</Table>
	  </Box>
	);
  };
  