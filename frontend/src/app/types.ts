// src/app/types.ts

export interface CardType {
    id: string;
    title: string;
    description: string;
    dueDate?: string;
    labels?: string[];
  }
  
  export interface ListType {
    id: string;
    title: string;
    cards: CardType[];
  }
  
  export interface BoardType {
    id: string;
    title: string;
    lists: ListType[];
  }
  