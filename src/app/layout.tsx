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
      <body className="text-[var(--foreground)] bg-gray-100">
        <Providers>
          <div className="flex">
            <Navbar />
            <main className="p-6 flex-1 min-h-screen" style={{ marginLeft: "var(--nav-width)" }}>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
