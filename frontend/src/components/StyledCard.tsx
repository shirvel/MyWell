import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import './sharedStyles.css';

interface StyledCardProps {
    label: string;
    description?: string;
    selected: boolean;
    onClick: () => void;
}

export const StyledCard: React.FC<StyledCardProps> = ({ label, description, selected, onClick }) => {
    return (
        <Card
            variant="outlined"
            onClick={onClick}
            className={`card ${selected ? 'cardSelected' : 'cardUnselected'}`}
        >
            <CardContent>
                <Typography variant="h6">{label}</Typography>
                {description && <Typography variant="body2">{description}</Typography>}
            </CardContent>
        </Card>
    );
};
