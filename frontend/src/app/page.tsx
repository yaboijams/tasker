// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Board from "./components/Board";
import type { BoardType } from "./types";

const initialBoard: BoardType = {
  id: "board-1",
  title: "My Board",
  lists: [
    {
      id: "list-1",
      title: "Todo",
      cards: [
        { id: "card-1", title: "Task 1", description: "First task" },
        { id: "card-2", title: "Task 2", description: "Second task" },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: [{ id: "card-3", title: "Task 3", description: "Third task" }],
    },
    {
      id: "list-3",
      title: "Done",
      cards: [],
    },
  ],
};

export default function HomePage() {
  const [board, setBoard] = useState(initialBoard);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Task Manager Board</h1>
      <Board initialBoard={board} />
    </main>
  );
}
