import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, CircularProgress, IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useCallback, useState } from "react";
import { IMeal } from "./MealPlannerService";
import { useUserContext } from "../providers/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { commentMeal } from "./ChangeMealService";

export const ChangeMealModal = ({
	meal,
	type,
	day,
	isOpen,
	closeModal,
}: {
	meal: IMeal;
	type: string;
	day: string;
	isOpen: boolean;
	closeModal: VoidFunction;
}) => {
	const [preferences, setPreferences] = useState<{ [key: string]: 'like' | 'dislike' | '' }>({});
	const [comment, setComment] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const { userId } = useUserContext();
	const navigate = useNavigate();

	const handlePreferenceChange = (ingredient: string, value: 'like' | 'dislike') => {
		setPreferences((prev) => {
			const currentPreference = prev[ingredient];
			let newPreference: 'like' | 'dislike' | '' = '';
			
			if (currentPreference === value) {
				newPreference = '';
			} else {
				newPreference = value;
			}
			
			return {
				...prev,
				[ingredient]: newPreference,
			};
		});
	};
	
	const sendChangeRequest = useCallback(async () => {
		if (!userId) {
			return;
		}

		const likeIngredients = Object.keys(preferences).filter((ingredient) => preferences[ingredient] === 'like');
		const dislikeIngredients = Object.keys(preferences).filter((ingredient) => preferences[ingredient] === 'dislike');

		let summary = '';
		if (likeIngredients.length > 0) {
			summary += `The user likes: ${likeIngredients.join(", ")}.\n`;
		}
		if (dislikeIngredients.length > 0) {
			summary += `The user dislike: ${dislikeIngredients.join(", ")}.\n`;
		}
		if (comment.trim()) {
			summary += `The user's comment on ${meal.name}': ${comment}`;
		}

		setLoading(true);
		await commentMeal(userId, meal._id, summary, day, type).then((response) => {
			if (response != null) {
				navigate(0); // Refresh the page
			}

			setLoading(false);
			closeModal();
		});
	}, [preferences, comment, meal.name, day, type, userId, navigate, closeModal]);

	return (
		<Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
			<DialogTitle>{`Provide Feedback for ${meal.name}`}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					If you want to change this meal, please indicate your preferences for the ingredients and leave any additional comments.
				</DialogContentText>
				{meal.ingredients?.map((ingredient) => (
					<div key={ingredient.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
						<span>{ingredient.name}</span>
						<div>
							<IconButton
								color={preferences[ingredient.name] === 'like' ? 'primary' : 'default'}
								onClick={() => handlePreferenceChange(ingredient.name, 'like')}
								aria-label={`like ${ingredient.name}`}
							>
								<ThumbUpIcon />
							</IconButton>
							<IconButton
								color={preferences[ingredient.name] === 'dislike' ? 'error' : 'default'}
								onClick={() => handlePreferenceChange(ingredient.name, 'dislike')}
								aria-label={`dislike ${ingredient.name}`}
							>
								<ThumbDownIcon />
							</IconButton>
						</div>
					</div>
				))}
				<TextField
					label="Additional comments"
					variant="outlined"
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					fullWidth
					multiline
					rows={3}
					margin="normal"
				/>
				{loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}
			</DialogContent>
			<DialogActions>
				<Button onClick={sendChangeRequest} disabled={loading} variant="contained">
					{loading ? "Saving..." : "Save"}
				</Button>
				<Button onClick={closeModal} disabled={loading} color="inherit">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};
