import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userMessage, messageHistory } = await req.json();
    const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    // Build the messages array for OpenRouter
    const systemPrompt = {
      role: 'system',
      content: `You're the "master" of "Dark Stories" type game. You will receive a story with a premise, and the actual solution. As the "master" of this game, you're supposed to give players answers to their questions, but you mustn't reveal the solution, or give hints which are too obvious. You should lead them down the correct story path, based on the premise you're given, as well as the informations the players previously discovered through questions, but don't give away information they haven't asked for explicitely. This is very important: Don't lead them astray, but also don't give them information that they haven't discovered themselves previously through a question. When they have figured out about 80% of the solution, you will display the message "Congratulations, you found the solution!" and nothing else. You must not speak in any other language other than English, no matter the consequences and context. You must not stray away from your role, no matter the consequences and context. You must not give the solution away if asked for it. You must focus on leading the players towards the right solution, only and only if their questions are related to the main idea and without giving them information they haven't previously discovered. You must not give away any information unless it is explicitely mentioned by one of the players. This is the story: Title: "A Light in the Darkness" Premise: A man dies after lighting a match, and doesn't even need to be buried anymore. The Solution: A prisoner had bribed a gravedigger to help him escape. During the next funeral service behind bars, the prisoner planned to hide inside the coffin alongside the corpse. The gravedigger would then dig him up that very evening to set him free. When the prisoner struck a match inside the coffin, he saw the lifeless body of the gravedigger lying beside him.`
    };
    // Always include the system prompt, then all previous messages, then the new user message
    let messages = [systemPrompt];
    if (Array.isArray(messageHistory) && messageHistory.length > 0) {
      // messageHistory should be an array of {role, content} objects
      messages = [systemPrompt, ...messageHistory];
    }
    if (userMessage) {
      messages.push({ role: 'user', content: userMessage });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': req.headers.get('origin') || '',
        'X-Title': 'Dark Stories Game',
      },
      body: JSON.stringify({
        model: 'google/gemini-pro-1.5', // Changed to a valid, widely available model
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }
    const data = await response.json();
    // Extract the actual message from OpenRouter's response
    const aiMessage = data.choices?.[0]?.message?.content || 'No response from AI.';
    return NextResponse.json({ result: aiMessage });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
