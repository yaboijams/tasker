'use client';

import React from 'react';

interface CardProps {
  card: {
    id: string;
    title: string;
    description: string;
  };
}

export default function Card({ card }: CardProps) {
  return (
    <div className="border rounded p-2 bg-white shadow">
      <h3 className="font-bold">{card.title}</h3>
      <p className="text-sm">{card.description}</p>
    </div>
  );
}
