// src/app/components/SortableList.tsx
"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import List from "./List";
import type { CardType } from "../types";

interface SortableListProps {
  listId: string;
  title: string;
  cards: CardType[];
}

export default function SortableList({
  listId,
  title,
  cards,
}: SortableListProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: listId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    willChange: "transform",
    opacity: isDragging ? 0.5 : 1, // Slight opacity change for visual feedback while dragging
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <List listId={listId} title={title} cards={cards} />
    </div>
  );
}
