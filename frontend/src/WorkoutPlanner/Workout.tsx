import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { IWorkout } from "./WorkoutPlannerService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Workout = ({ workout }: { workout: IWorkout }) => {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header">
				{workout.Workout.name}
			</AccordionSummary>
			<AccordionDetails>
				{workout.Workout.instructions.map((inst, index) => {
					return <div key={index}>{inst}</div>;
				})}
			</AccordionDetails>
		</Accordion>
	);
};
