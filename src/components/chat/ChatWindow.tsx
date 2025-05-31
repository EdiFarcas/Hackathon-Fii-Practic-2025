import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { ChatMessage } from '../../interfaces/chat';
import { openrouterChatbotService } from '../../services/chatBot';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow: React.FC = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Adaugă un mesaj inițial de la bot
  useEffect(() => {
    setMessages([
      {
        id: 'initial-bot-message',
        text: 'Salut! Sunt Chatbot-ul tău. Cum te pot ajuta?',
        sender: 'bot',
        username: 'Master',
        timestamp: new Date(),
      },
    ]);
  }, []);
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user?.name) {
    return <div className="p-8 text-center">Te rugăm să te autentifici pentru a folosi chatul.</div>;
  }
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user?.name) {
    return <div className="p-8 text-center">Te rugăm să te autentifici pentru a folosi chatul.</div>;
  }

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      username: session.user?.name || 'User',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsBotTyping(true);

    try {
      const botResponseText = await openrouterChatbotService(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        sender: 'bot',
        username: 'Master',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error getting response from bot:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: "Oops, a apărut o eroare la comunicarea cu bot-ul.",
        sender: 'bot',
        username: 'Error',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border border-gray-300 shadow-lg">
      <header className="p-4 bg-blue-600 text-white text-center">
        <h1 className="text-xl font-semibold">Chat cu Bot</h1>
      </header>
      <MessageList messages={messages} currentUsername={session.user.name} />
      {isBotTyping && <div className="p-2 text-sm text-gray-500 italic text-center">Bot-ul scrie...</div>}
      <MessageInput onSendMessage={handleSendMessage} isSending={isBotTyping} />
    </div>
  );
};

export default ChatWindow;