import { IconButton } from "@mui/material";
import {
	getDateFormatted,
	getWeekBeforeDates,
	getWeekAfterDates,
	PlannerDates,
} from "./plannerUtils";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const DateNav = ({
	dates,
	loadPlan,
}: {
	dates: PlannerDates;
	loadPlan: (dates?: PlannerDates) => Promise<void>;
}) => {
	return (
		<div>
			<div>
				{getDateFormatted(dates?.startDate || "")} -
				{getDateFormatted(dates?.endDate || "")}
			</div>

			<IconButton
				onClick={() =>
					loadPlan(
						getWeekBeforeDates({
							startDate: dates?.startDate,
							endDate: dates?.endDate,
						})
					)
				}>
				<KeyboardArrowLeftIcon />
			</IconButton>
			<IconButton
				onClick={() =>
					loadPlan(
						getWeekAfterDates({
							startDate: dates?.startDate,
							endDate: dates?.endDate,
						})
					)
				}>
				<KeyboardArrowRightIcon />
			</IconButton>
		</div>
	);
};
