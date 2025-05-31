// components/GameCard.tsx

import { GameCardData } from '../models/GameCardData';


import React from 'react';

interface GameCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white-100 border-2 border-black rounded-lg p-4 shadow-lg ${className}`}>
      <h2 className="text-xl font-bold mb-3 text-center">{title}</h2>
      <div className="text-sm">
        {children}
      </div>
    </div>
  );
};

export default GameCard;