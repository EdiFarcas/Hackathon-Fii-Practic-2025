// src/components/chat/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../../interfaces/game';

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId?: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessageStyle = (message: ChatMessage) => {
    switch (message.type) {
      case 'bot':
        return 'bg-purple-700 text-white';
      case 'system':
        return 'bg-gray-500 text-white';
      default:
        return message.userId === currentUserId
          ? 'bg-red-700 text-white'
          : 'bg-gray-700 text-gray-200';
    }
  };

  const getMessageAlignment = (message: ChatMessage) => {
    if (message.type === 'system') return 'justify-center';
    return message.userId === currentUserId ? 'justify-end' : 'justify-start';
  };

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${getMessageAlignment(msg)}`}
        >
          <div
            className={`rounded-lg px-4 py-2 max-w-[80%] ${getMessageStyle(msg)}`}
          >
            <div className="text-sm opacity-75 mb-1">
              {msg.type === 'system' ? '🔧' : msg.userId === currentUserId ? 'You' : msg.userName}
            </div>
            <div>{msg.message}</div>
            <div className="text-xs opacity-50 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;