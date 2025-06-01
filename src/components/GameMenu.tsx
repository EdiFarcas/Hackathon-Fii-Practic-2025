// components/GameMenu.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { useGesture } from '@use-gesture/react';
import ChatWindow from './chat/ChatWindow';
import GameCard from './GameCard';
import type { User, ChatMessage, GameState, JoinGameResponse } from '../interfaces/game';

const GameMenu: React.FC = () => {
  const { data: session } = useSession();
  const [currentTurn, setCurrentTurn] = useState(5);
  const [screenWidth, setScreenWidth] = useState(1280); // Default desktop
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId');

  const cards = [
    { id: 1, title: "TITLU 1", description: "Povestea începe aici...", difficulty: "Easy" },
    { id: 2, title: "TITLU 2", description: "O nouă aventură se dezvăluie", difficulty: "Medium" },
    { id: 3, title: "TITLU 3", description: "Misterul se adâncește", difficulty: "Hard" },
    { id: 4, title: "TITLU 4", description: "Provocări neașteptate apar", difficulty: "Medium" },
    { id: 5, title: "TITLU 5", description: "Secretele ies la iveală", difficulty: "Hard" },
    { id: 6, title: "TITLU 6", description: "Finalul se apropie", difficulty: "Expert" },
    { id: 7, title: "TITLU 7", description: "Ultima încercare", difficulty: "Legendary" },
    { id: 8, title: "TITLU 8", description: "Epilog", difficulty: "Easy" },
  ];

  // On mount: connect to socket and join room by code from URL
  useEffect(() => {
    if (!gameId) return;

    const s = io('http://localhost:4000');
    setSocket(s);

    // Get user info from session or prompt for name
    const userName = session?.user?.name || prompt('Enter your name:');
    if (!userName) {
      setError('Name is required to join the game');
      return;
    }

    const user: User = {
      id: (session?.user as any)?.id || `temp-${Date.now()}`,
      name: userName,
      isHost: false
    };

    // Join game room
    s.emit('join-game', { gameId, user }, (response: JoinGameResponse) => {
      if (response.error) {
        setError(response.error);
      } else if (response.gameState && response.userInfo) {
        setGameState(response.gameState);
        setUserInfo(response.userInfo);
        setChatMessages(response.gameState.chatMessages || []);
      }
    });

    // Listen for room updates
    s.on('room-update', ({ users, chatMessages }: { users: User[], chatMessages: ChatMessage[] }) => {
      setGameState(prev => prev ? {
        ...prev,
        users,
        chatMessages
      } : null);
      setChatMessages(chatMessages);
    });

    // Listen for new chat messages
    s.on('chat-update', (message: ChatMessage) => {
      setChatMessages(prev => [...prev, message]);
    });

    // Listen for card/turn updates
    s.on('sync-card', (index: number) => {
      setCurrentCardIndex(index);
    });

    s.on('sync-turn', (turn: number) => {
      setCurrentTurn(turn);
    });

    return () => {
      s.disconnect();
    };
  }, [gameId, session]);

  // Send chat message
  const handleSendMessage = (message: string) => {
    if (!socket || !gameId) return;
    socket.emit('send-message', { gameId, message });
  };

  // Sync card navigation with all players
  const handleCardChange = (newIndex: number) => {
    setCurrentCardIndex(newIndex);
    if (socket && gameId) {
      socket.emit('sync-card', { code: gameId, index: newIndex });
    }
  };

  // Sync turn timer with all players (optional, demo)
  useEffect(() => {
    if (socket && gameId) {
      socket.emit('sync-turn', { code: gameId, turn: currentTurn });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTurn]);

  // Simplified gesture configuration - try this approach
  // Modify the gesture configuration
  const bind = useGesture({
    onDrag: ({ movement: [mx], cancel }) => {
      // If dragging left and not at last card
      if (mx < -20 && currentCardIndex < cards.length - 1) {
        handleCardChange(currentCardIndex + 1);
        cancel();
      }
      // If dragging right and not at first card
      else if (mx > 20 && currentCardIndex > 0) {
        handleCardChange(currentCardIndex - 1);
        cancel();
      }
    }
  }, {
    drag: {
      delay: 0,
      filterTaps: true,
      threshold: 5,
      bounds: { left: -20, right: 20 }, // Limits drag distance
      rubberband: true // Adds resistance at bounds
    }
  });

  // Hook pentru a detecta dimensiunea ecranului
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial width
    setScreenWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Funcție pentru a calcula dimensiunile grid-ului bazat pe lățimea ecranului
  const getGridDimensions = () => {
    if (screenWidth < 640) {
      return { colSize: '35px', rowSize: '35px' }; // Mobile
    } else if (screenWidth < 768) {
      return { colSize: '45px', rowSize: '40px' }; // Large mobile
    } else if (screenWidth < 1024) {
      return { colSize: '55px', rowSize: '45px' }; // Tablet
    } else if (screenWidth < 1280) {
      return { colSize: '65px', rowSize: '50px' }; // Small desktop
    } else {
      return { colSize: '75px', rowSize: '55px' }; // Large desktop
    }
  };

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic
  useEffect(() => {
    if (currentTurn <= 0) return;
    timerRef.current = setInterval(() => {
      setCurrentTurn((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentTurn]);

  // Aici vei adăuga mai târziu clasa cu informațiile jocului
  const gameData = {
    players: ['Ariel', 'Marcel', 'Victoria'],
    master: '...',
    story: 'Poza'
  };

  return (
    <div 
      className="h-screen p-1 sm:p-2 overflow-hidden bg-gradient-to-br from-gray-900 to-black"
      style={{
        backgroundImage: "url('/bggame.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full h-full">
        <div 
          className="grid gap-1 sm:gap-2 mx-auto w-full h-full"
          style={{
            gridTemplateColumns: 'repeat(25, 1fr)',
            gridTemplateRows: 'repeat(25, 1fr)',
          }}
        >
          {/* Card Players - Responsive cu poziție adaptivă */}
          <div 
            className="text-xs p-1 sm:p-2"
            style={{
              gridColumn: '2 / 6',
              gridRow: '2 / 8'
            }}
          >
            <GameCard title="Players" className="h-full text-xs sm:text-sm">
              <ul className="space-y-1 text-xs">
                {gameState?.users.map((player, index) => (
                  <li key={index} className="text-white truncate">{player.name}</li>
                ))}
              </ul>
            </GameCard>
          </div>

          {/* Card Turn Info - MUTAT în stânga sus */}
          <div 
            className="text-xs p-1 sm:p-2"
            style={{
              gridColumn: '12 / 15',    // Coloanele 1-4
              gridRow: '1 / 4'        // Liniile 1-2
            }}
          >
            <GameCard title={`Your turn in ${currentTurn}...`} className="h-full">
              <div className="flex items-center justify-center h-full">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm">😊</span>
                </div>
              </div>
            </GameCard>
          </div>

          {/* Card Titlu - SIMPLIFIED drag implementation */}
          <div 
            className="text-xs p-1 sm:p-2"
            style={{
              gridColumn: '18 / 25',
              gridRow: '3 / 23',
            }}
          >
            <div 
              className="h-full cursor-grab active:cursor-grabbing select-none"
              {...bind()}
              onMouseDown={(e) => {
                console.log('Mouse down on card');
                e.preventDefault();
              }}
              style={{
                touchAction: 'none', // Disable all default touch behaviors
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                WebkitTouchCallout: 'none',
              }}
            >
              <GameCard title={cards[currentCardIndex].title} className="h-full pointer-events-none">
                <div className="mb-2 pointer-events-none">
                  <p className="text-gray-200 mb-1 text-xs pointer-events-none">{cards[currentCardIndex].description}</p>
                  <div className="space-y-1 pointer-events-none">
                    <div className="h-1 bg-gray-100 rounded pointer-events-none"></div>
                    <div className="h-1 bg-gray-100 rounded w-3/4 pointer-events-none"></div>
                    <div className="h-1 bg-gray-100 rounded w-1/2 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="mb-2 pointer-events-none">
                  <p className="text-gray-200 text-xs pointer-events-none">Difficulty: {cards[currentCardIndex].difficulty}</p>
                </div>

                <div className="bg-gray-700/50 border-gray-600 rounded-lg p-2 flex-1 flex items-center justify-center pointer-events-none">
                  <span className="text-gray-200 text-xs pointer-events-none">{gameData.story}</span>
                </div>

                {/* Card indicator dots */}
                <div className="flex justify-center mt-2 space-x-1 pointer-events-none">
                  {cards.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors pointer-events-none ${
                        index === currentCardIndex ? 'bg-blue-400' : 'bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation hints */}
                <div className="flex justify-between items-center mt-2 text-xs text-gray-400 pointer-events-none">
                  <span className={`pointer-events-none ${currentCardIndex > 0 ? 'visible' : 'invisible'}`}>
                    ← Drag
                  </span>
                  <span className="text-center pointer-events-none">
                    {currentCardIndex + 1} / {cards.length}
                  </span>
                  <span className={`pointer-events-none ${currentCardIndex < cards.length - 1 ? 'visible' : 'invisible'}`}>
                    Drag →
                  </span>
                </div>
              </GameCard>
            </div>
          </div>

          {/* Card Questions - MUTAT în partea de jos stânga */}
          <div 
            className="text-xs p-1 sm:p-2"
            style={{
              gridColumn: '2 / 9',    // Coloanele 1-11
              gridRow: '16 / 22'      // Liniile 20-25 (jos)
            }}
          >
            <GameCard title="Bonuses" className="h-full">
              <div className="space-y-1 text-xs">
                <p><strong>Hint Question:</strong> 50 coins</p>
                <p><strong>x2 Questions:</strong> 70 coins</p>
              </div>
            </GameCard>
          </div>

          {/* Card Master/Players info - Centru jos */}
          <div 
            className="text-xs p-1 sm:p-2"
            style={{
              gridColumn: '10 / 17',
              gridRow: '5 / 24',
              position: 'relative',
              height: '100%',
              width: '100%'
            }}
          >
            <ChatWindow 
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              userInfo={userInfo}
              gameState={gameState}
              error={error}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameMenu;