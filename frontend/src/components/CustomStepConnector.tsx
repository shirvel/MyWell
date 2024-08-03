import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

export const CustomStepConnector = styled(StepConnector)(({ }) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      marginTop: "24px",
    },
    line: {
      height: 3,
      border: "none",
      backgroundColor: "#ccc",
      borderRadius: 1,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    active: {
      backgroundColor: "#4A90E2",
    },
    completed: {
      backgroundColor: "#4A90E2",
    },
  }));