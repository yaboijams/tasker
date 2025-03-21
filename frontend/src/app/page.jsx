"use client";

import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import TaskContainer from './components/TaskContainer';
import NewTask from './modals/NewTask';

const HomePage = () => {
  // Example boards data
  const [boards, setBoards] = useState([
    { id: 1, name: 'Personal Tasks' },
    { id: 2, name: 'Work Projects' },
    { id: 3, name: 'Miscellaneous' },
  ]);

  const [selectedBoardId, setSelectedBoardId] = useState(boards[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy cards data (replace with your actual data logic)
  const cards = [
    { id: 1, title: 'Task 1', description: 'Description for task 1' },
    { id: 2, title: 'Task 2', description: 'Description for task 2' },
    // Add more cards as needed
  ];

  const handleSelectBoard = (boardId) => {
    setSelectedBoardId(boardId);
    // Fetch or filter cards for the selected board here
  };

  // This function is called when the modal form is submitted
  const handleCreateBoard = (newBoardName) => {
    const newBoard = { id: boards.length + 1, name: newBoardName };
    setBoards([...boards, newBoard]);
    setSelectedBoardId(newBoard.id);
    setIsModalOpen(false);
  };

  // Dummy drag handlers for cards
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('cardIndex', index);
  };

  const handleDragEnd = () => {
    // Implement logic after drag ends if needed
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSelectBoard={handleSelectBoard}
        onCreateBoard={() => setIsModalOpen(true)}
      />
      <main className="flex-1 p-4 bg-gray-50">
        <TaskContainer
          cards={cards}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </main>
      <NewTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBoard}
      />
    </div>
  );
};

export default HomePage;
