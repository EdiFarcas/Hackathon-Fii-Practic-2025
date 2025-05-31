import { GameCardData } from '../models/GameCardData';

// Exemplu de creare a unei cărți cu titlu, descriere, dificultate și poză
const myCard = new GameCardData(
  'Enigma din Pădure',
  'O poveste misterioasă ce se desfășoară într-o pădure întunecată, plină de secrete.',
  'Hard',
  '/poza1.png', // calea corectă pentru imagine din public/
  { x: 10, y: 5 }
);

console.log(myCard);

export default myCard;
