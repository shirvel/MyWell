import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { changeMeal } from "./MealPlannerService";
import { useUserContext } from "../providers/UserContextProvider";
import { useNavigate } from "react-router-dom";

export const ChangeMealModal = ({
	meal,
	type,
	day,
	isOpen,
	closeModal,
}: {
	meal: string;
	type: string;
	day: string;
	isOpen: boolean;
	closeModal: VoidFunction;
}) => {
	const [changeReason, setChangeReason] = useState<string>("");
	const { userId, setUserId } = useUserContext();
	const navigate = useNavigate();

	const sendChangeRequest = useCallback(() => {
		console.log(meal, changeReason);
		changeMeal(userId!!, meal, changeReason, day, type).then((result) => {
			if (result.status == 201) {
				navigate(0);
			}
		});
		closeModal();
	}, [changeReason, meal]);

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
