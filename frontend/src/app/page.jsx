"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./components/SideBar";
import TaskContainer from "./components/TaskContainer";
import WidgetsContainer from "./components/WidgetsContainer";
import NewBoard from "./modals/NewBoard";
import NewTask from "./modals/NewTask";
import NewList from "./modals/NewList";

// Dynamically import Confetti for client-side rendering only
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

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

  // For confetti fade-out effect
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOutConfetti, setFadeOutConfetti] = useState(false);

  // Detect screen size for Confetti
  // Initialize with safe default values since window is undefined on the server.
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial window size
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Update state on window resize
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
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

  const onTaskDragStart = (e, task, listId) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, listId }));
  };

  const onTaskDragEnd = () => {
    // Additional logic can be added here if needed.
  };

  // Handle task movement with confetti trigger and smooth fade out.
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

      // Trigger Confetti if moving to "Done" list
      if (updatedLists[targetListIndex].title === "Done") {
        setShowConfetti(true);
        // After 5 seconds, trigger fade out
        setTimeout(() => {
          setFadeOutConfetti(true);
        }, 5000);
        // After 6 seconds, unmount the confetti
        setTimeout(() => {
          setShowConfetti(false);
          setFadeOutConfetti(false);
        }, 6000);
      }

      return updatedLists;
    });
  };

  return (
    <div className="flex h-screen">
      {/* Confetti Effect with smooth fade-out */}
      {showConfetti && (
        <div
          className={`absolute z-50 pointer-events-none ${
            fadeOutConfetti
              ? "opacity-0 transition-opacity duration-1000"
              : "opacity-100 transition-opacity duration-1000"
          }`}
        >
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            drawShape
            numberOfPieces={500}
            colors={["#1b998b", "#f8f1ff", "#decdf5", "#998cd3"]}
          />
        </div>
      )}

      {/* Sidebar remains outside the row structure */}
      <Sidebar
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSelectBoard={(id) => setSelectedBoardId(id)}
        onCreateBoard={() => setIsModalOpen(true)}
      />

      {/* Main content area divided into three equal rows */}
      <div className="flex flex-col flex-1">
        {/* Top Row: Widgets */}
        <div className="flex-1 bg-blue-100 overflow-auto">
          <WidgetsContainer />
        </div>

        {/* Middle Row: TaskContainer */}
        <div className="flex-1 bg-gray-50 overflow-auto">
          <TaskContainer
            lists={lists}
            onTaskDragStart={onTaskDragStart}
            onTaskDragEnd={onTaskDragEnd}
            onTaskDrop={onTaskDrop}
            onAddTask={openTaskModal}
            onAddList={() => setIsListModalOpen(true)}
          />
        </div>

        {/* Bottom Row: Dummy Section */}
        <div className="flex-1 bg-green-100 flex items-center justify-center">
          <p className="text-lg text-gray-700">Dummy Bottom Section Content</p>
        </div>
      </div>

      <NewBoard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
      />
      <NewTask
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleAddTask}
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
