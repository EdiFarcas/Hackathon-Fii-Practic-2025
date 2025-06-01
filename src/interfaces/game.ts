export interface User {
  id: string;
  name: string;
  isHost: boolean;
}

export interface ChatMessage {
  id: number;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: 'user' | 'bot' | 'system';
}

export interface GameState {
  id: string;
  title: string;
  maxPlayers: number;
  users: User[];
  chatMessages: ChatMessage[];
  currentCard: number;
  currentTurn: number;
  status: 'WAITING' | 'PLAYING' | 'FINISHED';
}

export interface JoinGameResponse {
  error?: string;
  success?: boolean;
  gameState?: GameState;
  userInfo?: User;
}
