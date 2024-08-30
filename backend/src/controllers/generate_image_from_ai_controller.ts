import { generateImage } from '../ai/chat_gpt_image_generator';

export const generateImageController = async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log('Received request with prompt:', prompt);

    if (!prompt) {
      console.warn('No prompt provided in the request');
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Calling generateImage with prompt:', prompt);

    const imageUrl = await generateImage(prompt);

    if (!imageUrl) {
      console.warn('No image URL returned for prompt:', prompt);
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    // console.log('Image generated successfully:', imageUrl);
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'An error occurred while generating the image.' });
  }
};

export default { generateImageController };
