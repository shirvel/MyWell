import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Card,
	CardHeader,
	Avatar,
	IconButton,
	CardContent,
	CardActions,
} from "@mui/material";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";

export const MealPlanner = () => {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return (
		<div className="w-full py-8 px-2">
			<Table className="w-full">
				<TableHead className="bg-blue-600 ">
					<TableRow>
						{daysOfWeek.map((day) => (
							<TableCell key={day} align="center">
								<div className="font-bold text-white decoration-8">{day}</div>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{["Breakfast", "Lunch", "Dinner"].map((meal) => (
						<TableRow key={meal}>
							{daysOfWeek.map((day) => (
								<TableCell key={`${meal}-${day}`} align="center">
									<Card>
										<CardHeader
											avatar={
												<Avatar aria-label="recipe">
													<FreeBreakfastIcon />
												</Avatar>
											}
											title="breakfast"
										/>

										<CardContent>the meal</CardContent>
										<CardActions disableSpacing>
											<IconButton aria-label="Like">
												<FavoriteIcon />
											</IconButton>
											<IconButton aria-label="Edit">
												<EditIcon />
											</IconButton>
										</CardActions>
									</Card>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
