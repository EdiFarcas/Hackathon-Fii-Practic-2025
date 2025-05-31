// src/components/chat/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../interfaces/chat';
import MessageItem from './Message';

interface MessageListProps {
  messages: ChatMessage[];
  currentUsername: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUsername }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} currentUsername={currentUsername} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;