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