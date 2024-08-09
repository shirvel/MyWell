import React, { FC } from 'react';
import { Avatar, Button } from '@mui/material';

interface UserImageSectionProps {
    imageUrl: string | undefined; 
    setUserImage?: any
}

const UserImageSection: FC<UserImageSectionProps> = ({imageUrl, setUserImage}) => {

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
        <>
            <Avatar 
                alt="User Image" 
                src={imageUrl} 
                sx={{ width: '100%', height: '70vh' }} 
            />
            <Button 
                variant="contained" 
                component="label"
                sx={{ mt: 4, width: '40%' }}
            >
                Upload New Image
                <input 
                    type="file" 
                    hidden 
                    onChange={handleImageUpload}
                />
            </Button>
        </>
    );
};

export default UserImageSection;