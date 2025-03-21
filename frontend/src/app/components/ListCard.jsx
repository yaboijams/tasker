import React from 'react';

const ListCard = ({ card, index, onDragStart, onDragEnd }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnd={onDragEnd}
      className="bg-[var(--magento)] text-[var(--foreground)] p-4 rounded-md shadow mb-2 cursor-move"
    >
      <h3 className="font-bold text-lg mb-1">{card.title}</h3>
      <p className="text-sm">{card.description}</p>
    </div>
  );
};

export default ListCard;
