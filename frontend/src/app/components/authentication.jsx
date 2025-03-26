"use client";

import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import Auth from "../modals/Auth";

const Authentication = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Get the auth object from the OIDC context
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // In an OIDC flow, typically the Cognito Hosted UI handles sign-in/up.
      await auth.signinRedirect();
    } catch (err) {
      console.error("Error during authentication:", err);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <Auth isOpen={isOpen} onClose={onClose}>
      <div className="authentication-container p-4 bg-white rounded shadow max-w-xs mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        {error && <div className="error text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full mt-1"
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full mt-1"
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
              Don't have an account?{" "}
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
