'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      
      <ul className="space-y-2">
        <li>
          <Link 
            href="/" 
            className={`flex p-2 rounded hover:bg-gray-700 ${pathname === '/' ? 'bg-gray-700' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard" 
            className={`flex p-2 rounded hover:bg-gray-700 ${pathname === '/dashboard' ? 'bg-gray-700' : ''}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            href="/settings" 
            className={`flex p-2 rounded hover:bg-gray-700 ${pathname === '/settings' ? 'bg-gray-700' : ''}`}
          >
            Settings
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}