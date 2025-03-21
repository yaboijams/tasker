import React, { useState } from "react";

const NewBoard = ({ isOpen, onClose, onSubmit }) => {
  const [boardName, setBoardName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(boardName);
    setBoardName("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="bg-white p-6 rounded-md shadow-md z-10 max-w-sm w-full">
        <h3 className="text-xl mb-4 text-[var(--foreground)]">
          Create New Board
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter board name"
            className="border border-gray-300 p-2 w-full mb-4 rounded"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[var(--persiangreen)] text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBoard;
