import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { changeMeal } from "./MealPlannerService";

export const ChangeMealModal = ({
	mealId,
	isOpen,
	closeModal,
}: {
	mealId: string;
	isOpen: boolean;
	closeModal: VoidFunction;
}) => {
	const [changeReason, setChangeReason] = useState<string>("");

	const sendChangeRequest = useCallback(() => {
		console.log(mealId, changeReason);
		changeMeal(mealId, changeReason);
		closeModal();
	}, [changeReason, mealId]);

	return (
		<>
			<Dialog open={isOpen} onClose={closeModal}>
				<DialogTitle>Would you like to change the current meal?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						If you want to change this meal we will be happy to do so! We only
						want to know the reason so we could be better next time!
					</DialogContentText>
					<TextField
						label="Reason"
						variant="outlined"
						value={changeReason}
						onChange={(event) => {
							console.log(event.target.value);
							setChangeReason(event.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={sendChangeRequest}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
