import { BBCard } from "./bbcard";

export interface BBList 
{
    id: number;
    userId: number;
    boardId: number;

    title: string;
    color: string;
    type: string;
    
    position: number;
    
    // Add createdAt and updatedAt if needed
    createdAt?: Date;
    updatedAt?: Date;

    cards?: BBCard[]; // Array of BBCards
  }