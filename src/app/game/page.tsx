import { Suspense } from 'react';
import GameMenu from '../../components/GameMenu';

export default function GamePage() {
  return (
    <Suspense fallback={<div>Loading game...</div>}>
      <GameMenu />
    </Suspense>
  );
}