// components/GameCard.tsx

import { GameCardData } from '../models/GameCardData';


import React from 'react';

interface GameCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}


const GameCard: React.FC<GameCardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-gray-800/70 backdrop-blur-sm rounded-lg shadow-lg h-full text-white border-4 border-red-500 ${className}`}>
      <div className="p-2">
        <h3 className="font-semibold text-gray-200 mb-2 text-3xl">{title}</h3>
        <div className="text-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};


export default GameCard;