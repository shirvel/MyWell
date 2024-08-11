import { addWeeks, format, subWeeks } from "date-fns";

export const dayColumns = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export type PlannerDates = {
	startDate?: string;
	endDate?: string;
};

export const isDayPassed = (day: string) => {
	// Get the current date
	const today = new Date();
	// Format the date to get the full day name
	const currentDay = format(today, "EEEE");
	const currentDayIndex = dayColumns.indexOf(currentDay);
	if (dayColumns.indexOf(day) < currentDayIndex) {
		return true;
	}
	return false;
};

export const getDateFormatted = (backendDate: string) => {
	const date = new Date(backendDate);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const formattedDate = date.toLocaleDateString("en-US", options);
	return formattedDate;
};

const getNewDate = (shouldAdd: boolean, date?: string) => {
	if (!date) {
		return "";
	}
	if (shouldAdd) {
		const newDate = addWeeks(new Date(date), 1);
		return format(newDate, "yyyy-MM-dd");
	} else {
		const newDate = subWeeks(new Date(date), 1);
		return format(newDate, "yyyy-MM-dd");
	}
};

export const getWeekBeforeDates = (dates: PlannerDates) => {
	return {
		startDate: getNewDate(false, dates.startDate),
		endDate: getNewDate(false, dates.endDate),
	};
};

export const getWeekAfterDates = (dates: PlannerDates) => {
	return {
		startDate: getNewDate(true, dates.startDate),
		endDate: getNewDate(true, dates.endDate),
	};
};
