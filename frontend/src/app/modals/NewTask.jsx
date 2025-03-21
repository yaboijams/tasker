import React, { useState } from "react";

const NewTask = ({ isOpen, onClose, onSubmit, listId }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskColor, setTaskColor] = useState("bg-blue-500");

  // Preset color options for the task background
  const colorOptions = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass an object with all task details including the selected color
    onSubmit(listId, {
      title: taskTitle,
      description: taskDescription,
      dueDate,
      color: taskColor,
    });
    // Reset the form fields (and color if desired)
    setTaskTitle("");
    setTaskDescription("");
    setDueDate("");
    setTaskColor("bg-blue-500");
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
        <h3 className="text-xl mb-4 text-[var(--foreground)]">Add New Task</h3>
        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="mb-4">
            <label
              htmlFor="taskTitle"
              className="block text-sm font-medium mb-1"
            >
              Task Title
            </label>
            <input
              id="taskTitle"
              type="text"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Enter task title..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </div>
          {/* Task Description */}
          <div className="mb-4">
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium mb-1"
            >
              Task Description
            </label>
            <textarea
              id="taskDescription"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Enter task details..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={4}
              required
            ></textarea>
          </div>
          {/* Due Date */}
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              className="border border-gray-300 p-2 w-full rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          {/* Task Color Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Task Color</label>
            <div className="flex space-x-2">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer ${color} ${
                    taskColor === color ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setTaskColor(color)}
                ></div>
              ))}
            </div>
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
