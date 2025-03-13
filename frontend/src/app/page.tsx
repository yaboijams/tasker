'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Board from './components/Board';

// Example board data (in a real app, fetch from your backend)
const initialBoard = {
  id: 'board-1',
  title: 'My Board',
  lists: [
    {
      id: 'list-1',
      title: 'Todo',
      cards: [
        { id: 'card-1', title: 'Task 1', description: 'First task' },
        { id: 'card-2', title: 'Task 2', description: 'Second task' },
      ],
    },
    {
      id: 'list-2',
      title: 'In Progress',
      cards: [
        { id: 'card-3', title: 'Task 3', description: 'Third task' },
      ],
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: [],
    },
  ],
};

export default function HomePage() {
  const [board, setBoard] = useState(initialBoard);

  // Handle the drag end event from dnd-kit
  const handleDragEnd = (event: DragEndEvent) => {
    // event.active: the item being dragged
    // event.over: the drop target (if any)
    // In a full implementation, you'd move the card from one list to another
    console.log('Drag Ended:', event.active.id, 'dropped over', event.over?.id);
    // For now, just log the event. You can implement logic to reorder cards or move them to a new list.
  };

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Task Manager Board</h1>

      {/* Wrap your entire board in a DndContext to enable drag and drop */}
      <DndContext onDragEnd={handleDragEnd}>
        <Board board={board} />
      </DndContext>
    </main>
  );
}
