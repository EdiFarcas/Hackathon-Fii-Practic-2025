'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButtons from './AuthButtons';
import MarketPlaceMenu from './MarketPlaceMenu';

export default function Navbar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMarket, setShowMarket] = useState(false);

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
          <Link href="/" className="text-2xl font-bold hover:underline">
            Darker Stories
          </Link>
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
        <li>
          <button
            className="flex items-center p-2 rounded hover:bg-gray-700 focus:outline-none"
            onClick={() => setShowMarket(true)}
          >
            <span className="mr-2">🛒</span>
            {!isCollapsed && "Marketplace"}
          </button>
        </li>
      </ul>

      <div className="ml-auto">
        <AuthButtons/>
      </div>
      {showMarket && <MarketPlaceMenu onClose={() => setShowMarket(false)} />}
    </nav>
  );
}
