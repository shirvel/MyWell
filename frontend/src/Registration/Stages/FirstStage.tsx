import { TextField } from "@mui/material";

export const FirstStage = () => {
	return (
		<div className="space-y-4 p-4">
			<TextField className="w-full" label="User Name" variant="outlined" />
			<TextField className="w-full" label="Birthday" variant="outlined" />
			<TextField className="w-full" label="Gender" variant="outlined" />
		</div>
	);
};
