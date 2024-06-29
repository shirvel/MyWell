export type IReflectionSummery = {
	feeling: string;
	pastWeek: string;
	feedback: string;
};

export const sendWeekReflection = (
	userId: string,
	reflectionSummery: IReflectionSummery
) => {
	console.log("sends the reflection summery", reflectionSummery);
	return null;
};
