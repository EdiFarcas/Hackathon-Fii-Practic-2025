"use server";

import { db } from "../lib/db";

export async function createStory({ title, description }: { title: string; description: string }) {
    const story = await db.story.create({
        data: {
            title,
            description,
        },
    });
    if (typeof window !== "undefined") {
        window.alert("Story created successfully!");
    }
    return story;
}

export async function createLobby({ id, title, description }: { id: string; title: string; description: string }) {
    const lobby = await db.game.create({
        data: {
            id,
            title,
            description,
        },
    });
    if (typeof window !== "undefined") {
        window.alert("Lobby created successfully!");
    }
    return lobby;
}