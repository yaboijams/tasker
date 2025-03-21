"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Sidebar from "./components/SideBar";
import TaskContainer from "./components/TaskContainer";
import NewBoard from "./modals/NewBoard";
import NewTask from "./modals/NewTask";
import NewList from "./modals/NewList";

const HomePage = () => {
  const [lists, setLists] = useState([
    { id: 1, title: "To Do", tasks: [] },
    { id: 2, title: "In Progress", tasks: [] },
    { id: 3, title: "Done", tasks: [] },
  ]);

  const [boards, setBoards] = useState([
    { id: 1, name: "Personal Tasks" },
    { id: 2, name: "Work Projects" },
    { id: 3, name: "Miscellaneous" },
  ]);

  const [selectedBoardId, setSelectedBoardId] = useState(lists[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [activeListId, setActiveListId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false); // Confetti state

  // Detect screen size for Confetti
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Open the new task modal for a specific list
  const openTaskModal = (listId) => {
    setActiveListId(listId);
    setIsTaskModalOpen(true);
  };

  // Handle adding a new task to a list
  const handleAddTask = (listId, taskDetails) => {
    const newTask = { id: Date.now(), ...taskDetails };

    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          return { ...list, tasks: [...list.tasks, newTask] };
        }
        return list;
      })
    );

    setIsTaskModalOpen(false);
  };

  // Handle adding a new list (ListCard)
  const handleAddList = ({ title, priority }) => {
    const newList = {
      id: Date.now(),
      title,
      priority,
      tasks: [],
    };
    setLists([...lists, newList]);
  };

  // Handle task movement with confetti trigger
  const onTaskDrop = (e, targetListId) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));

    setLists((prevLists) => {
      const sourceListIndex = prevLists.findIndex(
        (list) => list.id === data.listId
      );
      const targetListIndex = prevLists.findIndex(
        (list) => list.id === targetListId
      );

      if (sourceListIndex === -1 || targetListIndex === -1) return prevLists;

      // Prevent duplicate tasks in the same list
      if (
        prevLists[targetListIndex].tasks.some(
          (task) => task.id === data.task.id
        )
      ) {
        return prevLists;
      }

      // Remove the task from the source list
      const taskToMove = data.task;
      const updatedSourceTasks = prevLists[sourceListIndex].tasks.filter(
        (task) => task.id !== taskToMove.id
      );

      // Add the task to the target list
      const updatedTargetTasks = [
        ...prevLists[targetListIndex].tasks,
        taskToMove,
      ];

      const updatedLists = [...prevLists];
      updatedLists[sourceListIndex] = {
        ...prevLists[sourceListIndex],
        tasks: updatedSourceTasks,
      };
      updatedLists[targetListIndex] = {
        ...prevLists[targetListIndex],
        tasks: updatedTargetTasks,
      };

      // 🎉 Trigger Confetti if moving to "Done" list
      if (updatedLists[targetListIndex].title === "Done") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Confetti disappears after 3 seconds
      }

      return updatedLists;
    });
  };

  return (
    <div className="flex h-screen">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <Sidebar
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSelectBoard={(id) => setSelectedBoardId(id)}
        onCreateBoard={() => setIsModalOpen(true)}
      />
      <main className="flex-1 p-4 bg-gray-50">
        <TaskContainer
          lists={lists}
          onTaskDragStart={() => {}}
          onTaskDragEnd={() => {}}
          onTaskDrop={onTaskDrop} // Updated to trigger confetti
          onAddTask={openTaskModal}
          onAddList={() => setIsListModalOpen(true)}
        />
      </main>
      <NewBoard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
      />
      <NewTask
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={() => {}}
        listId={activeListId}
      />
      <NewList
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onSubmit={handleAddList}
      />
    </div>
  );
};

export default HomePage;
