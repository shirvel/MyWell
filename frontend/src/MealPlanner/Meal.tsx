import {
	Card,
	CardContent,
	CardActions,
	IconButton,
	Checkbox,
	FormControlLabel,
	Box,
	Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import { IMeal, MealTypes, changeEatenMeal, changeLikeMeal } from "./MealPlannerService";
import { useState } from "react";
import { ChangeMealModal } from "./ChangeMealModal";
import { isDayPassed } from "../common/plannerUtils";
import { RecipeModal } from "./RecipeModal";
import MealWithImage from "./MealWithImage"; // Import the MealWithImage component

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
		changeLikeMeal(localStorage.getItem("userId")!!, meal._id, meal.name, meal.liked);
		setLiked(meal.liked);
	};

	const handleCheckboxChange = () => {
		meal.wasEaten = !meal.wasEaten;
		changeEatenMeal(localStorage.getItem("userId")!!, meal._id, meal.wasEaten);
		setWasEaten(meal.wasEaten);
	};

	const handleCardClick = () => {
		setRecipeModalOpen(true);
	};

	const dayPassed = isDayPassed(day);

	return (
		<>
			<Card
				className="h-full"
				sx={{
					width: '150px', // Ensuring a fixed width
					height: '220px', // Ensuring a fixed height
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					...(dayPassed && {
						backgroundColor: "#DCDCDC",
						border: "none",
						boxShadow: "none",
					}),
				}}
			>
				<Box onClick={handleCardClick} sx={{ cursor: "pointer", flex: 1, textAlign: 'center' }}>
					<CardContent sx={{ padding: '8px', paddingTop: '4px', textAlign: 'center' }}>
						<MealWithImage mealName={meal.name} imageHeight="55px" /> {/* Adjusted image height */}
						<Typography variant="body2" sx={{ marginTop: '4px', fontSize: '0.75rem' }}>{meal.name}</Typography>
					</CardContent>
				</Box>

				<CardActions disableSpacing sx={{ justifyContent: 'space-around', padding: '0 4px', alignItems: 'center' }}>
					<IconButton
						aria-label="Like"
						onClick={handleLikeClick}
						disabled={dayPassed}
						sx={{ opacity: dayPassed ? 0.5 : 1 }}
					>
						<FavoriteIcon style={{ color: liked ? "red" : "inherit" }} />
					</IconButton>
					<IconButton
						aria-label="Edit"
						onClick={handleEditClick}
						disabled={dayPassed}
						sx={{ opacity: dayPassed ? 0.5 : 1 }}
					>
						<EditIcon />
					</IconButton>
					<FormControlLabel
						control={
							<Checkbox
								checked={wasEaten}
								onChange={handleCheckboxChange}
								disabled={dayPassed}
								sx={{ opacity: dayPassed ? 0.5 : 1 }}
							/>
						}
						label=""
						sx={{ marginLeft: 0 }}
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
