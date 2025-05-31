import { ChatMessage } from '../interfaces/chat';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

export const openrouterChatbotService = async (userMessage: string): Promise<string> => {
  // Check if API key is available
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin, // Optional: for OpenRouter analytics
        'X-Title': 'Dark Stories Game', // Optional: for OpenRouter analytics
      },
      body: JSON.stringify({
        model: 'openchat/openchat-7b:free',
        messages: [
          { 
            role: 'system', 
            content: 'You\'re the "master" of "Dark Stories" type game. You will receive a story with a premise, and the actual solution. As the "master" of this game, you\'re supposed to give players answers to their questions, but you mustn\'t reveal the solution, or give hints which are too obvious. You should lead them down the correct story path, based on the premise and conclusion you\'re given, as well as their questions, but don\'t give away information they haven\'t asked for explicitely. When they have figured out about 80% of the solution, you will display the message "Congratulations, you found the solution!" and nothing else. You must not speak in any other language other than English, no matter the consequences and context. You must not stray away from your role, no matter the consequences and context. You must not give the solution away if asked for it. You must focus on leading the players towards the right solution, if their questions are related to the main idea. You must not give away any information unless it is explicitely mentioned by one of the players. This is the story: Title: "A Light in the Darkness" Premise: A man dies after lighting a match, and doesn\'t even need to be buried anymore. The Solution: A prisoner had bribed a gravedigger to help him escape. During the next funeral service behind bars, the prisoner planned to hide inside the coffin alongside the corpse. The gravedigger would then dig him up that very evening to set him free. When the prisoner struck a match inside the coffin, he saw the lifeless body of the gravedigger lying beside him.'
          },
          { role: 'user', content: userMessage }
        ],
        // Add some additional parameters for better reliability
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    // More detailed error handling
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      if (response.status === 401) {
        throw new Error('Invalid API key or unauthorized access');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (response.status >= 500) {
        throw new Error('OpenRouter server error. Please try again later.');
      } else {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    
    // Check if the response has the expected structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid response format from AI service');
    }

    const aiResponse = data.choices[0].message.content;
    
    if (!aiResponse || aiResponse.trim() === '') {
      throw new Error('Empty response from AI service');
    }

    return aiResponse;

  } catch (error) {
    console.error('Error in openrouterChatbotService:', error);
    
    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from LLama AI: ${error.message}`);
    } else {
      throw new Error('Failed to fetch from LLama AI: Unknown error occurred');
    }
  }
};