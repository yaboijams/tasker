'use client';

import React from 'react';
import List from './List';

interface CardType {
  id: string;
  title: string;
  description: string;
}

interface ListType {
  id: string;
  title: string;
  cards: CardType[];
}

interface BoardType {
  id: string;
  title: string;
  lists: ListType[];
}

export default function Board({ board }: { board: BoardType }) {
  return (
    <div className="flex gap-4 overflow-auto">
      {board.lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </div>
  );
}
