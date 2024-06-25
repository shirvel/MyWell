import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTComponent = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_OPENAI_ORG_ID;

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    const newMessage = {
      role: 'user',
      content: input,
    };

    const newConversation = [...conversation, newMessage];

    try {
      console.log('API Key:', apiKey);
      const response = await makeRequestWithRetry(newConversation);
      const botResponse = {
        role: 'assistant',
        content: response.data.choices[0].message.content,
      };

      setConversation([...newConversation, botResponse]);
      setInput('');
    } catch (error) {
      console.log('API Key:', apiKey);
      console.error('Error fetching response:', error);
      setError('An error occurred while fetching the response.');
    }
  };

  const makeRequestWithRetry = async (newConversation, retries = 5) => {
    let delay = 1000; // initial delay of 1 second
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        console.log('Attempting to make request to OpenAI...');
        const result = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: newConversation,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'OpenAI-Organization': "org-5Uoqt7lAqpj6y5h1ZcD4AjFj", // Ensure this is correct or remove if unnecessary
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

  return (
    <div>
      <h1>ChatGPT</h1>
      <textarea value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Conversation:</h2>
        {conversation.map((msg, index) => (
          <p key={index}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatGPTComponent;
