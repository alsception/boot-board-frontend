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
    
    createdAt?: Date;
    updatedAt?: Date;

    cards?: BBList[]; 
  }