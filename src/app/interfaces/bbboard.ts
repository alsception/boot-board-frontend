import { BBList } from "./bblist";

export interface BBBoard 
{
    id: number;
    userId: number;
    listId: number;

    title: string;
    color: string;
    type: string;
    
    position: number;
    
    created?: Date;
    updated?: Date;

    lists?: BBList[]; 

    totalLists: number;
    totalCards: number;
  }