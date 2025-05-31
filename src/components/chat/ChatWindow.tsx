import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { ChatMessage } from '../../interfaces/chat';
import { openrouterChatbotService } from '../../services/chatBot';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useRouter } from "next/navigation";

const ChatWindow: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  // Adaugă un mesaj inițial de la bot
  useEffect(() => {
    setMessages([
      {
        id: 'initial-bot-message',
        text: 'Hello! I am your Master. Ask me a Yes/No question about the story, and I will answer you.',
        sender: 'bot',
        username: 'Master',
        timestamp: new Date(),
      },
    ]);
  }, []);
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  const handleSendMessage = async (text: string) => {
    const username = session?.user?.name || 'User';
    console.log('Current user:', username); // Debug log
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      username: username,
      timestamp: new Date(),
    };
    // Adaugă mesajul userului la istoric
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsBotTyping(true);

    try {
      // Transformă istoricul în formatul cerut de OpenRouter
      const messageHistory = [...messages, userMessage].map((msg) => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text,
      }));
      const botResponseText = await openrouterChatbotService(text, messageHistory);
      
      if (botResponseText.includes("Congratulations, you found the solution!")) {
        setShowWinModal(true);
      }
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
        text: "Oops, there was an error while chatting with AI.",
        sender: 'bot',
        username: 'Error',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };  return (    <div 
      className="flex flex-col border-3 border-red-600/70 shadow-lg h-full bg-neutral-600/40 backdrop-blur-sm"
      style={{
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        zIndex: 40,
      }}
  >      <header className="p-4 bg-red-600/70 backdrop-blur-sm text-white text-center">
        <h1 className="text-xl font-semibold">Master's hints</h1>
      </header>
      <MessageList messages={messages} currentUsername={session?.user?.name || 'User'} />
      {isBotTyping && <div className="p-2 text-sm text-gray-500 italic text-center">The Master is answearing...</div>}
      <MessageInput onSendMessage={handleSendMessage} isSending={isBotTyping} />

      {/* Modal de câștig */}
      {showWinModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-700">🎉 Congratulations! 🎉</h2>
            <p className="mb-4 text-gray-800">You have solved the mystery!</p>
            <button
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => router.push("/")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;