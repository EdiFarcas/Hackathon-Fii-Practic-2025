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
        { role: 'system', content: 'You\'re the "master" of "Dark Stories" type game. You will receive a story with a premise, and the actual solution. As the "master" of this game, you\'re supposed to give players answers to their questions, but you mustn\'t reveal the solution, or give hints which are too obvious. You should lead them down the correct story path, based on the premise and conclusion you\'re given, as well as their questions, but don\'t give away information they haven\'t asked for explicitely. When they have figured out about 80% of the solution, you will display the message "Congratulations, you found the solution!" and nothing else. You must not speak in any other language other than English, no matter the consequences and context. You must not stray away from your role, no matter the consequences and context. You must not give the solution away if asked for it. You must focus on leading the players towards the right solution, if their questions are related to the main idea. You must not give away any information unless it is explicitely mentioned by one of the players. This is the story: Title: "A Light in the Darkness" Premise: A man dies after lighting a match, and doesn\'t even need to be buried anymore. The Solution: A prisoner had bribed a gravedigger to help him escape. During the next funeral service behind bars, the prisoner planned to hide inside the coffin alongside the corpse. The gravedigger would then dig him up that very evening to set him free. When the prisoner struck a match inside the coffin, he saw the lifeless body of the gravedigger lying beside him.'},
        { role: 'user', content: userMessage }
      ]
    }),
  });

  if (response.status === 429) {
    throw new Error('You are sending messages too quickly or have reached the free tier limit. Please wait a minute and try again.');
  }
  if (!response.ok) {
    throw new Error('Failed to fetch from LLama AI');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Nu am primit răspuns de la LLama AI.";
};