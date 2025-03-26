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
  // Boards now include lists and widgets as part of each board's data
  const [boards, setBoards] = useState([
    {
      id: 1,
      name: "Personal Tasks",
      lists: [
        {
          id: 101,
          title: "To Do",
          tasks: [
            {
              id: 1001,
              description: "Have to complete things",
              color: "bg-blue-500",
            },
          ],
        },
        { id: 102, title: "In Progress", tasks: [] },
        { id: 103, title: "Done", tasks: [] },
      ],
      widgets: [],
    },
    {
      id: 2,
      name: "Work Projects",
      lists: [
        { id: 201, title: "To Do", tasks: [] },
        { id: 202, title: "In Progress", tasks: [] },
        { id: 203, title: "Done", tasks: [] },
      ],
      widgets: [],
    },
    {
      id: 3,
      name: "Miscellaneous",
      lists: [
        { id: 301, title: "To Do", tasks: [] },
        { id: 302, title: "In Progress", tasks: [] },
        { id: 303, title: "Done", tasks: [] },
      ],
      widgets: [],
    },
  ]);

  // Track the selected board by its ID
  const [selectedBoardId, setSelectedBoardId] = useState(boards[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [activeListId, setActiveListId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // For confetti fade-out effect
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOutConfetti, setFadeOutConfetti] = useState(false);

  // Detect screen size for Confetti
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
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

  // Get the currently selected board based on selectedBoardId
  const currentBoard = boards.find((board) => board.id === selectedBoardId);

  // Open the new task modal for a specific list
  const openTaskModal = (listId) => {
    setActiveListId(listId);
    setIsTaskModalOpen(true);
  };

  // Add a new task to a list within the current board
  const handleAddTask = (listId, taskDetails) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) => {
        if (board.id !== selectedBoardId) return board;
        return {
          ...board,
          lists: board.lists.map((list) => {
            if (list.id !== listId) return list;
            return {
              ...list,
              tasks: [...list.tasks, { id: Date.now(), ...taskDetails }],
            };
          }),
        };
      });
      // Log the updated boards structure so you can inspect the tasks format
      console.log("Updated Boards:", updatedBoards);
      return updatedBoards;
    });
    setIsTaskModalOpen(false);
  };

  // Create a new board with default lists and widgets, and select it immediately
  const handleNewBoard = (boardName) => {
    const newBoard = {
      id: Date.now(),
      name: boardName,
      lists: [
        { id: Date.now() + 1, title: "To Do", tasks: [] },
        { id: Date.now() + 2, title: "In Progress", tasks: [] },
        { id: Date.now() + 3, title: "Done", tasks: [] },
      ],
      widgets: [],
    };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
    setSelectedBoardId(newBoard.id);
  };

  // Add a new list to the current board
  const handleAddList = ({ title, priority }) => {
    const newList = {
      id: Date.now(),
      title,
      priority,
      tasks: [],
    };
    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id !== selectedBoardId) return board;
        return { ...board, lists: [...board.lists, newList] };
      })
    );
  };

  // Drag-and-drop logic for tasks, updating only the current board
  const onTaskDragStart = (e, task, listId) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, listId }));
  };

  const onTaskDragEnd = () => {
    // Additional logic can be added here if needed.
  };

  const onTaskDrop = (e, targetListId) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));

    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id !== selectedBoardId) return board;
        const sourceListIndex = board.lists.findIndex(
          (list) => list.id === data.listId
        );
        const targetListIndex = board.lists.findIndex(
          (list) => list.id === targetListId
        );
        if (sourceListIndex === -1 || targetListIndex === -1) return board;

        // Prevent duplicate tasks in the target list.
        if (
          board.lists[targetListIndex].tasks.some(
            (task) => task.id === data.task.id
          )
        ) {
          return board;
        }

        const taskToMove = data.task;
        const updatedSourceTasks = board.lists[sourceListIndex].tasks.filter(
          (task) => task.id !== taskToMove.id
        );
        const updatedTargetTasks = [
          ...board.lists[targetListIndex].tasks,
          taskToMove,
        ];

        const updatedLists = [...board.lists];
        updatedLists[sourceListIndex] = {
          ...board.lists[sourceListIndex],
          tasks: updatedSourceTasks,
        };
        updatedLists[targetListIndex] = {
          ...board.lists[targetListIndex],
          tasks: updatedTargetTasks,
        };

        // Optionally trigger confetti if the task is dropped into the "Done" list.
        if (updatedLists[targetListIndex].title === "Done") {
          setShowConfetti(true);
          setTimeout(() => setFadeOutConfetti(true), 5000);
          setTimeout(() => {
            setShowConfetti(false);
            setFadeOutConfetti(false);
          }, 6000);
        }

        return { ...board, lists: updatedLists };
      })
    );
  };

  return (
    <div className="flex h-screen">
      {/* Confetti Effect */}
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

      {/* Sidebar */}
      <Sidebar
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSelectBoard={(id) => setSelectedBoardId(id)}
        onCreateBoard={() => setIsModalOpen(true)}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: sidebarCollapsed ? "4rem" : "16rem",
        }}
        className="flex flex-col flex-1 transition-all duration-300"
      >
        {/* Widgets (Board-specific) */}
        <div className="flex-1 bg-blue-100 overflow-auto">
          <WidgetsContainer widgets={currentBoard?.widgets || []} />
        </div>

        {/* Task Container (Board-specific) */}
        <div className="flex-1 bg-gray-50 overflow-auto">
          <TaskContainer
            lists={currentBoard?.lists || []}
            onTaskDragStart={onTaskDragStart}
            onTaskDragEnd={onTaskDragEnd}
            onTaskDrop={onTaskDrop}
            onAddTask={openTaskModal}
            onAddList={() => setIsListModalOpen(true)}
          />
        </div>

        {/* Dummy Bottom Section */}
        <div className="flex-1 bg-green-100 flex items-center justify-center">
          <p className="text-lg text-gray-700">Dummy Bottom Section Content</p>
        </div>
      </div>

      {/* Modals */}
      <NewBoard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewBoard}
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
