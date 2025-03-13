// src/app/components/Board.tsx
'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableList from './SortableList';
import type { BoardType, ListType, CardType } from '../types';

interface BoardProps {
  initialBoard: BoardType;
}

export default function Board({ initialBoard }: BoardProps) {
  // Transform the initialBoard.lists array into a dictionary so we can handle cross-list moves easily
  const [lists, setLists] = useState<Record<string, { title: string; cards: CardType[] }>>(() => {
    const result: Record<string, { title: string; cards: CardType[] }> = {};
    initialBoard.lists.forEach((lst) => {
      result[lst.id] = {
        title: lst.title,
        cards: lst.cards,
      };
    });
    return result;
  });

  // Keep an array of list IDs for the horizontal order
  const [listOrder, setListOrder] = useState<string[]>(
    initialBoard.lists.map((l) => l.id)
  );

  // Add a new card to a specific list
  const handleAddCard = (listId: string, newCard: CardType) => {
    const updatedList = { ...lists[listId] };
    updatedList.cards = [...updatedList.cards, newCard];
    setLists({ ...lists, [listId]: updatedList });
  };

  // Handle drag end (both for reordering lists horizontally and cards cross-list)
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeListId = active.data.current?.listId; // If it's a card, has listId
    const overListId = over.data.current?.listId;

    // 1. Reordering Lists (if the item is a list)
    // We know it's a list if activeListId is undefined or null
    if (!activeListId && !overListId) {
      if (active.id !== over.id) {
        const oldIndex = listOrder.indexOf(active.id as string);
        const newIndex = listOrder.indexOf(over.id as string);
        setListOrder((items) => arrayMove(items, oldIndex, newIndex));
      }
      return;
    }

    // 2. Reordering or moving a Card
    if (activeListId && overListId) {
      // If the user dropped the card in the same list
      if (activeListId === overListId) {
        const currentCards = [...lists[activeListId].cards];
        const oldIndex = currentCards.findIndex((card) => card.id === active.id);
        const newIndex = currentCards.findIndex((card) => card.id === over.id);
        if (oldIndex !== newIndex && newIndex !== -1) {
          const reordered = arrayMove(currentCards, oldIndex, newIndex);
          setLists({
            ...lists,
            [activeListId]: { ...lists[activeListId], cards: reordered },
          });
        }
      } else {
        // Move card to a different list
        const sourceCards = [...lists[activeListId].cards];
        const activeIndex = sourceCards.findIndex((card) => card.id === active.id);
        if (activeIndex === -1) return;

        const [movedCard] = sourceCards.splice(activeIndex, 1);

        const destCards = [...lists[overListId].cards];
        // If the user dropped it on a card, insert at that position
        const overIndex = destCards.findIndex((card) => card.id === over.id);
        if (overIndex >= 0) {
          destCards.splice(overIndex, 0, movedCard);
        } else {
          // If user dropped it in empty space, just push at the end
          destCards.push(movedCard);
        }

        setLists({
          ...lists,
          [activeListId]: { ...lists[activeListId], cards: sourceCards },
          [overListId]: { ...lists[overListId], cards: destCards },
        });
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {/* Horizontal list reordering */}
      <SortableContext items={listOrder} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-4 overflow-auto">
          {listOrder.map((listId) => {
            const { title, cards } = lists[listId];
            return (
              <SortableList
                key={listId}
                listId={listId}
                title={title}
                cards={cards}
                onAddCard={handleAddCard}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
