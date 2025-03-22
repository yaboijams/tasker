import React, { useState, useEffect } from "react";

const CalendarWidget = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // On mount, check for Google access token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("googleAccessToken");
    if (token) {
      setAccessToken(token);
    }
    setLoading(false);
  }, []);

  // If we have a token, fetch the user's calendar events from Google Calendar API
  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setEvents(data.items);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching calendar events:", err);
          setLoading(false);
        });
    }
  }, [accessToken]);

  const handleGoogleSignIn = () => {
    // Redirect to your backend Google login route (adjust URL/port as needed)
    window.location.href = "http://localhost:3001/google/login";
  };

  if (loading) {
    return <p>Loading calendar...</p>;
  }

  if (!accessToken) {
    return (
      <div className="calendar-widget p-4">
        <p className="mb-4">
          Please sign in with Google to view your calendar events.
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="calendar-widget p-4">
      <h3 className="text-xl font-bold mb-2">Your Calendar Events</h3>
      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-2">
              <p className="font-semibold">{event.summary}</p>
              <p className="text-sm">
                {event.start.dateTime || event.start.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarWidget;
