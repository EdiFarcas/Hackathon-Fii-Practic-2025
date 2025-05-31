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
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300 bg-white flex">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Scrie un mesaj..."
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
        disabled={isSending}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded-r-md text-white ${
          isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={isSending}
      >
        {isSending ? 'Trimit...' : 'Trimite'}
      </button>
    </form>
  );
};

export default MessageInput;