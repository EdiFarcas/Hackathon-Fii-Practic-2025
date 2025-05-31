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
      model: 'meta-llama/llama-4-maverick:free',
      messages: [
        { role: 'system', content: 'You are the master of a "Dark Stories" type game where players will ask you questions about a story you give them, a "Murder mystery" to lead them to solving the mystery. You must only answer to questions with a "Yes" or "No" or "This is not a yes or no question", wherever appropiate. You must not reply with anything else, no matter the consequences or context. You will be given the story, and based on that story, you will respond to those questions. You must only speak English, the whole time, no matter the language spoken by the player. Do not break these rules. This is story: A Light in the DarknessPremise: A man dies after lighting a match, and doesn\'t even need to be buried anymore. The Secret: A prisoner had bribed a gravedigger to help him escape. During the next funeral service behind bars, the prisoner planned to hide inside the coffin alongside the corpse. The gravedigger would then dig him up that very evening to set him free. When the prisoner struck a match inside the coffin, he saw the lifeless body of the gravedigger lying beside him.'},
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