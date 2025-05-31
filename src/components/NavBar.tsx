'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (pathname === '/gamemenu') {
      setIsCollapsed(true);
    }
  }, [pathname]);

  useEffect(() => {
    // Când navbar-ul este colapsat, setăm variabila la 4rem, altfel la 16rem.
    document.documentElement.style.setProperty(
      '--nav-width',
      isCollapsed ? '4rem' : '16rem'
    );
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <nav
      className={`fixed left-0 top-0 h-screen ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-gray-800 text-gray-100 p-4 flex flex-col transition-all duration-300`}
    >
      <button
        onClick={toggleCollapse}
        className="mb-4 p-2 bg-gray-700 rounded"
      >
        {isCollapsed ? "🡲" : "🡰"}
      </button>

      {!isCollapsed && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold">My App</h1>
        </div>
      )}

      <ul className="space-y-2 flex-1">
        <li>
          <Link
            href="/"
            className={`flex p-2 rounded hover:bg-gray-700 ${pathname === '/' ? 'bg-gray-700' : ''}`}
          >
            <span className="mr-2">🏠</span>
            {!isCollapsed && "Home"}
          </Link>
        </li>
        <li>
          <Link
            href="/game"
            className={`flex p-2 rounded hover:bg-gray-700 ${pathname === '/game' ? 'bg-gray-700' : ''}`}
          >
            <span className="mr-2">📊</span>
            {!isCollapsed && "Game"}
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={`flex p-2 rounded hover:bg-gray-700 ${pathname === '/settings' ? 'bg-gray-700' : ''}`}
          >
            <span className="mr-2">⚙️</span>
            {!isCollapsed && "Settings"}
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded">
          {!isCollapsed ? "Logout" : "🚪"}
        </button>
      </div>
    </nav>
  );
}
