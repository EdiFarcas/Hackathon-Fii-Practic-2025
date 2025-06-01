import { GameCardData } from '../models/GameCardData';

// Colecția de povești
export const storyCards = [
    new GameCardData(
        'Jack and Judy are dead',
        'Jack and Judy were lying on the floor dead. There was a puddle of water and broken glass on the floor. How did they die?',
        'Medium',
        '/poza1.png',
        'Jack and Judy were two goldfish that swam in a small aquarium placed on a shelf. One afternoon, a cat sneaked into the room through the window and hit the aquarium that fell off the shelf and broke against the ground.'
        ,{ x: 10, y: 5 }
    ),
    new GameCardData(
        'Fatal shot',
        'A hunter aimed his gun carefully and fired. Seconds later, he realized his mistake. Minutes later, he was dead.',
        'Easy',
        '/poza2.png',
        'He hunted in snow-capped mountains. The shot provoked an avalanche, which covered the man. He died of strangulation.',
        { x: 10, y: 5 }
    ),
    new GameCardData(
        'Death: delayed',
        'Helen never thought that her decision to travel by plane would save her life.',
        'Medium',
        '/poza3.png',
        'A few days earlier Helen had been operated on. Before boarding the plane, she had to go through the metal detector, which kept going off, despite the fact that she had removed everything metal she had on. After an X-ray examination, it was discovered that the doctors had left a scalpel inside her body. If Helen had not discovered it in time, she would died for sure.',
        { x: 10, y: 5 }
    ),
    new GameCardData(
        'Red high heels',
        'A woman buys a new pair of red high heels. Hours later, she dies.',
        'Hard',
        '/poza4.png',
        "Her husband was a magician that was doing a gun trick with an apple on her head and his eyes closed. He didn't realize that she was wearing high heals so he didn't calculate the height accurately.... so he killed her.",
        { x: 10, y: 5 }
    ),
];

// Funcție pentru a obține o poveste după titlu
export const getStoryByTitle = (title: string): GameCardData | undefined => {
    return storyCards.find(story => story.title === title);
};

// Funcție pentru a obține toate poveștile
export const getAllStories = (): GameCardData[] => {
    return storyCards;
};

// Funcție pentru a obține povești după dificultate
export const getStoriesByDifficulty = (difficulty: string): GameCardData[] => {
    return storyCards.filter(story => story.difficulty === difficulty);
};

export default storyCards;
