// src/app/components/Card.tsx
'use client';

import React from 'react';
import type { CardType } from '../types';

export default function Card({ card }: { card: CardType }) {
  return (
    <div className="border rounded p-2 bg-white shadow">
      <h3 className="font-bold">{card.title}</h3>
      <p className="text-sm">{card.description}</p>
    </div>
  );
}
