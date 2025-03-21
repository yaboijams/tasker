// src/app/components/Board.tsx
"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import Card from "./Card";
import type { BoardType, CardType } from "../types";

interface BoardProps {
  initialBoard: BoardType;
}

interface ListData {
  title: string;
  cards: CardType[];
}

export default function Board({ initialBoard }: BoardProps) {
  // Convert initialBoard.lists array to an object keyed by listId
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
      // Dropped outside any valid drop zone; revert changes
      setActiveCard(null);
      return;
    }

    const activeListId = active.data.current?.listId;
    const overListId = over.data.current?.listId;

    // 1) Reordering Lists (if dragging a list)
    if (!activeListId && !overListId) {
      if (active.id !== over.id) {
        const oldIndex = listOrder.indexOf(active.id as string);
        const newIndex = listOrder.indexOf(over.id as string);
        setListOrder((items) => arrayMove(items, oldIndex, newIndex));
      }
      setActiveCard(null);
      return;
    }

    // 2) Reordering or moving a Card
    if (activeListId && overListId) {
      // Case: Card moved within the same list
      if (activeListId === overListId) {
        const currentCards = [...lists[activeListId].cards];
        const oldIndex = currentCards.findIndex((c) => c.id === active.id);
        const newIndex = currentCards.findIndex((c) => c.id === over.id);

        if (oldIndex !== newIndex && newIndex !== -1) {
          const reordered = arrayMove(currentCards, oldIndex, newIndex);
          setLists({
            ...lists,
            [activeListId]: { ...lists[activeListId], cards: reordered },
          });
        }
      } else {
        // Case: Card moved to a different list
        const sourceCards = [...lists[activeListId].cards];
        const activeIndex = sourceCards.findIndex((c) => c.id === active.id);
        if (activeIndex === -1) return;

        const [movedCard] = sourceCards.splice(activeIndex, 1);
        const destCards = [...lists[overListId].cards];

        // Inside handleDragEnd in Board.tsx, in the cross-list move block:
        if (
          destCards.length === 0 ||
          over.id === overListId ||
          over.id === `${overListId}-placeholder`
        ) {
          destCards.push(movedCard);
        } else {
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
      <SortableContext
        items={listOrder}
        strategy={horizontalListSortingStrategy}
      >
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
      <DragOverlay>
        {activeCard ? <Card card={activeCard} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
