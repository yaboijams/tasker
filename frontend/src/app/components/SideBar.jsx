"use client";

import React, { useState } from "react";
import Authentication from "./authentication";

const Sidebar = ({
  boards,
  selectedBoardId,
  onSelectBoard,
  onCreateBoard,
  collapsed,
  setCollapsed,
}) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null); // user object from MongoDB (includes _id, email, etc.)

  // Logout handler: clear the user state (and optionally clear tokens)
  const handleLogout = () => {
    setUser(null);
    // Optionally: remove tokens from localStorage/cookies here.
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[var(--background)] border-r border-gray-200 p-4 flex flex-col z-[1000] transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header area */}
      <div className="flex items-center justify-between mb-4">
        {!collapsed && (
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Task Boards
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer text-[var(--foreground)] focus:outline-none transform transition-transform duration-200 active:scale-95"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Board list */}
      {collapsed ? (
        // Compact view: show only initials for each board with a tooltip
        <ul className="flex-1 overflow-y-auto space-y-2">
          {boards.map((board) => (
            <li
              key={board.id}
              onClick={() => onSelectBoard(board.id)}
              className={`cursor-pointer p-2 rounded text-center transition-transform duration-200 active:scale-95 ${
                selectedBoardId === board.id
                  ? "bg-[var(--thistle)]"
                  : "hover:bg-gray-100"
              }`}
              title={board.name}
            >
              {board.name.charAt(0)}
            </li>
          ))}
        </ul>
      ) : (
        // Expanded view: show full board names and "New Board" button
        <>
          <button
            onClick={onCreateBoard}
            className="cursor-pointer bg-[var(--persiangreen)] text-white px-3 py-1 rounded hover:bg-opacity-90 mb-4 transition-transform duration-200 active:scale-95"
          >
            New Board
          </button>
          <ul className="flex-1 overflow-y-auto space-y-2">
            {boards.map((board) => (
              <li
                key={board.id}
                onClick={() => onSelectBoard(board.id)}
                className={`cursor-pointer px-3 py-2 rounded transition-transform duration-200 active:scale-95 ${
                  selectedBoardId === board.id
                    ? "bg-[var(--thistle)]"
                    : "hover:bg-gray-100"
                }`}
              >
                {board.name}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Authentication / User section at the bottom */}
      <div className="mt-auto">
        {user ? (
          collapsed ? (
            // Collapsed: show only the first letter of the email
            <button
              onClick={handleLogout}
              className="w-full text-center px-2 py-2 rounded hover:bg-gray-100"
              title="Click to logout"
            >
              {user.email.charAt(0)}
            </button>
          ) : (
            // Expanded: show the full email and a Logout button
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                {user.email}
              </button>
            </div>
          )
        ) : collapsed ? (
          // In collapsed mode, show a simple icon trigger
          <div className="flex flex-col items-center space-y-2">
            <button
              className="p-2 rounded hover:bg-gray-100"
              title="Authentication"
              onClick={() => setAuthModalOpen(true)}
            >
              👤
            </button>
          </div>
        ) : (
          // In expanded mode, show a text-based trigger
          <div className="flex flex-col space-y-2">
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign In / Sign Up
            </button>
          </div>
        )}
      </div>

      {isAuthModalOpen && (
        <Authentication
          isOpen={isAuthModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setAuthModalOpen(false); // Automatically close the modal on success.
          }}
        />
      )}
    </aside>
  );
};

export default Sidebar;
