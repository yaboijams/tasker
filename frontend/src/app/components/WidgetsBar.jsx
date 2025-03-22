import React from "react";

const WidgetsBar = ({ onAddWidget }) => {
  // List of available widget templates with icons (using emojis as placeholders)
  const availableWidgets = [
    { id: 1, title: "Calendar", icon: "📅", content: "Upcoming events." },
    { id: 2, title: "Timer", icon: "⏱", content: "Countdown timer." },
    { id: 3, title: "Spotify", icon: "🎵", content: "Listen to music." },
  ];

  return (
    <div className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full shadow-lg">
      <ul className="flex space-x-2">
        {availableWidgets.map((widget) => (
          <li
            key={widget.id}
            className="bg-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
            onClick={() => onAddWidget(widget)}
            title={widget.title}
          >
            <span className="text-2xl">{widget.icon}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetsBar;
