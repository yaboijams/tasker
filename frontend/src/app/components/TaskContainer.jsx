import React from "react";
import ListCard from "./ListCard";
import AddListCard from "./AddListCard";
const TaskContainer = ({
  lists,
  onTaskDragStart,
  onTaskDragEnd,
  onTaskDrop,
  onAddTask, // passed down to ListCard
  onAddList, // handler for adding a new list
}) => {
  return (
    <div className="flex items-center space-x-4 overflow-x-auto p-4 h-full">
      {lists.map((list) => (
        <ListCard
          key={list.id}
          list={list}
          tasks={list.tasks}
          onTaskDragStart={onTaskDragStart}
          onTaskDragEnd={onTaskDragEnd}
          onTaskDrop={onTaskDrop}
          onAddTask={onAddTask}
        />
      ))}
      <AddListCard onAddList={onAddList} />
    </div>
  );
};

export default TaskContainer;
