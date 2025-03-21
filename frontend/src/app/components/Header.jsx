import React from "react";

const Header = () => {
  return (
    <header className="bg-[var(--dimgrey)] text-[var(--magnolla)] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="hover:text-gray-400">
          <h1 className="text-2xl font-bold">Tasker</h1>
        </a>
        <nav>
          <ul className="flex space-x-7">
            <li>
              <a href="/" className="hover:text-gray-400">
                Login
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-400">
                How to Use
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
