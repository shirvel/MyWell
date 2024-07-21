import { Modal, Box, Typography, Button } from "@mui/material";

export const MealDetailsModal = ({
  isOpen,
  closeModal,
  mealContent,
}: {
  isOpen: boolean;
  closeModal: () => void;
  mealContent: {
    name: string;
    ingredients: string[];
    instructions: string[];
  };
}) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{
          width: 400,
          margin: "auto",
          mt: "10%",
          p: 3,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="div">
          {mealContent.name}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Ingredients:</strong> {mealContent.ingredients.join(", ")}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Instructions:</strong> {mealContent.instructions.join(", ")}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={closeModal}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
