import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import axios from 'axios';
import { openDB } from 'idb';

// Define the database and store names
const DB_NAME = 'WorkoutImageDB';
const STORE_NAME = 'images';

// Define the type for the object stored in IndexedDB
interface StoredImage {
    prompt: string;
    imageUrl: string;
}

// Function to get the database
const getDb = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'prompt' });
            }
        }
    });
};

// Function to save an image to IndexedDB
const saveImageToIndexedDB = async (prompt: string, imageUrl: string) => {
    const db = await getDb();
    await db.put(STORE_NAME, { prompt, imageUrl });
};

// Function to get an image from IndexedDB
const getImageFromIndexedDB = async (prompt: string): Promise<StoredImage | undefined> => {
    const db = await getDb();
    return db.get(STORE_NAME, prompt);
};

// Component to fetch and display the workout image
const WorkoutWithImage: React.FC<{ workoutName: string }> = ({ workoutName }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkoutImage = async () => {
            // Check if workoutName is defined
            if (!workoutName) {
                console.error('Workout name is not defined.');
                return;
            }

            const prompt = `A professional and accurate fitness illustration of a person performing: ${workoutName}`;

            try {
                // First, try to get the image from IndexedDB
                const storedImage = await getImageFromIndexedDB(prompt);
                if (storedImage) {
                    setImageUrl(storedImage.imageUrl);
                    console.log('Loaded image from IndexedDB');
                    return;
                }

                // If not in IndexedDB, fetch from the backend
                const response = await axios.post('http://localhost:3000/generate/generate-image', { prompt });

                if (response.status === 200 && response.data.imageUrl) {
                    const fetchedImageUrl = response.data.imageUrl;
                    setImageUrl(fetchedImageUrl);

                    // Save the fetched image to IndexedDB for future use
                    await saveImageToIndexedDB(prompt, fetchedImageUrl);
                    console.log('Fetched image from backend and saved to IndexedDB');
                } else {
                    console.error('No image URL returned by the backend:', response.data);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchWorkoutImage();
    }, [workoutName]);

    return (
        <Box sx={{ margin: '8px' }}>
            {imageUrl ? (
                <img src={imageUrl} alt={workoutName} style={{ width: '80px', height: '80px', borderRadius: '8px' }} />
            ) : (
                <img src="/workout-placeholder.png" alt="Placeholder" style={{ width: '80px', height: '80px', borderRadius: '8px' }} />
            )}
        </Box>
    );
};

export default WorkoutWithImage;
