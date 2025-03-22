import React, { useState, useEffect } from "react";

const Timer = () => {
  // Inputs for minutes and seconds
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  // Total time left in seconds
  const [timeLeft, setTimeLeft] = useState(0);
  // Whether the timer is running
  const [isRunning, setIsRunning] = useState(false);

  // Effect to decrement the timer every second when running
  useEffect(() => {
    let timerId;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  // Convert minutes and seconds inputs to total seconds and start the countdown
  const handleStart = () => {
    const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    if (!isNaN(totalSeconds) && totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setMinutes("");
    setSeconds("");
  };

  // Format seconds to MM:SS
  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    const mm = m < 10 ? `0${m}` : m;
    const ss = s < 10 ? `0${s}` : s;
    return `${mm}:${ss}`;
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-2">Timer</h3>
      {!isRunning && (
        <div className="mb-2">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="border p-1 mr-2 w-16"
            placeholder="Min"
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="border p-1 w-16"
            placeholder="Sec"
          />
        </div>
      )}
      <div className="mb-4 text-2xl font-mono">{formatTime(timeLeft)}</div>
      <div className="flex space-x-2">
        {!isRunning && (
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={handlePause}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
