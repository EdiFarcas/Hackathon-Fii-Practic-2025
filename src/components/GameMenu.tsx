// components/GameMenu.tsx
'use client';
import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import Chatwindow from './chat/ChatWindow';

const GameMenu: React.FC = () => {
  const [currentTurn, setCurrentTurn] = useState(5);
  const [screenWidth, setScreenWidth] = useState(1280); // Default desktop

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

  // Exemplu: disponibile date dinamice pentru fiecare card
  const gameData = {
    players: ['Ariel', 'Marcel', 'Victoria'],
    master: '...',
    story: 'Poza'
  };

  return (
    <div className="min-h-screen bg-gray-100 p-1 sm:p-2">
      <div className="w-full">
        
        {/* CSS Custom pentru breakpoint-uri responsive */}
        <style jsx>{`
          @media (min-width: 640px) {
            .grid {
              grid-template-columns: repeat(15, minmax(50px, 1fr)) !important;
              grid-template-rows: repeat(25, minmax(45px, 1fr)) !important;
            }
          }
          @media (min-width: 768px) {
            .grid {
              grid-template-columns: repeat(15, minmax(60px, 1fr)) !important;
              grid-template-rows: repeat(25, minmax(50px, 1fr)) !important;
            }
          }
          @media (min-width: 1024px) {
            .grid {
              grid-template-columns: repeat(15, minmax(70px, 1fr)) !important;
              grid-template-rows: repeat(25, minmax(55px, 1fr)) !important;
            }
          }
          @media (min-width: 1280px) {
            .grid {
              grid-template-columns: repeat(15, 80px) !important;
              grid-template-rows: repeat(25, 60px) !important;
            }
          }
        `}</style>
        
        {/* Grid RESPONSIVE cu 15 coloane și 25 linii */}
        <div 
          className="grid gap-1 sm:gap-2 border border-red-500 mx-auto w-full overflow-x-auto"
          style={{
            // Mobile: coloane mai mici
            gridTemplateColumns: 'repeat(15, minmax(40px, 1fr))',
            gridTemplateRows: 'repeat(25, minmax(40px, 1fr))',
            minHeight: '70vh', // Minimum 70% din înălțimea viewport-ului
            maxHeight: '90vh', // Maximum 90% din înălțimea viewport-ului
          }}
        >
          
          {/* Card Players - Responsive cu poziție adaptivă */}
          <div 
            className="text-xs p-1 sm:p-2"
            style={{
              gridColumn: 'var(--players-col, 11 / 16)',
              gridRow: 'var(--players-row, 1 / 4)'
            }}
          >
            <GameCard title="Players" className="h-full text-xs sm:text-sm">
              <ul className="space-y-1 text-xs">
                {gameData.players.map((player, index) => (
                  <li key={index} className="text-gray-800 truncate">{player}</li>
                ))}
              </ul>
            </GameCard>
          </div>

          {/* Card Turn Info - MUTAT în stânga sus */}
          <div 
            className="text-xs p-2"
            style={{
              gridColumn: '1 / 5',    // Coloanele 1-4
              gridRow: '1 / 3'        // Liniile 1-2
            }}
          >
            <GameCard title={`Your turn in ${currentTurn}...`} className="h-full">
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">😊</span>
                </div>
              </div>
            </GameCard>
          </div>

<<<<<<< HEAD
          {/* Card Titlu - MUTAT în centru, mai mare */}
          <div 
            className="text-xs p-2"
            style={{
              gridColumn: '4 / 12',   // Coloanele 4-11 (mai larg)
              gridRow: '5 / 12'       // Liniile 5-11 (mai înalt)
            }}
          >
            <GameCard title="TITLU" className="h-full">
              <div className="mb-2">
                <p className="text-gray-600 mb-1 text-xs">Description...</p>
                <div className="space-y-1">
                  <div className="h-1 bg-gray-100 rounded"></div>
                  <div className="h-1 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-1 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
              
              <div className="mb-2">
                <p className="text-gray-600 text-xs">Difficulty: Easy/Hard...</p>
              </div>
=======
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
>>>>>>> 56569f9b71e8e8e45d453c1faaed5d2f74420960

              <div className="bg-gray-100 border rounded-lg p-2 flex-1 flex items-center justify-center">
                <span className="text-gray-500 text-xs">{gameData.story}</span>
              </div>
            </GameCard>
          </div>

          {/* Card Questions - MUTAT în partea de jos stânga */}
          <div 
            className="text-xs p-2"
            style={{
              gridColumn: '1 / 8',    // Coloanele 1-7
              gridRow: '20 / 25'      // Liniile 20-24 (jos)
            }}
          >
            <GameCard title="Questions" className="h-full">
              <div className="space-y-1 text-xs">
                <p><strong>Hint Question:</strong> 50 coins</p>
                <p><strong>x2 Questions:</strong> 70 coins</p>
              </div>
            </GameCard>
          </div>

          {/* Card Game Info - MUTAT în partea de jos dreapta */}
          <div 
            className="text-xs p-2"
            style={{
              gridColumn: '9 / 16',   // Coloanele 9-15
              gridRow: '20 / 25'      // Liniile 20-24 (jos)
            }}
          >
            <GameCard title="Game Info" className="h-full">
              <div className="space-y-2 text-xs">
                <div>
                  <p><strong>Master:</strong> {gameData.master}</p>
                </div>
                <div>
                  <p><strong>Players:</strong> {gameData.players.join(', ')}</p>
                </div>
                
                <div className="mt-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    Type... →
                  </button>
                </div>
              </div>
            </GameCard>
          </div>

          {/* Card suplimentar - MUTAT în mijlocul din dreapta */}
          <div 
            className="text-xs p-2"
            style={{
              gridColumn: '12 / 16',  // Coloanele 12-15
              gridRow: '8 / 15'       // Liniile 8-14 (mijloc)
            }}
          >
            <GameCard title="Extra" className="h-full">
              <div className="text-xs text-gray-600">
                <p>Card extra pentru demonstrare</p>
              </div>
            </GameCard>
          </div>
          
        </div>

       
      </div>
    </div>
  );
};

export default GameMenu;