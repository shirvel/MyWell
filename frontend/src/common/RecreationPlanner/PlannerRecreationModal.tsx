import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogTitle,
	TextField,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";

export const PlannerRecreationModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: (feedback: string | null) => void;
}) => {
	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState("");
	return (
		<Dialog onClose={() => onClose(null)} open={isOpen} fullWidth>
			<DialogTitle>Regenerate Planner</DialogTitle>
			{!loading ? (
				<div className="p-4 w-full h-full text-center">
					<TextField
						className="p-4 w-full h-full"
						label="Change Reason"
						variant="outlined"
						value={feedback}
						onChange={(event) => setFeedback(event.target.value)}
					/>
					<Button
						onClick={async () => {
							setLoading(true);
							await onClose(feedback);
							setLoading(false);
							setFeedback("");
						}}>
						<RefreshIcon /> Regenerate
					</Button>
				</div>
			) : (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(255, 255, 255, 0.9)",
						overflow: "hidden",
					}}>
					<CircularProgress />
				</Box>
			)}
		</Dialog>
	);
};
