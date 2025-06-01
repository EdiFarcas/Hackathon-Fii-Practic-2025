// src/components/chat/MessageInput.tsx
import React, { ChangeEvent, KeyboardEvent } from 'react';

interface MessageInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = 'Type a message...',
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={onSend}
        className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;