// src/app/components/Board.tsx
'use client';

import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import SortableList from './SortableList';
import Card from './Card';
import type { BoardType, CardType } from '../types';

interface BoardProps {
  initialBoard: BoardType;
}

interface ListData {
  title: string;
  cards: CardType[];
}

export default function Board({ initialBoard }: BoardProps) {
  // Convert lists array -> { [listId]: { title, cards } }
  const [lists, setLists] = useState<Record<string, ListData>>(() => {
    const obj: Record<string, ListData> = {};
    initialBoard.lists.forEach((l) => {
      obj[l.id] = {
        title: l.title,
        cards: l.cards,
      };
    });
    return obj;
  });

  // Horizontal order of lists
  const [listOrder, setListOrder] = useState<string[]>(
    initialBoard.lists.map((l) => l.id)
  );

  // For smooth drag
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeListId = active.data.current?.listId;
    if (activeListId) {
      const card = lists[activeListId].cards.find((c) => c.id === active.id);
      if (card) {
        setActiveCard(card);
      }
    } else {
      setActiveCard(null);
    }
  };

  const handleDragCancel = () => {
    setActiveCard(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      // Dropped outside any valid list => revert
      setActiveCard(null);
      return;
    }

    const activeListId = active.data.current?.listId;
    const overListId = over.data.current?.listId;

    // If we are dragging a list
    if (!activeListId && !overListId) {
      // Reorder lists horizontally
      if (active.id !== over.id) {
        const oldIndex = listOrder.indexOf(active.id as string);
        const newIndex = listOrder.indexOf(over.id as string);
        setListOrder((items) => arrayMove(items, oldIndex, newIndex));
      }
      setActiveCard(null);
      return;
    }

    // If we are dragging a card
    if (activeListId && overListId) {
      // If it's the same list => reorder within the list
      if (activeListId === overListId) {
        const currentCards = [...lists[activeListId].cards];
        const oldIndex = currentCards.findIndex((c) => c.id === active.id);
        const newIndex = currentCards.findIndex((c) => c.id === over.id);

        // If user dropped on empty space in the same list
        if (over.id === overListId) {
          currentCards.push(...currentCards.splice(oldIndex, 1));
        } else if (oldIndex !== newIndex && newIndex !== -1) {
          arrayMove(currentCards, oldIndex, newIndex);
        }

        setLists({
          ...lists,
          [activeListId]: { ...lists[activeListId], cards: currentCards },
        });
      } else {
        // Cross-list move
        const sourceCards = [...lists[activeListId].cards];
        const activeIndex = sourceCards.findIndex((c) => c.id === active.id);
        if (activeIndex === -1) return;

        const [movedCard] = sourceCards.splice(activeIndex, 1);
        const destCards = [...lists[overListId].cards];

        // If dropping on the empty list => over.id === overListId
        if (over.id === overListId) {
          // Just push at the end
          destCards.push(movedCard);
        } else {
          // Insert at the position of the card the user dropped onto
          const overIndex = destCards.findIndex((c) => c.id === over.id);
          if (overIndex >= 0) {
            destCards.splice(overIndex, 0, movedCard);
          } else {
            destCards.push(movedCard);
          }
        }

        setLists({
          ...lists,
          [activeListId]: { ...lists[activeListId], cards: sourceCards },
          [overListId]: { ...lists[overListId], cards: destCards },
        });
      }
    }
    setActiveCard(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
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
              />
            );
          })}
        </div>
      </SortableContext>

      <DragOverlay>{activeCard ? <Card card={activeCard} /> : null}</DragOverlay>
    </DndContext>
  );
}
