import './globals.css';
import Navbar from '../components/NavBar';
import { Providers } from '@/components/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Providers>
          {/* Navbar always on top */}
          <Navbar />

          {/* Padding to push content below navbar */}
          <main className="pt-16 px-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
