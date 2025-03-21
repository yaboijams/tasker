import React, { useState } from 'react';

const Sidebar = ({ boards, selectedBoardId, onSelectBoard, onCreateBoard }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-full bg-[var(--background)] border-r border-gray-200 p-4 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        {!collapsed && (
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Task Boards
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[var(--foreground)] focus:outline-none transform transition-transform duration-200 active:scale-95"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {collapsed ? (
        // Compact view: show only initials for each board with a tooltip
        <ul className="flex-1 overflow-y-auto space-y-2">
          {boards.map((board) => (
            <li
              key={board.id}
              onClick={() => onSelectBoard(board.id)}
              className={`cursor-pointer p-2 rounded text-center transform transition-transform duration-200 active:scale-95 ${
                selectedBoardId === board.id
                  ? 'bg-[var(--thistle)]'
                  : 'hover:bg-gray-100'
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
            className="bg-[var(--persiangreen)] text-white px-3 py-1 rounded hover:bg-opacity-90 mb-4 transform transition-transform duration-200 active:scale-95"
          >
            New Board
          </button>
          <ul className="flex-1 overflow-y-auto space-y-2">
            {boards.map((board) => (
              <li
                key={board.id}
                onClick={() => onSelectBoard(board.id)}
                className={`cursor-pointer px-3 py-2 rounded transform transition-transform duration-200 active:scale-95 ${
                  selectedBoardId === board.id
                    ? 'bg-[var(--thistle)]'
                    : 'hover:bg-gray-100'
                }`}
              >
                {board.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
