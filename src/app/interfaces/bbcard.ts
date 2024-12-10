export interface BBCard
{
    id: number;
    userId: number;
    listId: number;

    title: string;
    description: string;

    color: string;
    type: string;

    position: number;

    //This fields can be not present
    created?: Date;
    updated?: Date;

    //Fields starting with _ underscore are nagular only and not present in backend.
    _showDescription?: boolean;
  }