// src/app/components/List.tsx
'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';
import type { CardType } from '../types';

interface ListProps {
  listId: string;
  title: string;
  cards: CardType[];
}

/**
 * A single list that can contain zero or more cards.
 * We make the entire list droppable so we can drop a card even if it's empty.
 */
export default function List({ listId, title, cards }: ListProps) {
  // useDroppable for empty-list dropping
  const { setNodeRef } = useDroppable({
    id: listId,
    data: { listId },
  });

  return (
    <div ref={setNodeRef} className="bg-gray-100 rounded p-4 w-64 flex-shrink-0">
      <h2 className="font-bold mb-2">{title}</h2>

      {/* If the list has cards, wrap them in a SortableContext */}
      <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {cards.map((card) => (
            <SortableCard key={card.id} card={card} listId={listId} />
          ))}
        </div>
      </SortableContext>

      {/* If the list is empty, show a placeholder or something similar */}
      {cards.length === 0 && (
        <div className="text-sm text-gray-500 mt-2">No tasks</div>
      )}
    </div>
  );
}
