import React, { useState } from "react";

const NewList = ({ isOpen, onClose, onSubmit }) => {
  const [listTitle, setListTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Default list options
  const defaultLists = ["To Do", "In Progress", "Done", "Backlog", "Review"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listTitle.trim() === "") return; // Prevent empty lists
    onSubmit({ title: listTitle, priority });
    setListTitle(""); // Reset input
    setPriority("Medium"); // Reset priority
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-md shadow-md z-10 max-w-md w-full">
        <h3 className="text-xl mb-4 text-[var(--foreground)]">Add New List</h3>
        <form onSubmit={handleSubmit}>
          {/* Default List Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Choose a Default List
            </label>
            <select
              className="border border-gray-300 p-2 w-full rounded"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            >
              <option value="">Custom List</option>
              {defaultLists.map((list) => (
                <option key={list} value={list}>
                  {list}
                </option>
              ))}
            </select>
          </div>

          {/* Custom List Title */}
          <div className="mb-4">
            <label
              htmlFor="listTitle"
              className="block text-sm font-medium mb-1"
            >
              Or Enter Custom Title
            </label>
            <input
              id="listTitle"
              type="text"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Enter list title..."
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
          </div>

          {/* Priority Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              className="border border-gray-300 p-2 w-full rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Buttons */}
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
              Add List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewList;
