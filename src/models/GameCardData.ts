// src/models/GameCardData.ts
export class GameCardData {
  title: string;
  description: string;
  difficulty: string;
  imageUrl: string;
  solution: string;
  coordinates: { x: number; y: number };

  constructor(
    title: string,
    description: string,
    difficulty: string,
    imageUrl: string,
    solution: string,
    coordinates: { x: number; y: number }
  ) {
    this.title = title;
    this.solution = solution;
    this.description = description;
    this.difficulty = difficulty;
    this.imageUrl = imageUrl;
    this.coordinates = coordinates;
  }
}
