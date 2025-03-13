// src/app/components/List.tsx
'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';
import type { ListType, CardType } from '../types';

export default function List({ list }: { list: ListType }) {
  const [cards, setCards] = useState<CardType[]>(list.cards);

  const handleCardDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = cards.findIndex((card) => card.id === active.id);
      const newIndex = cards.findIndex((card) => card.id === over?.id);
      setCards((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="bg-gray-100 rounded p-4 w-64 flex-shrink-0">
      <h2 className="font-bold mb-2">{list.title}</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleCardDragEnd}>
        <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {cards.map((card) => (
              <SortableCard key={card.id} card={card} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
