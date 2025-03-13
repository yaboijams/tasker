// src/app/components/List.tsx
'use client';

import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';
import type { CardType } from '../types';

interface ListProps {
  listId: string;
  title: string;
  cards: CardType[];
  onAddCard: (listId: string, newCard: CardType) => void;  // for adding tasks
}

/**
 * Displays a single list with its cards.
 * The parent (Board) handles the actual reordering logic in onDragEnd.
 * Here we only render the SortableContext and the form for adding new tasks.
 */
export default function List({ listId, title, cards, onAddCard }: ListProps) {
  const [newTitle, setNewTitle] = useState('');

  // Add a new task (card) to this list
  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newCard: CardType = {
      id: 'card-' + Math.random().toString(36).slice(2),
      title: newTitle,
      description: '',
    };
    onAddCard(listId, newCard);
    setNewTitle('');
  };

  return (
    <div className="bg-gray-100 rounded p-4 w-64 flex-shrink-0">
      <h2 className="font-bold mb-2">{title}</h2>

      {/* Cards are rendered in a vertical SortableContext */}
      <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 mb-4">
          {cards.map((card) => (
            <SortableCard key={card.id} card={card} listId={listId} />
          ))}
        </div>
      </SortableContext>

      {/* Simple form to add a new task */}
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="New Task Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
