import { ChatMessage } from '../interfaces/chat';

// Remove direct OpenRouter API usage. Use your backend API route instead.

export const openrouterChatbotService = async (userMessage: string, messageHistory?: any[]): Promise<string> => {
  try {
    // Prepare the payload for your backend API
    const payload: any = { userMessage };
    if (messageHistory) payload.messageHistory = messageHistory;

    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

  if (response.status === 429) {
    throw new Error('You are sending messages too quickly or have reached the free tier limit. Please wait a minute and try again.');
  }
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    if (data.result && typeof data.result === 'string') {
      return data.result;
    } else if (data.error) {
      throw new Error(`Chatbot API error: ${data.error}`);
    } else {
      throw new Error('Invalid response from chatbot API');
    }
  } catch (error) {
    console.error('Error in openrouterChatbotService:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from AI: ${error.message}`);
    } else {
      throw new Error('Failed to fetch from AI: Unknown error occurred');
    }
  }
};