// src/app/components/SortableList.tsx
'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import List from './List';
import type { CardType } from '../types';

interface SortableListProps {
  listId: string;
  title: string;
  cards: CardType[];
  onAddCard: (listId: string, newCard: CardType) => void;
}

export default function SortableList({ listId, title, cards, onAddCard }: SortableListProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: listId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <List listId={listId} title={title} cards={cards} onAddCard={onAddCard} />
    </div>
  );
}
