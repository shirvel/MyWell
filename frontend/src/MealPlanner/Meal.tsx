import {
	Card,
	CardHeader,
	Avatar,
	CardContent,
	CardActions,
	IconButton,
} from "@mui/material";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import WorkoutIcon from "@mui/icons-material/FitnessCenter";
import { MealTypes } from "./MealPlannerService";
import { useState } from "react";
import { ChangeMealModal } from "./ChangeMealModal";

const icons: Record<(typeof MealTypes)[number], JSX.Element> = {
	Breakfast: <FreeBreakfastIcon />,
	Lunch: <LunchDiningIcon />,
	Workout: <WorkoutIcon/>,
	Dinner: <RamenDiningIcon />,
};
export const Meal = ({
	mealKind,
	mealContent,
	mealId,
	day
}: {
	mealKind: (typeof MealTypes)[number];
	mealContent: string;
	mealId: string;
	day: string;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Card
				onClick={() => {
					setOpen(true);
				}}>
				<CardHeader
					avatar={<Avatar aria-label="recipe">{icons[mealKind]}</Avatar>}
					title={mealKind}
				/>

				<CardContent>{mealContent}</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="Like">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="Edit">
						<EditIcon />
					</IconButton>
				</CardActions>
			</Card>
			<ChangeMealModal
				meal={mealContent}
				type={mealKind}
				day={day}
				isOpen={open}
				closeModal={() => {
					setOpen(false);
				}}
			/>
		</>
	);
};
