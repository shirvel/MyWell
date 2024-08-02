import { Typography } from "@mui/material";
import React from "react";
import './sharedStyles.css';

interface StyledHeadingProps {
    text: string;
}

export const StyledHeading: React.FC<StyledHeadingProps> = ({ text }) => {
    return (
        <Typography variant="h5" gutterBottom className="heading">
            {text}
        </Typography>
    );
};
