export interface BBCard
{
    id: number;
    userId: number;
    listId: number;

    title: string;
    text: string;

    color: string;
    type: string;

    position: number;

    // Add createdAt and updatedAt if needed
    createdAt?: Date;
    updatedAt?: Date;
  }