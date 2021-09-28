/// <reference types="svelte" />

interface MemoryCard {
    id: number;
    value: string | number;
    imgURL?: string;
    opened: boolean;
    matched: boolean;
}

interface GameConfig {
    cardsNum: number;
    seed?: number;
    username?: string;
}