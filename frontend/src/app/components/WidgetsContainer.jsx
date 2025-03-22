import React, { useState, useRef } from "react";

const WidgetsContainer = () => {
  const containerRef = useRef(null);
  // Initial dummy widgets with positions (x and y in pixels)
  const [widgets, setWidgets] = useState([
    { id: 1, title: "Widget 1", content: "Content for widget 1.", x: 50, y: 50 },
    { id: 2, title: "Widget 2", content: "Content for widget 2.", x: 250, y: 80 },
    { id: 3, title: "Widget 3", content: "Content for widget 3.", x: 150, y: 200 },
  ]);

  // Holds the currently dragged widget's id and offset within that widget
  const [dragging, setDragging] = useState(null);

  const handleMouseDown = (e, widget) => {
    // Get container's bounding rectangle
    const containerRect = containerRef.current.getBoundingClientRect();
    // Calculate the mouse offset relative to the widget's top-left
    const offsetX = e.clientX - containerRect.left - widget.x;
    const offsetY = e.clientY - containerRect.top - widget.y;
    setDragging({ id: widget.id, offsetX, offsetY });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    // Calculate new position based on mouse position minus offset
    const newX = e.clientX - containerRect.left - dragging.offsetX;
    const newY = e.clientY - containerRect.top - dragging.offsetY;
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === dragging.id ? { ...widget, x: newX, y: newY } : widget
      )
    );
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {widgets.map((widget) => (
        <div
          key={widget.id}
          onMouseDown={(e) => handleMouseDown(e, widget)}
          className="absolute bg-white p-4 rounded shadow cursor-move select-none"
          style={{ left: widget.x, top: widget.y, minWidth: "200px" }}
        >
          <h4 className="font-bold text-lg mb-2">{widget.title}</h4>
          <p className="text-sm text-gray-600">{widget.content}</p>
        </div>
      ))}
    </div>
  );
};

export default WidgetsContainer;
