// src/components/chat/MessageInput.tsx
import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
  isSending: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isSending }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isSending) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };  return (    <form onSubmit={handleSubmit} className="p-4 border-t-3 border-red-600/70 bg-neutral-600/40 backdrop-blur-md flex">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Write a message..."
        className="flex-grow p-2 border-3 border-red-600/70 rounded-l-md bg-neutral-500/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 backdrop-blur-sm"
        disabled={isSending}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded-r-md text-white backdrop-blur-sm border-3 border-red-600/70 border-l-0 ${
          isSending ? 'bg-gray-600/50 cursor-not-allowed' : 'bg-red-600/70 hover:bg-red-700/70'
        }`}
        disabled={isSending}
      >
        {isSending ? 'Trimit...' : 'Trimite'}
      </button>
    </form>
  );
};

export default MessageInput;