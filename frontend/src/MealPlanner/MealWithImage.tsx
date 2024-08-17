import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";

const MealWithImage = ({ mealName }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchMealImage = async () => {
            // Check if the image URL is cached
            const cachedImages = JSON.parse(localStorage.getItem('mealImages') || '{}');

            if (cachedImages[mealName]) {
                setImageUrl(cachedImages[mealName]);
            } else {
                try {
                    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                        params: {
                            query: mealName,
                            number: 1,
                            apiKey: '', // Replace with your actual Spoonacular API key
                        },
                    });

                    if (response.data.results.length > 0) {
                        const imageUrl = response.data.results[0].image;
                        setImageUrl(imageUrl);

                        // Cache the image URL
                        cachedImages[mealName] = imageUrl;
                        localStorage.setItem('mealImages', JSON.stringify(cachedImages));
                    }
                } catch (error) {
                    console.error("Error fetching meal image", error);
                }
            }
        };

        fetchMealImage();
    }, [mealName]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
        }}>
            {imageUrl ? (
                <img src={imageUrl} alt={mealName} style={{ width: '100%', borderRadius: '8px' }} />
            ) : (
                <img src="/path-to-placeholder-image.jpg" alt="Placeholder" style={{ width: '100%', borderRadius: '8px' }} />
            )}
            <Typography variant="h6" align="center" style={{ marginTop: '10px' }}>
                {mealName}
            </Typography>
        </Box>
    );
};

export default MealWithImage;
