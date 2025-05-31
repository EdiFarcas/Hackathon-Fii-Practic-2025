import './globals.css';
import Navbar from '../components/NavBar';
import { Providers } from '../components/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Providers>
          <div className="flex">
            <Navbar />
            <main className="ml-64 p-6 flex-1 min-h-screen">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}