import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";

const fetchBatchMealImages = async (
    mealsToFetch: string[], // Define the type as an array of strings
    cachedImages: Record<string, string>, // Define the type as a record with string keys and string values
    apiKey: string // Define the type as a string
): Promise<void> => { // Return type is Promise<void>
    // Split the meals into two smaller batches
    const halfIndex = Math.ceil(mealsToFetch.length / 2);
    const firstBatch = mealsToFetch.slice(0, halfIndex);
    const secondBatch = mealsToFetch.slice(halfIndex);

    const fetchImages = async (batch: string[]) => { // Define the type as an array of strings
        try {
            const response = await axios.get(``, {
                params: {
                    query: batch.join(','),
                    number: batch.length,
                    apiKey: '', // Use the provided API key
                },
            });

            response.data.results.forEach((result: { title: string; image: string }) => {
                cachedImages[result.title] = result.image; // Assuming the meal title is accurate
            });

            // Cache the fetched images
            localStorage.setItem('mealImages', JSON.stringify(cachedImages));
        } catch (error) {
            console.error("Error fetching meal images", error);
        }
    };

    await fetchImages(firstBatch);
    await fetchImages(secondBatch);
};


const MealWithImage = ({ mealName }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchMealImage = async () => {
            // Check if the image URL is cached
            const cachedImages = JSON.parse(localStorage.getItem('mealImages') || '{}');

            if (cachedImages[mealName]) {
                setImageUrl(cachedImages[mealName]);
            } else {
                const mealsToFetch = [mealName]; // You could expand this array to include more meals
                await fetchBatchMealImages(mealsToFetch, cachedImages, ''); // Replace with your actual Spoonacular API key

                // Set the image URL from the cache
                if (cachedImages[mealName]) {
                    setImageUrl(cachedImages[mealName]);
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
            // Removed the boxShadow and backgroundColor to avoid double white box
            // boxShadow: 'none',
            // backgroundColor: 'transparent',
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
