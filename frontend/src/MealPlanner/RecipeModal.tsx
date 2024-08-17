import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import { IMeal } from "./MealPlannerService";

export const RecipeModal = ({
  meal,
  isOpen,
  closeModal,
}: {
  meal: IMeal;
  isOpen: boolean;
  closeModal: () => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth>
      <DialogTitle>{meal.name}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Ingredients:</Typography>
        <List>
          {meal.ingredients?.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={ingredient.name}
                secondary={ingredient.quantity ? `${ingredient.quantity}${ingredient.comments ? ` (${ingredient.comments})` : ''}` : ''}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" mt={2}>Instructions:</Typography>
        <Typography>{meal.instructions.join('\n\n')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};
