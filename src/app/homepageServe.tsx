"use server";

import { db } from "../lib/db";

export async function createStory({ title, description }: { title: string; description: string }) {
  // Poți extinde cu alte câmpuri dacă vrei (ex: userId, etc)
  // Pentru demo, salvăm doar titlu și descriere ca un "Game" cu date minime
  const story = await db.game.create({
    data: {
      title,
      description,
      scenario: description, // sau poți folosi alt câmp dacă ai
      solution: "", // Poți adăuga un input pentru soluție dacă vrei
      suspects: [],
      clues: [],
      hostId: "demo-host", // Înlocuiește cu userId real dacă ai autentificare
      status: "WAITING",
      maxPlayers: 4,
      currentTurn: 0,
    },
  });
  return story;
}
