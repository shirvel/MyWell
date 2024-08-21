import React, { FC } from 'react';
import { Avatar, Button, Box } from '@mui/material';

interface UserImageSectionProps {
    imageUrl: string | undefined; 
    setUserImage?: any;
}

const UserImageSection: FC<UserImageSectionProps> = ({ imageUrl, setUserImage }) => {

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result;
                setUserImage(result ? result : "", file ? file : undefined);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'flex-start', 
                height: '100%',
                paddingTop: '20px', // Padding to move avatar higher
            }}
        >
            <Avatar 
                alt="User Image" 
                src={imageUrl} 
                sx={{ 
                    width: '300px',  // Size of the avatar
                    height: '300px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                }} 
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}> {/* Increased marginTop */}
                <Button 
                    variant="contained" 
                    component="label"
                    sx={{ 
                        width: '50%', 
                        textAlign: 'center',
                    }} 
                >
                    Upload New Image
                    <input 
                        type="file" 
                        hidden 
                        onChange={handleImageUpload}
                    />
                </Button>
            </Box>
        </Box>
    );
};

export default UserImageSection;
