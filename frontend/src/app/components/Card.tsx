// src/app/components/Card.tsx
"use client";

import React from "react";
import type { CardType } from "../types";

const Card: React.FC<{ card: CardType }> = ({ card }) => {
  console.log("Rendering Card:", card.id);
  return (
    <div className="border rounded p-2 bg-white shadow">
      <h3 className="font-bold">{card.title}</h3>
      <p className="text-sm">{card.description}</p>
    </div>
  );
};

export default React.memo(Card);
