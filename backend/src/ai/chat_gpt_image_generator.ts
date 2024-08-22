import axios from 'axios';
import ImageModel from '../models/ImageModel'; // Import your MongoDB model

// In-memory cache object
const imageCache = {};
// Function to retrieve an image from MongoDB
const getImageFromMongoDB = async (prompt) => {
  try {
    const existingImage = await ImageModel.findOne({ prompt });
    if (existingImage) {
      console.log(`MongoDB hit for prompt: ${prompt}`);
      const cachedImage = `data:${existingImage.contentType};base64,${existingImage.imageData.toString('base64')}`;
      return cachedImage;
    }
    return null;
  } catch (mongoError) {
    console.error('Error querying MongoDB:', mongoError);
    return null;
  }
};

export const generateImage = async (prompt, retries = 5) => {
  if (!prompt) {
    console.error('Prompt is null or undefined');
    return null;
  }

  console.log(`Received prompt: ${prompt}`);

  // Check if the image is already in the cache
  if (imageCache[prompt]) {
    console.log(`Cache hit for prompt: ${prompt}`);
    return imageCache[prompt];
  }

  // Check if the image exists in MongoDB
  const mongoImage = await getImageFromMongoDB(prompt);
  if (mongoImage) {
    imageCache[prompt] = mongoImage; // Cache it in-memory
    return mongoImage;
  }

  console.log(`Cache miss for prompt: ${prompt}, generating image...`);
  let delay = 1000; // Initial delay of 1 second

  for (let attempt = 0; attempt < retries; attempt++) {
    console.log(`Attempt ${attempt + 1} for generating image with prompt: ${prompt}`);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: `An image of ${prompt}`,
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_ORG_ID}`,
          },
        }
      );

      if (response.data && response.data.data && response.data.data.length > 0) {
        const imageUrl = response.data.data[0].url;

        // Fetch the image data
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        const contentType = imageResponse.headers['content-type'];

        // Before saving, check again if the image exists in MongoDB (race condition prevention)
        const existingImage = await ImageModel.findOne({ prompt });
        if (!existingImage) {
          try {
            const newImage = new ImageModel({ prompt, imageUrl, imageData: imageBuffer, contentType });
            await newImage.save();
            console.log(`Image saved to MongoDB for prompt: ${prompt}`);
          } catch (mongoError) {
            console.error('Error saving image to MongoDB:', mongoError);
            if (mongoError.code === 11000) {
              console.warn(`Duplicate key error for prompt: ${prompt}, another request likely handled this.`);
            } else {
              return null; // Returning null to ensure that errors are handled upstream.
            }
          }
        } else {
          console.log(`Image already exists in MongoDB for prompt: ${prompt}, not saving again.`);
        }

        // Convert the image to a base64 data URL for caching
        const dataUrl = `data:${contentType};base64,${imageBuffer.toString('base64')}`;
        imageCache[prompt] = dataUrl;

        console.log(`Cache and MongoDB set for prompt: ${prompt}`);
        return dataUrl;
      } else {
        console.warn('No image generated in the response:', response.data);
        return null;
      }
    } catch (error) {
      console.error(`Error on attempt ${attempt + 1}:`, error.message);

      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        const retryDelay = retryAfter ? parseInt(retryAfter, 10) * 1000 : delay;

        console.warn(`Rate limit hit, retrying after ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));

        delay *= 2; // Exponential backoff
      } else {
        console.error('Unexpected error generating image:', error);
        return null;
      }
    }
  }
  console.error('Exceeded maximum retries, returning null');
  return null;
};

export default generateImage;
