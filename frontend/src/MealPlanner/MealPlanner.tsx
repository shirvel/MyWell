import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
  } from "@mui/material";
  import { useEffect, useRef, useState } from "react";
  import { IMealPlanner, MealTypes, getMealPlan } from "./MealPlannerService";
  import { Meal } from "./Meal";
import { useUserContext } from "../providers/UserContextProvider";
import { useNavigate } from "react-router-dom";
  
  export const MealPlanner = () => {
	const navigate = useNavigate();
	const { userId, setUserId } = useUserContext();
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
		}
		else {
			navigate("/register")
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
  
	const dayColumns = Object.keys(mealPlan || {}).filter(day => day !== "_id" && day !== "user_id" && day !== "__v" && day != "startDate" && day != "endDate");
  
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
