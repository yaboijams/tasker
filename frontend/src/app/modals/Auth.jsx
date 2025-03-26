"use client";

import React from "react";

const Auth = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center animated-gradient">
      <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Auth;
