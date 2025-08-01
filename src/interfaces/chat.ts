export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  username: string;
  timestamp: Date;
}