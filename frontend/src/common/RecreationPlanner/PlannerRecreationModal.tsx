import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export const PlannerRecreationModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: VoidFunction;
}) => {
	return (
		<Dialog onClose={onClose} open={isOpen} fullWidth>
			<div className="p-4 w-full h-full text-center">
				<DialogTitle>Regenerate Planner</DialogTitle>
				<TextField
					className="p-4 w-full h-full"
					label="Change Reason"
					variant="outlined"
				/>
			</div>
			<Button>
				<RefreshIcon /> Regenerate
			</Button>
		</Dialog>
	);
};
