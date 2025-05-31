// components/GameMenu.tsx
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import GameCard from './GameCard';
import Chatwindow from './chat/ChatWindow';

const TURN_TIME = 5; // secunde

const GameMenu: React.FC = () => {
  const [currentTurn, setCurrentTurn] = useState(5);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Funcție pentru resetarea timerului
  const resetTurnTimer = useCallback(() => {
    setCurrentTurn(TURN_TIME);
  }, []);

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
    story: 'Poza' // Placeholder pentru povestea din clasa ta
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header cu data și ora */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">31 May 2025 11:17</p>
        </div>

        {/* Layout grid pentru carduri */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card Players - Stânga sus */}
          <GameCard title="Players" className="lg:col-span-1">
            <ul className="space-y-2">
              {gameData.players.map((player, index) => (
                <li key={index} className="text-gray-800">{player}</li>
              ))}
            </ul>
          </GameCard>

          {/* Card Turn info - Centru sus */}
          <GameCard title={`Your turn in ${currentTurn}...`} className="lg:col-span-1">
            <div className="flex items-center justify-center h-20">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg">😊</span>
              </div>
            </div>
          </GameCard>

          {/* Card Titlu - Dreapta */}
          <GameCard title="TITLU" className="lg:col-span-1 lg:row-span-2">
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Description ...</p>
              <div className="space-y-1">
                <div className="h-2 bg-gray-100 rounded"></div>
                <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                <div className="h-2 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Difficulty: Easy/Hard...</p>
            </div>

            {/* Secțiunea Poza */}
            <div className="bg-gray-100 border rounded-lg p-4 h-32 flex items-center justify-center">
              <span className="text-gray-500 text-lg">{gameData.story}</span>
            </div>
          </GameCard>

          {/* Card Questions - Stânga jos */}
          <GameCard title="Questions" className="lg:col-span-1">
            <div className="space-y-2">
              <p><strong>Hint Question:</strong> 50 coins</p>
              <p><strong>x2 Questions:</strong> 70 coins</p>
            </div>
          </GameCard>

          <div>
              <Chatwindow/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameMenu;