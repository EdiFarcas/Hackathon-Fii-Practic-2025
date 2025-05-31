// components/GameCard.tsx

import { GameCardData } from '../models/GameCardData';


import React from 'react';

interface GameCardProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}


const GameCard: React.FC<GameCardProps> = ({ title, children, className }) => {
  // Card alb doar pentru cardurile de poveste (din storyCards)
  const storyTitles = [
    'Jack and Judy are dead',
    'Misterul Ceasului',
    'Camera Închisă',
    'Umbra din Oglindă',
    'Trenul de Noapte'
  ];
  const isStoryCard = storyTitles.includes(title);
  return (
    <div className={`${isStoryCard ? 'bg-white text-black' : 'bg-neutral-600/40 text-white'} backdrop-blur-sm rounded-lg shadow-lg h-full border-3 border-red-600/70 ${className} overflow-hidden`}
      style={{ minWidth: 0 }}>
      <div className={`p-4 backdrop-blur-sm ${!children ? 'flex items-center justify-center h-full' : ''} w-full h-full`} style={{ minWidth: 0 }}>
        <h3 className={`font-bold text-red-500 text-2xl backdrop-blur-sm text-center border-b-2 border-red-600/70 pb-2 ${children ? 'mb-6' : 'mb-0 border-b-0'} truncate sm:whitespace-normal`} style={{ wordBreak: 'break-word' }}>{title}</h3>
        {children && (
          <div className={`${isStoryCard ? 'bg-white text-black' : 'bg-neutral-600/40 text-white'} rounded-lg p-4 backdrop-blur-sm w-full`} style={{ minWidth: 0, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};


export default GameCard;