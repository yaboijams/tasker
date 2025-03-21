// src/app/components/SortableCard.tsx
"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import type { CardType } from "../types";

export default function SortableCard({
  card,
  listId,
}: {
  card: CardType;
  listId: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { listId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // If the card is being dragged, render an empty placeholder to preserve layout space
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{ ...style, visibility: "hidden", height: "auto" }}
        {...attributes}
        {...listeners}
      />
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card card={card} />
    </div>
  );
}
