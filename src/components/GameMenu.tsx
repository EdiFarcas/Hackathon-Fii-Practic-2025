// components/GameMenu.tsx
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import GameCard from './GameCard';
import ChatWindow from './chat/ChatWindow';
import CoinPurchaseMenu from './CoinPurchaseMenu';
import { storyCards, getStoryByTitle } from '../data/storyCards';

const TURN_TIME = 5; // secunde

const GameMenu: React.FC = () => {
  const { data: session } = useSession();
  const [currentTurn, setCurrentTurn] = useState(5);
  const [screenWidth, setScreenWidth] = useState(1280);
  const [isPurchaseMenuOpen, setIsPurchaseMenuOpen] = useState(false);
  const [requiredCoins, setRequiredCoins] = useState(0);
  const [currentStory, setCurrentStory] = useState(storyCards[0]); // Folosim prima poveste ca default

  const handleBonusClick = (cost: number) => {
    const userCoins = session?.user?.coins ?? 0;
    if (userCoins < cost) {
      setRequiredCoins(cost - userCoins);
      setIsPurchaseMenuOpen(true);
    } else {
      // TODO: Handle bonus purchase logic
      console.log('Purchasing bonus for', cost, 'coins');
    }
  };

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

  const { colSize, rowSize } = getGridDimensions();

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

  // Game data
  const gameData = {
    players: ['Ariel', 'Marcel', 'Victoria'],
    master: '...',
    story: 'Poza'
  };

  return (
    <div className="h-screen p-1 sm:p-2 overflow-hidden"
      style={{
        backgroundImage: "url('/bggame.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <style jsx>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>
      
      <div className="w-full h-full">
        <div 
          className="grid gap-1 sm:gap-2 mx-auto w-full h-full"
          style={{
            gridTemplateColumns: 'repeat(25, 1fr)',
            gridTemplateRows: 'repeat(20, 1fr)',
          }}
        >
          {/* Card Players */}
          <div 
            className="text-xs p-1 sm:p-2 hover-lift"
            style={{
              gridColumn: '2 /6',
              gridRow: '2 / 7'
            }}
          >              
            <GameCard title="Players" className="h-full">
              <ul className="space-y-2 text-base">
                {gameData.players.map((player, index) => (
                  <li key={index} className="text-white truncate text-center">{player}</li>
                ))}
              </ul>
            </GameCard>
          </div>

          {/* Card Turn Info */}
          <div 
            className="text-xs p-1 sm:p-2 hover-lift"
            style={{
              gridColumn: '11 / 16',
              gridRow: '2 / 4'
            }}
          >
            <GameCard title={`Your turn in ${currentTurn}...`} className="h-full" />
          </div>          {/* Card Story */}
          <div 
            className="text-xs p-1 sm:p-2 hover-lift"
            style={{
              gridColumn: '18 / 25',
              gridRow: '3 / 19'
            }}
          >
            {/* Coins Display */}
            <div 
              className="absolute text-xl text-yellow-300 font-bold"
              style={{
                top: '-2rem',
                right: '1rem',
              }}
            >              
            
            </div>

            <GameCard title={currentStory.title} className="h-full">
              <div className="flex flex-col h-full">
                <div>
                  <p className="mb-3 text-lg text-center text-black">{currentStory.description}</p>
                  <div className="mb-8">
                    <p className="text-base text-center font-semibold text-black">Difficulty: <span className="text-yellow-300">{currentStory.difficulty}</span></p>
                  </div>
                </div>
                
                <div className="flex-grow flex items-end justify-center mt-8">
                  <img 
                    src={currentStory.imageUrl} 
                    alt={currentStory.title}
                    className="w-full max-w-full h-96 object-cover rounded shadow-lg border border-red-700 bg-black/30"
                    style={{ aspectRatio: '2.5/1' }}
                  />
                </div>
              </div>
            </GameCard>
          </div>          {/* Coins Display */}
          <div 
            className="flex items-center text-xl text-yellow-300 font-bold"
            style={{
              gridColumn: '8 / 10',
              gridRow: '12 / 13'
            }}
          >              
            <span className="mr-2 text-2xl">🪙</span>
            <span>{session?.user?.coins ?? 0}</span>
          </div>

          {/* Card Bonuses */}
          <div 
            className="text-xs p-1 sm:p-2 hover-lift"
            style={{
              gridColumn: '2 / 9',
              gridRow: '13 / 17'
            }}
          >                <GameCard title="Bonuses" className="h-full">
              <div className="space-y-3 text-base text-center">
                <p 
                  className="transition-all duration-300 hover:scale-105 hover:text-yellow-200 cursor-pointer"
                  onClick={() => handleBonusClick(50)}
                >
                  <strong>Hint Question:</strong> 50 coins 🪙
                </p>
                <p 
                  className="transition-all duration-300 hover:scale-105 hover:text-yellow-200 cursor-pointer"
                  onClick={() => handleBonusClick(70)}
                >
                  <strong>x2 Questions:</strong> 70 coins 🪙
                </p>
              </div>
            </GameCard>
          </div>

          {/* Chat Window */}
          <div 
            className="text-xs p-1 sm:p-2 hover-lift"
            style={{
              gridColumn: '10 / 17',
              gridRow: '5 / 19',
              position: 'relative',
              height: '100%',
              width: '100%'
            }}
          >
            <ChatWindow />
          </div>

        </div>
        {/* CoinPurchaseMenu trebuie să fie la finalul layout-ului, nu în grid! */}
        <CoinPurchaseMenu 
          isOpen={isPurchaseMenuOpen}
          onClose={() => setIsPurchaseMenuOpen(false)}
          requiredCoins={requiredCoins}
        />
      </div>
    </div>
  );
};

export default GameMenu;