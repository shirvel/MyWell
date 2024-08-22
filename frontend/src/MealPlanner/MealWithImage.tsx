import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import axios from 'axios';
import { openDB } from 'idb';

const DB_NAME = 'MealImageDB';
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

// Component to fetch and display the meal image
const MealWithImage: React.FC<{ mealName: string }> = ({ mealName }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMealImage = async () => {
      try {
        // First, try to get the image from IndexedDB
        const storedImage = await getImageFromIndexedDB(mealName);
        if (storedImage) {
          setImageUrl(storedImage.imageUrl);
          console.log('Loaded image from IndexedDB');
          return;
        }

        // If not in IndexedDB, fetch from the backend
        const response = await axios.post('http://localhost:3000/generate/generate-image', { prompt: mealName });
        if (response.status === 200 && response.data.imageUrl) {
          setImageUrl(response.data.imageUrl);

          // Save the fetched image to IndexedDB for future use
          await saveImageToIndexedDB(mealName, response.data.imageUrl);
          console.log('Fetched image from backend and saved to IndexedDB');
        } else {
          console.error('No image URL returned by the backend:', response.data);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
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
    }}>
      {imageUrl ? (
        <img src={imageUrl} alt={mealName} style={{ width: '80%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }} />
      ) : (
        <img src="/food-placeholder.png" alt="Placeholder" style={{ width: '80%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }} />
      )}
    </Box>
  );
};

export default MealWithImage;
