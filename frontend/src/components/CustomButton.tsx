import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  label?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  disabled = false,
  color,
  variant = "contained",
  size = "small",
  label,
  ...props
}) => (
  <Button
    color={color}
    disabled={disabled}
    onClick={onClick}
    variant={variant}
    size={size}
    style={{
      fontWeight: "bold",
      borderRadius: "20px",
      padding: "12px 24px",
      fontSize: "20px",
      flex: "1",
      marginRight: "8px",
      textTransform: "none",
      fontFamily: "Product Sans",
    }}
    {...props}
  >
    {label || children}
  </Button>
);
