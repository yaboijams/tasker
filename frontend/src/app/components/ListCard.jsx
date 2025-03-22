import React from "react";

const ListCard = ({
  list,
  tasks,
  onTaskDragStart,
  onTaskDragEnd,
  onTaskDrop,
  onAddTask,
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));

    // Check if the task already exists in the list
    const isDuplicate = tasks.some((task) => task.id === data.task.id);
    if (!isDuplicate) {
      onTaskDrop(e, list.id);
    }
  };

  return (
    <div className="bg-[var(--white)] text-[var(--foreground)] border-2 border-solid border-[var(--dimgrey)] p-4 rounded-md shadow mb-2 min-w-[250px] flex flex-col  hover:bg-[var(--darkerwhite)] focus:outline-2 focus:outline-offset-2 pop-out-hover">
      {/* List Header with task-add button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{list.title}</h3>
        <button
          onClick={() => onAddTask(list.id)}
          className="bg-[var(--persiangreen)] text-white px-2 py-1 rounded hover:bg-opacity-90"
        >
          + Task
        </button>
      </div>

      {/* Task Drop Zone */}
      <div
        className="grid grid-flow-col auto-cols-max gap-2 flex-1 overflow-x-auto min-h-[50px] p-2 border-2 border-transparent hover:border-gray-300"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => onTaskDragStart(e, task, list.id)}
              onDragEnd={onTaskDragEnd}
              className={`${task.color} text-[var(--white)] p-2 rounded shadow cursor-move min-w-[150px]`}
            >
              <h4 className="font-semibold text-sm">{task.title}</h4>
              <p className="text-xs">{task.description}</p>
              {task.dueDate && (
                <p className="text-xs mt-1">Due: {task.dueDate}</p>
              )}
            </div>
          ))
        ) : (
          // Placeholder to indicate that tasks can be dropped here
          <div className="text-gray-400 italic text-sm flex items-center justify-center w-full">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCard;
