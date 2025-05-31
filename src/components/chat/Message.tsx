// src/components/chat/MessageItem.tsx
import React from 'react';
import { ChatMessage } from '../../interfaces/chat';

interface MessageItemProps {
  message: ChatMessage;
  currentUsername: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${
          isUser
            ? 'bg-red-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <div className="font-bold text-xs mb-1">{message.username}</div>
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'} text-right`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;