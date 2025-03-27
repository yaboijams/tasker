"use client";

import React, { useState } from "react";
import Auth from "../modals/Auth";

const Authentication = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Decide which endpoint to call
    const endpoint =
      mode === "signin"
        ? "http://localhost:3001/auth/signin"
        : "http://localhost:3001/auth/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Handle any non-2xx responses as errors
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Request failed");
      }

      // Parse the JSON response
      const data = await response.json();

      if (mode === "signin") {
        // If sign-in is successful, you might store tokens in localStorage or cookies
        // For example:
        // localStorage.setItem("accessToken", data.tokens.AccessToken);
        // localStorage.setItem("idToken", data.tokens.IdToken);
        setMessage("Sign-in successful!");
      } else {
        setMessage(
          "Sign-up successful! Check your email for verification if required."
        );
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <Auth isOpen={isOpen} onClose={onClose}>
      <div className="authentication-container p-4 bg-white rounded shadow max-w-xs mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        {error && <div className="error text-red-500 mb-2">{error}</div>}
        {message && <div className="text-green-600 mb-2">{message}</div>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full mt-1"
              required
            />
          </label>

          <label className="block mb-4">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full mt-1"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {mode === "signin" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-blue-500 underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-blue-500 underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </Auth>
  );
};

export default Authentication;
