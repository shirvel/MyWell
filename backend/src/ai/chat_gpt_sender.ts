import axios from 'axios';

const sendMessageToChatGPT = async (message) => {
  const newMessage = {
    role: 'user',
    content: message,
  };

  try {
    const response = await makeRequestWithRetry([newMessage]);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw new Error('An error occurred while fetching the response.');
  }
};

const makeRequestWithRetry = async (messages, retries = 5) => {
  const apiKey = process.env.REACT_APP_OPENAI_ORG_ID;

  let delay = 1000; // initial delay of 1 second
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      console.log('Attempting to make request to OpenAI...');
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          messages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Organization': 'org-5Uoqt7lAqpj6y5h1ZcD4AjFj', // Ensure this is correct or remove if unnecessary
          },
        }
      );
      return result;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // If rate limited, wait and retry
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        // If another error, rethrow it
        throw error;
      }
    }
  }
  throw new Error('Exceeded maximum retries');
};

export default sendMessageToChatGPT;
