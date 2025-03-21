// src/app/components/List.tsx
"use client";

import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCard from "./SortableCard";
import type { CardType } from "../types";

interface ListProps {
  listId: string;
  title: string;
  cards: CardType[];
  onAddCard: (listId: string, card: CardType) => void; // Callback for adding a new card
}

export default function List({ listId, title, cards, onAddCard }: ListProps) {
  // Make the list droppable (even if it's empty)
  const { setNodeRef } = useDroppable({
    id: listId,
    data: { listId },
  });

  // Local state for the new card inputs
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    const newCard: CardType = {
      id: `card-${Math.random().toString(36).substr(2, 9)}`,
      title: newCardTitle,
      description: newCardDescription,
    };
    onAddCard(listId, newCard);
    setNewCardTitle("");
    setNewCardDescription("");
  };

  // When there are no cards, provide a placeholder ID so the droppable area remains
  const items =
    cards.length > 0 ? cards.map((card) => card.id) : [`placeholder-${listId}`];

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 rounded p-4 w-64 flex-shrink-0"
    >
      <h2 className="font-bold mb-2">{title}</h2>

      {/* Render the cards inside a SortableContext with a minimum height */}
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 min-h-[100px]">
          {cards.length > 0 ? (
            cards.map((card) => (
              <SortableCard key={card.id} card={card} listId={listId} />
            ))
          ) : (
            // Visible placeholder for an empty list
            <div
              id={`placeholder-${listId}`}
              className="min-h-[100px] border-dashed border border-gray-300 flex items-center justify-center text-gray-400"
            >
              Drop card here
            </div>
          )}
        </div>
      </SortableContext>

      {/* Form for adding a new card */}
      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="Card title"
          className="w-full border rounded px-2 py-1 text-sm"
        />
        <textarea
          value={newCardDescription}
          onChange={(e) => setNewCardDescription(e.target.value)}
          placeholder="Card description"
          className="w-full border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleAddCard}
          className="w-full bg-blue-500 text-white rounded px-2 py-1 text-sm"
        >
          Add Card
        </button>
      </div>
    </div>
  );
}
