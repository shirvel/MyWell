import React from 'react';
import Typography from '@mui/material/Typography';

interface CustomTypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  gutterBottom?: boolean;
  style?: React.CSSProperties;  // Allow custom styles
}

export const CustomTypography: React.FC<CustomTypographyProps> = ({ children, style, variant = 'h5', gutterBottom = false}) => (
  <Typography
    variant={variant}
    gutterBottom={gutterBottom}
    style={{ 
        fontWeight: 'bold', 
        marginTop: '10px', 
        fontFamily: 'Product Sans', 
        fontSize: '30px', 
        ...style }}
  >
    {children}
  </Typography>
);
