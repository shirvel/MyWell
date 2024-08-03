import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CustomCardProps {
  label: string;
  description?: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
}

export const CustomCard: React.FC<CustomCardProps> = ({ label, description, emoji, selected, onClick }) => (
  <Card
    variant="outlined"
    style={{
      marginBottom: '10px',
      cursor: 'pointer',
      transition: 'border-color 0.3s',
      borderRadius: '25px',
      boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
      backgroundColor: selected ? '#4A90E2' : 'white',
    }}
    onClick={onClick}
  >
    <CardContent style={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Product Sans',
          color: selected ? 'white' : 'black',
          padding: '8px',
          fontWeight: selected ? 'bold' : 'normal'
        }}
      >
        {emoji && `${emoji} `}{label}
      </Typography>
      {description && (
        <Typography 
            variant="body2" 
            color="textSecondary" 
            style={{ 
                fontFamily: 'Product Sans', 
                color: selected ? 'white' : 'black' }}>
          {description}
        </Typography>
      )}
    </CardContent>
  </Card>
);
