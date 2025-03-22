import React, { useState, useRef } from "react";
import WidgetsBar from "./WidgetsBar";
import Timer from "./Widgets/Timer";
import SpotifyWidget from "./Widgets/SpotifyWidget"; // Create this component separately
import CalendarWidget from "./Widgets/CalendarWidget";

const WidgetsContainer = () => {
  const containerRef = useRef(null);
  // Initial dummy widgets with positions (x and y in pixels)
  const [widgets, setWidgets] = useState([
    {
      id: 1,
      title: "Widget 1",
      content: "Content for widget 1.",
      x: 50,
      y: 50,
      type: "default",
    },
    {
      id: 2,
      title: "Widget 2",
      content: "Content for widget 2.",
      x: 250,
      y: 80,
      type: "default",
    },
    {
      id: 3,
      title: "Widget 3",
      content: "Content for widget 3.",
      x: 150,
      y: 200,
      type: "default",
    },
  ]);

  // Holds the currently dragged widget's id and offset within that widget
  const [dragging, setDragging] = useState(null);

  const handleMouseDown = (e, widget) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left - widget.x;
    const offsetY = e.clientY - containerRect.top - widget.y;
    setDragging({ id: widget.id, offsetX, offsetY });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const containerRect = containerRef.current.getBoundingClientRect();
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

  // Function to add a new widget from the WidgetsBar
  const handleAddWidget = (widgetTemplate) => {
    const newWidget = {
      id: Date.now(),
      type:
        widgetTemplate.title === "Timer"
          ? "timer"
          : widgetTemplate.title === "Spotify"
          ? "spotify"
          : widgetTemplate.title === "Calendar"
          ? "calendar"
          : "default",
      title: widgetTemplate.title,
      content: widgetTemplate.content,
      x: 20,
      y: 20,
    };
    setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
  };

  // Function to remove a widget by id
  const handleRemoveWidget = (id) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* WidgetsBar positioned in the top right corner */}
      <WidgetsBar onAddWidget={handleAddWidget} />

      {/* Render draggable widgets */}
      {widgets.map((widget) => (
        <div
          key={widget.id}
          onMouseDown={(e) => handleMouseDown(e, widget)}
          className="absolute bg-white p-4 rounded shadow cursor-move select-none"
          style={{ left: widget.x, top: widget.y, minWidth: "200px" }}
        >
          {/* Close button */}
          <div
            onClick={() => handleRemoveWidget(widget.id)}
            className="absolute top-0 right-0 mt-1 mr-1 text-gray-500 hover:text-red-500 cursor-pointer select-none"
          >
            &times;
          </div>
          {widget.type === "timer" ? (
            <Timer />
          ) : widget.type === "spotify" ? (
            <SpotifyWidget />
          ) : widget.type === "calendar" ? (
            <CalendarWidget />
          ) : (
            <>
              <h4 className="font-bold text-lg mb-2">{widget.title}</h4>
              <p className="text-sm text-gray-600">{widget.content}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default WidgetsContainer;
