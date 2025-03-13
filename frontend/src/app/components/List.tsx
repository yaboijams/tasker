'use client';

import React from 'react';
import Card from './Card';

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

export default function List({ list }: { list: ListType }) {
  return (
    <div className="bg-gray-100 rounded p-4 w-64 flex-shrink-0">
      <h2 className="font-bold mb-2">{list.title}</h2>
      <div className="space-y-2">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
