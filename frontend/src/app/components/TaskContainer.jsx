import React from 'react';
import ListCard from './ListCard';

const TaskContainer = ({ cards, handleDragStart, handleDragEnd }) => {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full">
      {cards.map((card, index) => (
        <ListCard
          key={card.id}
          card={card}
          index={index}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};

export default TaskContainer;
