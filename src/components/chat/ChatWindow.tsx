import React, { useState } from 'react';
import type { User, ChatMessage, GameState } from '../../interfaces/game';
import MessageList from './MessageList';
import type { ChatMessage as LegacyChatMessage } from '../../interfaces/chat';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  userInfo: User | null;
  gameState: GameState | null;
  error: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  onSendMessage, 
  userInfo, 
  gameState, 
  error 
}) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-800/50 rounded-lg border border-red-900/30">
      <div className="p-4 border-b border-red-900/30">
        <h3 className="text-xl font-semibold text-red-300">Game Chat</h3>
        {userInfo && (
          <p className="text-sm text-gray-400">
            Playing as: {userInfo.name} {userInfo.isHost ? '(Host)' : ''}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} currentUserId={userInfo?.id} />
        {error && (
          <div className="bg-red-500/20 text-red-200 p-2 rounded mb-2">
            {error}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-red-900/30">
        <MessageInput 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onSend={handleSendMessage}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default ChatWindow;