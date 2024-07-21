import {
	Card,
	CardHeader,
	Avatar,
	CardActions,
	IconButton,
	Typography,
	Box,
	Divider,
  } from "@mui/material";
  import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import EditIcon from "@mui/icons-material/Edit";
  import LunchDiningIcon from "@mui/icons-material/LunchDining";
  import RamenDiningIcon from "@mui/icons-material/RamenDining";
  import { MealTypes } from "./MealPlannerService";
  import { useState } from "react";
  import { ChangeMealModal } from "./ChangeMealModal";
  import { MealDetailsModal } from "./MealDetailModal";
  
  const icons: Record<(typeof MealTypes)[number], JSX.Element> = {
	Breakfast: <FreeBreakfastIcon />,
	Lunch: <LunchDiningIcon />,
	Dinner: <RamenDiningIcon />,
  };
  
  export const Meal = ({
	mealKind,
	mealContent,
	mealId,
  }: {
	mealKind: (typeof MealTypes)[number];
	mealContent: {
	  name: string;
	  ingredients: string[];
	  instructions: string[];
	};
	mealId: string;
  }) => {
	const [openChangeModal, setOpenChangeModal] = useState(false);
	const [openDetailsModal, setOpenDetailsModal] = useState(false);
  
	return (
	  <>
		<Card
		  sx={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			height: "200px",
			position: "relative",
			fontFamily: "'Roboto', sans-serif",
			boxShadow: 3,
		  }}
		  onClick={() => setOpenDetailsModal(true)}
		>
		  <Box
			sx={{
			  position: "absolute",
			  top: 8,
			  left: 8,
			}}
		  >
			<Avatar aria-label="recipe">{icons[mealKind]}</Avatar>
		  </Box>
		  <CardHeader
			title={
			  <>
				<Typography variant="h6" component="div" align="center" sx={{ fontWeight: 'bold' }}>
				  {mealKind}
				</Typography>
				<Divider sx={{ my: 1 }} />
				<Typography variant="body1" component="div" align="center">
				  {mealContent.name}
				</Typography>
			  </>
			}
		  />
		  <CardActions
			disableSpacing
			sx={{
			  justifyContent: "flex-start",
			  position: "absolute",
			  bottom: 8,
			  left: 8,
			}}
		  >
			<IconButton aria-label="Like">
			  <FavoriteIcon />
			</IconButton>
			<IconButton
			  aria-label="Edit"
			  onClick={(e) => {
				e.stopPropagation();
				setOpenChangeModal(true);
			  }}
			>
			  <EditIcon />
			</IconButton>
		  </CardActions>
		</Card>
		<ChangeMealModal
		  mealId={mealId}
		  isOpen={openChangeModal}
		  closeModal={() => setOpenChangeModal(false)}
		  mealContent={mealContent}
		/>
		<MealDetailsModal
		  isOpen={openDetailsModal}
		  closeModal={() => setOpenDetailsModal(false)}
		  mealContent={mealContent}
		/>
	  </>
	);
  };
  