import {
	Card,
	CardHeader,
	Avatar,
	CardContent,
	CardActions,
	IconButton,
	Checkbox,
	FormControlLabel,
	Box,
} from "@mui/material";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import { IMeal, MealTypes, changeEatenMeal, changeLikeMeal } from "./MealPlannerService";
import { useState } from "react";
import { ChangeMealModal } from "./ChangeMealModal";
import { isDayPassed } from "../common/plannerUtils";
import { RecipeModal } from "./RecipeModal";

const icons: Record<(typeof MealTypes)[number], JSX.Element> = {
	Breakfast: <FreeBreakfastIcon />,
	Lunch: <LunchDiningIcon />,
	Dinner: <RamenDiningIcon />,
};

export const Meal = ({
	mealKind,
	meal,
	day,
}: {
	mealKind: (typeof MealTypes)[number];
	meal: IMeal;
	day: string;
}) => {
	const [changeModalOpen, setChangeModalOpen] = useState(false);
	const [recipeModalOpen, setRecipeModalOpen] = useState(false);

	const [liked, setLiked] = useState(meal.liked);
	const [wasEaten, setWasEaten] = useState(meal.wasEaten);

	const handleEditClick = () => {
		setChangeModalOpen(true);
	};

	const handleLikeClick = () => {
		meal.liked = !meal.liked;
		console.log(`new liked: ${meal.liked}`);
		changeLikeMeal(localStorage.getItem("userId")!!, meal._id, meal.name, meal.liked);
		setLiked(meal.liked);
	};

	const handleCheckboxChange = () => {
		meal.wasEaten = !meal.wasEaten;
		console.log(`new eaten: ${meal.wasEaten}`);
		changeEatenMeal(localStorage.getItem("userId")!!, meal._id, meal.wasEaten);
		setWasEaten(meal.wasEaten);
	};

	const handleCardClick = () => {
		console.log("show details");
		setRecipeModalOpen(true);
	};

	return (
		<>
			<Card
				className="h-full"
				sx={
					isDayPassed(day)
						? {
								backgroundColor: "#DCDCDC",
								border: "none",
								boxShadow: "none",
						  }
						: {}
				}
			>
				<Box onClick={handleCardClick} sx={{ cursor: "pointer" }}>
					<CardHeader
						avatar={<Avatar aria-label="recipe">{icons[mealKind]}</Avatar>}
						title={mealKind}
					/>
					<CardContent>{meal.name}</CardContent>
				</Box>

				<CardActions disableSpacing>
					<IconButton
						aria-label="Like"
						onClick={handleLikeClick}
						disabled={isDayPassed(day)}
					>
						<FavoriteIcon style={{ color: liked ? "red" : "inherit" }} />
					</IconButton>
					<IconButton
						aria-label="Edit"
						onClick={handleEditClick}
						disabled={isDayPassed(day)}
					>
						<EditIcon />
					</IconButton>
					<FormControlLabel
						control={
							<Checkbox
								checked={wasEaten}
								onChange={handleCheckboxChange}
								disabled={isDayPassed(day)}
							/>
						}
						label=""
						sx={{ marginLeft: 1 }}
					/>
				</CardActions>
			</Card>
			<ChangeMealModal
				meal={meal}
				type={mealKind}
				day={day}
				isOpen={changeModalOpen}
				closeModal={() => {
					setChangeModalOpen(false);
				}}
			/>
			<RecipeModal
				meal={meal}
				isOpen={recipeModalOpen}
				closeModal={() => {
					setRecipeModalOpen(false);
				}}
			/>
		</>
	);
};
