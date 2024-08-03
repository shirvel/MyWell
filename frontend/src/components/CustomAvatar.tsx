import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';

export const CustomAvatar: React.FC<AvatarProps> = (props) => {
  return (
    <Avatar
      {...props}
      sx={{
        width: 120,
        height: 120,
        cursor: 'pointer',
        borderRadius: '50%', // Make the avatar circular
        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
      }}
    />
  );
};
