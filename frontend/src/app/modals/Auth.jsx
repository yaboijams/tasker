"use client";

import React from "react";

const Auth = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center animated-gradient backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Auth;
