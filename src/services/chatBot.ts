import { ChatMessage } from '../interfaces/chat';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

export const openrouterChatbotService = async (userMessage: string): Promise<string> => {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3-8b-instruct',
      messages: [
        { role: 'system', content: 'You are the "master" of a mystery murder game. You will know the prompt of the story, players will send you messages and you should respond only with "Yes/No" to their questions (or if they ask a question which cannot be answered with yes or no, you can say: "That is not a yes or no question".'},
        { role: 'user', content: userMessage }
      ]
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from LLama AI');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Nu am primit răspuns de la LLama AI.";
};