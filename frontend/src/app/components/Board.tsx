// src/app/components/Board.tsx
'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import SortableList from './SortableList';
import type { BoardType, ListType } from '../types';

export default function Board({ initialBoard }: { initialBoard: BoardType }) {
  const [lists, setLists] = useState<ListType[]>(initialBoard.lists);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = lists.findIndex((list) => list.id === active.id);
      const newIndex = lists.findIndex((list) => list.id === over?.id);
      setLists((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={lists.map((list) => list.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-4 overflow-auto">
          {lists.map((list) => (
            <SortableList key={list.id} list={list} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
