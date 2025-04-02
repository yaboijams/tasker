"use client";

import React, { useState } from "react";
import Auth from "../modals/Auth";

const Authentication = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState("signin"); // 'signin', 'signup', or 'verify'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Decide which endpoint to call based on mode
    let endpoint = "";
    let body = {};

    if (mode === "signin") {
      endpoint = "http://localhost:3001/auth/signin";
      body = { email, password };
    } else if (mode === "signup") {
      endpoint = "http://localhost:3001/auth/signup";
      body = { email, password };
    } else if (mode === "verify") {
      endpoint = "http://localhost:3001/auth/verify";
      body = { email, code: verificationCode };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Request failed");
      }

      const data = await response.json();

      if (mode === "signin") {
        setMessage("Sign-in successful!");
        // Optionally, call onSuccess to pass the user's email back to the parent:
        if (onSuccess) {
          onSuccess(email);
        }
        // Close the modal automatically after sign-in.
        onClose();
      } else if (mode === "signup") {
        setMessage(
          "Sign-up successful! Please enter the verification code sent to your email."
        );
        setMode("verify");
      } else if (mode === "verify") {
        setMessage("Verification successful! You can now sign in.");
        setMode("signin");
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
          {mode === "signin" && "Sign In"}
          {mode === "signup" && "Sign Up"}
          {mode === "verify" && "Verify Account"}
        </h2>
        {error && <div className="error text-red-500 mb-2">{error}</div>}
        {message && <div className="text-green-600 mb-2">{message}</div>}

        <form onSubmit={handleSubmit}>
          {(mode === "signin" || mode === "signup" || mode === "verify") && (
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-full mt-1"
                required
                disabled={mode === "verify"}
              />
            </label>
          )}

          {(mode === "signin" || mode === "signup") && (
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
          )}

          {mode === "verify" && (
            <label className="block mb-4">
              Verification Code:
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="border p-2 rounded w-full mt-1"
                required
              />
            </label>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {mode === "signin" && "Sign In"}
            {mode === "signup" && "Sign Up"}
            {mode === "verify" && "Verify"}
          </button>
        </form>

        {mode !== "verify" && (
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
        )}
      </div>
    </Auth>
  );
};

export default Authentication;
