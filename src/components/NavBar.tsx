'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButtons from './AuthButtons';

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
      '--nav-height',
      isCollapsed ? '4rem' : '5rem'
    );
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full ${
        isCollapsed ? 'h-16' : 'h-20'
      } bg-gray-800 text-gray-100 px-4 py-2 flex items-center transition-all duration-300 z-50`}
    >
      <button
        onClick={toggleCollapse}
        className="mr-4 p-2 bg-gray-700 rounded"
      >
        {isCollapsed ? "🡳" : "🡱"}
      </button>

      {!isCollapsed && (
        <div className="mr-8">
          <h1 className="text-2xl font-bold">My App</h1>
        </div>
      )}

      <ul className="flex space-x-4 flex-1">
        <li>
          <Link
            href="/"
            className={`flex items-center p-2 rounded hover:bg-gray-700 ${pathname === '/' ? 'bg-gray-700' : ''}`}
          >
            <span className="mr-2">🏠</span>
            {!isCollapsed && "Home"}
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className={`flex items-center p-2 rounded hover:bg-gray-700 ${pathname === '/profile' ? 'bg-gray-700' : ''}`}
          >
            <span className="mr-2">👤</span>
            {!isCollapsed && "Profile"}
          </Link>
        </li>
      </ul>

      <div className="ml-auto">
        <AuthButtons/>
      </div>
    </nav>
  );
}
